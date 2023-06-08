---
layout: post
title: Data Loss Between 32 and 64 bit data type - Mistakes when working between MsgPack and Protobuf
description: A tale of a stupid programmer struggling to uncover a bug that would 'reset' a value when working with MsgPack and Protobuf 
categories: [programming, C/C++, protobuf, msgPack]
---

A tale of how stupid I was trying to uncover a bug that would reset a value during my work trying to convert data written in message pack to protobuf. A bug 
that took me half a day to resolve despite being quite obvious in hindsight. A tale of how msgPack treats 32 bit and 64 bit integers as the same can 
cause serious bugs to clueless programmers.

## Precursor: What is the Difference Between 32 bit and 64 bit Data Types

As one may know, there are 32 bit and 64 bit variant data types such as `int32_t` and `int64_t` or `uint32_t` and `uint64_t`. These variants represent the number 
of bits allocated to the variable. For instance, on my machine, an `int` takes about 4 bytes. But what does `int32_t` even mean? Observe the following:

```c
printf("    size of int: %zu\n", sizeof(int));
printf("size of int32_t: %zu\n", sizeof(int32_t));
printf("size of int64_t: %zu\n", sizeof(int64_t));
```

**output:**
```
    size of int: 4
size of int32_t: 4
size of int64_t: 8
```

Based on this observation, we can see that `int` and `int32_t` are the same exact thing, at least on my machine. `int32_t` for most of us 
normies is simply an explicit statement indicating to future programmers that 32 bits are allocated to the variable. Recall that 
8 bits makes one byte so 32/8 = 4 bytes. If we inspect further, we see that `int32_t` is defined as `signed int`:

<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code><span style="color:#D0CFCC"><b>$ </b></span>gcc -E test.c | grep int32_t | grep typedef
<span style="color:#C01C28"><b>typedef</b></span> signed int __int32_t;
<span style="color:#C01C28"><b>typedef</b></span> unsigned int __uint32_t;
<span style="color:#C01C28"><b>typedef</b></span> __int32_t __int_least32_t;
<span style="color:#C01C28"><b>typedef</b></span> __uint32_t __uint_least32_t;
<span style="color:#C01C28"><b>typedef</b></span> __int32_t int32_t;
<span style="color:#C01C28"><b>typedef</b></span> __uint32_t u_int32_t;
</code></pre></div>

The number of bits signify the range that the variable can contain. So for `int32_t`, we have that following ranges: `-2,147,483,648 - 2,147,483,647`.
Recall that `int32_t` is defined as a `signed` int meaning there is a signed bit (the left most bit) reserved to indicate whether or not the number is 
negative or positive. If the signed bit is a 0, the number is positive, if the bit is set to 1, then the number is negative. In terms of how to read 
the binary, that's outside of the scope of this blog. But if I recall correctly, you have to use twos complement if the number is negative. However, 
I don't deal with binary and it's been too many years since I took a computer architecture course. Anyhow, knowing that there is one bit reserved for 
whether the number is negative or positive, we are left with 31 bits to represent the numbers from 0 to some positive integer. In addition, we know 
that the number is split roughly in half where one half is negative and the other half is positive. So a rough guess would be $-2^31 - 2^31$ which 
is close to the actual range I stated earlier. The highest possible number that could be represented by `int32_t` is `01111111 11111111 11111111 11111111` 
which isn't an even number. Any multiple of 2 is an even number, so the upper range is definitely not $2^31$ but rather is an odd number. If we were 
to convert the binary, we see that the upper range is actually $2^31 -1$.

## Protobuf and MsgPack

I've been working on converting data formatted in MsgPack to Protobuf due to how much more space efficient Protobuf is. I do think it's a weird situation 
to be since most people work with compacting JSON into either Protobuf or JSON into MsgPack. However, due to reasons with how Fluent-Bit works, the 
JSON data is automatically converted into MsgPack. While I could probably edit the source code to not convert data into MsgPack or simply have the 
output from Fluent Bit streamline into our other services to JSON and then transform the data to Protobuf, you can probably see how inefficient 
and how large the technical cost would be. I was considering of the latter idea where I transform JSON data to Protobuf as that's much more 
documented and also much easier to work with. However, that would defeat the purpose of the task so I still persisted on the task after 
no results for an entire day or two. 

