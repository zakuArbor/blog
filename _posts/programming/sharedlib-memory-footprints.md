---
layout: post
title: "Memory Footprint of Shared Libraries - A Brief Look"
description: A quick look into the memory footprint of shared libraries
categories: [programming, c/c++, linux]
---

One of the major advantage of shared libraries is the ability to be linked by multiple programs 
and hence consumes less static memory and dynamic memory (i.e. binaries are smaller and the 
memory usage during runtime is smaller as well because multiple instances of the same code does not 
need to be loaded into memory). Conceptually, this makes sense but I wanted to take a quick look 
to verify this fact.

I have previously written about [shared libraries](../building-code) to prepare my talk about 
the gcc toolchain to new hires at one of the companies I previously worked at as part of the 
newhire training. This was both a great opportunity for myself to learn what actually goes 
on during the build process as I only had a very vague understanding and to the team since 
most of us did not have systems programming background. A few months ago I had an interview 
with a company that developed a realtime operating system and they started asking me about 
the specifics on the gcc toolchain after finding out I have some familiarity with the topic. 
One of the questions that stumped me was answering what the memory footprint of shared libraries 
v.s static libraries were. While my answer was correct, the interviewers did not seem to be 
satisfied with my answers. The reason for the dissatisfaction was due to the fact I did not 
mention the fact that data sections of the shared libraries are not shared but rather unique.

<details>
<summary><b>tldr</b></summary>
<hr/>
<code class="highlighter-rouge">recvfrom()</code> requires <code class = "highlighter-rouge">src_addr</code> and <code class="highlighter-rouge">addrlen</code> to not be null and 
<b><code class="highlighter-rouge">addrlen</code></b> to be initialized with the size of `struct sockaddr`
<hr/>
</details>

---