**Note to self:** [https://github.com/camgunz/cmp](https://github.com/camgunz/cmp) is a library that serializes data in C to msgPack

For context, protobuf and msgPack are two binary serilization formats for efficient data exchange and storage. When I first heard about them, 
they first thing that came to my mind is serialization in Java where you can store objects into a file by serializing the class which 
transform the class into a series of bytes. Then you would deserialize to recover the object. While in Java this is very simple, the same 
cannot be said when you are working with C, a language that doesn't seem to have much support and documentation. A common use case for 
Protobuf and MsgPack is to send JSON data over the network where speed and performance are emphasized. JSON is a simple human readable 
format but does take a bit of space as it's human readable. At least it's much more readable and more compact than XML. Anyhow, I 
won't go into ProtoBuf and MsgPack in detail but here's a picture that illustrates MsgPack:

![an image that illustrates how more efficient msgPack is over JSON](https://msgpack.org/images/intro.png)

Here's another example:

**JSON:** 76 bytes
```json
{
	"name": "zakuarbor",
	"age": 26, 
	"nationality": "Canadian", 
	"major": "mathematics"
}
```

**msgPack:** 60 bytes (saves 21% of the space)
```
84 a4 6e 61 6d 65 a9 7a 61 6b 75 61 72 62 6f 72 a3 61 67 65 1a ab 6e 
61 74 69 6f 6e 61 6c 69 74 79 a8 43 61 6e 61 64 69 61 6e a5 6d 61 6a 
6f 72 ab 6d 61 74 68 65 6d 61 74 69 63 73
```

One thing to know about msgPack and protobuff is that they both are structured formats meaning there are 
datatypes associated with the values. This is an important feature as it allows serialization and deserialization 
to be efficient.

## Data Mysteriously being Reset to 0

Let's begin with the following proto structure:
```proto
syntax = "proto2";

message Person {
	required string name = 1;
	required uint32 age = 2;
	required uint32 student_id = 3;
}
```

As I am writing a program in C, I'll be required to install [`protobuf-c`](https://github.com/msgpack/msgpack-c/tree/c_master), a C implementation of Protocol Buffers. 
To generate the protobuf source and header file based on your proto file, you just need to run `protoc-c --c_out=./ sample.proto` which should generate two files:
* `sample.pb-c.c`  
* `sample.pb-c.h`

I am not going to go into details of how to parse MsgPack maps in this blog but my code is based off a [nice example](https://github.com/msgpack/msgpack-c/blob/c_master/example/jsonconv.c) 
that msgpack-c (the C implementation of MessagePack) provides in their official Github repository. I will however, highlight some bits of code in the example to 
illustrate the bug I was encountering. Using a tool from `msgpack-tools`, specifically `json2msgpack`, we will be converting the following JSON message to msgpack:

```json
{
	"name": "zakuarbor",
	"age": 26,
	"student_id": 100996291
}
```

**command:** `json2msgpack -i sample.json`

```
$ ./msgpack2pb 
./msgpack2pb: error while loading shared libraries: libmsgpack-c.so.2: cannot open shared object file: No such file or directory
23:51 [zaku:~/Documents/projects/blog/assets/code/proto/32vs64]
$ ldd ./msgpack2pb
	linux-vdso.so.1 (0x00007ffcbdff2000)
	libprotobuf-c.so.1 => /lib64/libprotobuf-c.so.1 (0x00007fb8a7f89000)
	libmsgpack-c.so.2 => not found
	libc.so.6 => /lib64/libc.so.6 (0x00007fb8a7dab000)
	/lib64/ld-linux-x86-64.so.2 (0x00007fb8a7fb0000)
$ export LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib
```





* I thought 32bit vs 64bit didn't matter because data no data would be lost if a 32 bit data was promoted to 64 bit
* I initially thought it was defined as a union
* give a note that f64 is actually a double
* got desperate and illogical and thought there was some hardware related failure despite making 0 sense
* big endian vs little endian



## Summary

Making another copy of the plugin requires more than just copy and paste of the plugin's source code. You also need to change `CMakeLists.txt` under root, `plugins`, and `src`. In addition, you need to modify `CMakeLists.txt` of the new plugin you created and change the struct name to reflect the new plugin's name in `kafka.c`.

On a side note, if you are looking to write your own plugin, the CNCF has a nice blog on [this](https://www.cncf.io/blog/2022/05/04/how-to-write-a-fluent-bit-plugin/). 