This entire page will be using the [example from my previous blog on gcc toolchain](../building-code) 
to illustrate the memory footprint between static and shared libraries. You can refer to the [gist](https://gist.github.com/zakuArbor/a3fcaef1aa2e9a271a8f3bc6c542aa15) 
to see the code and the instructions to compile and link the code if you wish to follow along.

## Binary (i.e. Code Size) Comparison
```
$ stat --format="%s %n" prog_*
24960 prog_dyn
25104 prog_static
```

As expected, the executable that is statically linked (`prog_static`) is 144 bytes larger than the dynamic version since 
the code for the functions `meow` and `honk` are not in the dynamic version of the 
executable which can be seen using the `nm` utility:

<pre class = "highlight"><font color="#D0CFCC"><b>$ </b></font>nm prog_dyn | grep -E &quot;honk|meow&quot;
                 U <font color="#C01C28"><b>honk</b></font>
                 U <font color="#C01C28"><b>meow</b></font>
<font color="#D0CFCC"><b>$ </b></font>nm prog_static | grep -E &quot;honk|meow&quot;
0000000000401166 T <font color="#C01C28"><b>honk</b></font>
0000000000401155 T <font color="#C01C28"><b>meow</b></font>
</pre>

where `U` means the symbol is undefined and `T` refers to the symbol being in the text (code) section.

![How I imagine how shared library works](../assets/programming/builds/shared-lib-imagine.png)
<p class = "caption">How I imagine shared library works</p>

As you probably know, programs that linked to the same shared library will 

## Address Space Comparison
**Dynamic:**
Run `LD_LIBRARY_PATH=. ./prog_dyn` on one terminal

On the other terminal, run the following:
```
$ $ pmap `ps -A -o pid,fname | grep prog_dyn | awk '{print $1}'` | grep total
 total             2648K
# alternatively you can manually find the pid instead
$ pmap 43084 | grep total
 total             2648K
```

**Static:**
```
$ ps -A -o pid,fname | grep prog_sta | awk '{print $1}'
$ pmap `ps -A -o pid,fname | grep prog_sta | awk '{print $1}'` | grep total
 total             2624K
```

As you can see, the address space of the dynamically linked executable is smaller. 
However, this number does not tell us if the memory footprint of dynamically loaded 
executable is smaller than the statically linked executable.

```
$ grep -E "^Size" smaps | awk '{print $2}' | awk '{s+=$1} END {print s}'
2624
```


```
$ ps -elf | grep prog
0 S zaku       43084   24889  0  80   0 -   661 wait_w 01:28 pts/3    00:00:00 ./prog_dyn
0 S zaku       43112   34764  0  80   0 - 55414 pipe_r 01:28 pts/6    00:00:00 grep --color=auto prog
01:28 [zaku:/tmp]
$ pmap 43084
43084:   ./prog_dyn
0000000000400000      4K r---- prog_dyn
0000000000401000      4K r-x-- prog_dyn
0000000000402000      4K r---- prog_dyn
0000000000403000      4K r---- prog_dyn
0000000000404000      4K rw--- prog_dyn
0000000001fb9000    132K rw---   [ anon ]
00007f07a0bd2000     12K rw---   [ anon ]
00007f07a0bd5000    160K r---- libc.so.6
00007f07a0bfd000   1488K r-x-- libc.so.6
00007f07a0d71000    352K r---- libc.so.6
00007f07a0dc9000     16K r---- libc.so.6
00007f07a0dcd000      8K rw--- libc.so.6
00007f07a0dcf000     52K rw---   [ anon ]
00007f07a0df4000      4K r---- libanimal.so
00007f07a0df5000      4K r-x-- libanimal.so
00007f07a0df6000      4K r---- libanimal.so
00007f07a0df7000      4K r---- libanimal.so
00007f07a0df8000      4K rw--- libanimal.so
00007f07a0df9000      8K rw---   [ anon ]
00007f07a0dfb000      8K r---- ld-linux-x86-64.so.2
00007f07a0dfd000    152K r-x-- ld-linux-x86-64.so.2
00007f07a0e23000     44K r---- ld-linux-x86-64.so.2
00007f07a0e2f000      8K r---- ld-linux-x86-64.so.2
00007f07a0e31000      8K rw--- ld-linux-x86-64.so.2
00007ffce08b1000    132K rw---   [ stack ]
00007ffce0923000     16K r----   [ anon ]
00007ffce0927000      8K r-x--   [ anon ]
ffffffffff600000      4K --x--   [ anon ]
 total             2648K
01:28 [zaku:/tmp]
$ pmap 43084 | grep total
 total             2648K
```

# notes

```
$ ./a
printf address: 0x401030

23:54 [zaku:/tmp]
$ ./b
printf address: 0x401030
```
perhaps they are the same even though loaded in different parts of library because of the relative offset

---

<details>

<summary>Snippet</summary>
<code class="highlighter-rouge">printf("(address: %s) %s\n", inet_ntoa(from.sin_addr), buf);</code>
</details>
**Output:**
```
(address: 0.0.0.0) Hello World
```

`recvfrom()` API did not populate `src_addr` (`from` in my code snippet) with the correct IP address because I did 
not initialize `addrlen` parameter with the size of `src_addr` (i.e. `sizeof(addrlen)`).

**Output:**                                                 
```                                                                             
(address: 127.0.0.1) Hello World
```

## Initializing addrlen With Different Sizes

The standard practice is to initialize `addrlen` with the size of `struct sockaddr` which happens to be 16 bytes on my machine. 
However, you could set the value to be less than 16 bytes and it may still work. 

If you set the length to be less than 0, an **errno** will be set 
complaining that an invalid argument has been supplied.

```c
recvfrom(): Invalid argument
```

This is because `addrlen` is of type `unsigned int which we can verify by running the preprocessor:
```c
$ gcc -E server-recvfrom.c  | grep socklen_t
typedef unsigned int __socklen_t;
typedef __socklen_t socklen_t;
```

Your compiler would have caught this error if you have declared `src_addr` as of type `socklen_t` instead of `int` if you have `-Wsign-conversion` flag enabled (at least for gcc).
What happens if you provide the length to a value less than `sizeof(struct sockaddr)` such as 0 bytes? The source address will not filled if the value of `addrlen` is too small. 
Then what would be the minimum length that can be set to `addrlen` for `recvfrom` to populate the source IP address?

The answer lies in examining `sockaddr_in` structure (or you can brute-force which I found was to be 8 bytes on my environment):
```c
$ gcc server-recvfrom.c -E | grep -A 11 -E "struct sockaddr_in$"
struct sockaddr_in
  {
    sa_family_t sin_family;
    in_port_t sin_port;
    struct in_addr sin_addr;


    unsigned char sin_zero[sizeof (struct sockaddr)
      - (sizeof (unsigned short int))
      - sizeof (in_port_t)
      - sizeof (struct in_addr)];
  };
```

A `struct` from my understanding is similar to an array in the sense that all members in the struct 
are stored in a contiguous chunk of memory. This means that you can address a member in a struct 
without using the dot nor the arrow operator (i.e. `person.age` or `person->age`). This can be achieved 
by knowing the size of each member (also taking into account of padding for alignment reasons). For instance, 
let's define a struct as the following:

```c
struct Person {
  int age;
  char name[16];
}
```

where the size of the struct is 20 bytes:
* 4 bytes to represent the integer
* 16 bytes to represent a character array of 16 characters

Although I am not familiar with how to access structs using pointers, a method I 
came up with is using memcpy to access members I desire.

**Code:**
```c
struct Person human = { 21, "John Smith" };                                   
int age = 0;                                                                  
memcpy(&age, &human, sizeof(int));                                            
printf("the person age is: %d\n", age);  
```

**Output:**
```
the person age is: 21
```

Given the fact that a struct is just a contiguous chunk of memory that consists of 
members of different sizes, we can estimate the minimum amount of memory required 
to set `addrlen` to obtain the IP address from `recvfrom()`

Recall `src_addr` is the type `struct sockaddr_in`:
```
struct sockaddr_in                                                              
  {                                                                             
    sa_family_t sin_family;                                                     
    in_port_t sin_port;                                                         
    struct in_addr sin_addr;   
```

We can see that to represent the IP address (`sin_addr`), we need at least 
`sizeof(sa_family_t) + sizeof(in_port_t) + sizeof(struct in_addr)` which happens 
to be 8 bytes on my machine because `sa_family_t` is a typedef of `short unsigned int` (2 bytes), 
`sin_port_t` is a typedef of `uint16_t` (16 $\require{cancel}\bcancel{bits} \cdot \frac{bytes}{8\bcancel{bits}} = 2$ bytes) and 
`struct in_addr` is simply a struct that contains only one member of type `in_addr_t` which is simply a typdef of `uint32_t` 
(4 bytes). This happens to be the same number of bytes as what I found through brute-force.

```
$ gcc server-recvfrom.c -E | grep  -E "sa_family_t;"
typedef unsigned short int sa_family_t;
$ gcc server-recvfrom.c -E | grep -E "in_port_t;$"
typedef uint16_t in_port_t;
$ gcc server-recvfrom.c -E | grep -E -A 3 "struct in_addr$"
struct in_addr
  {
    in_addr_t s_addr;
  };
$ gcc server-recvfrom.c -E | grep -E  "in_addr_t;"
typedef uint32_t in_addr_t;
```

You may be asking why do we pass `addrlen` as a pointer and not as an unsigned integer. 
The reason can be found in the manpages: `Upon return, addrlen is updated to contain the actual size of the source address`. 
So `addrlen` will not have the size of 8 bytes or whatever bytes you have set it to be. 
Does this mean that the value of `addrlen` matter? Yes it does because `recvfrom()` will 
only write up to `addrlen` bytes to `src_addr` as seen in the [code](https://elixir.bootlin.com/glibc/latest/source/sysdeps/mach/hurd/recvfrom.c#L31).

```
/* Read N bytes into BUF through socket FD.
   If ADDR is not NULL, fill in *ADDR_LEN bytes of it with tha address of
   the sender, and store the actual size of the address in *ADDR_LEN.
   Returns the number of bytes read or -1 for errors.  */
```

---

## Conclusion

To summarize this long blog post, use `recvfrom()` API to retrieve the source IP address (if the protocol supports it). 
Ensure that you have passed non-NULL values for `src_addr` and `addrlen` arguments with `addrlen` initialized to 
`sizeof(struct sockaddr_in)` to obtain all the necessary information.

<script src="https://gist.github.com/zakuArbor/7b46dba0eff54085ddbaafe12d278562.js"></script>
