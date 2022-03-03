---
layout: post
title: C Programming - Variable Length Array (VLA)
description: Exploring variable length array introduced in C99
categories: [programming, c/c++]
---

I always thought it was not possible to create a "dynamic" array in C without the use of `malloc` till 
recently where I was introduced to **variable length arrays (VLA)**. Although the use of "dynamic" is 
a poor choice, the ability to allocate an array at runtime based on a variable whose value is not known 
during runtime came as a shock to me.

Variable length arrays came into C starting from C99 standard (hence not suitable for anyone who 
works on legacy systems or in projects that follow C89 standard. To illustrate, here's an example of 
an array whose size is dependent on the variable `len` whose value is set to any number passed as an 
argument to the program. Hence, the length of the array is not known during compiled time.

```c
int main(int argc, char **argv) {
	size_t len = atoi(argv[1]);
	int arr[len];
	//do stuff
}
```

If I were to compile this using `gcc` using purely `c89` standard (**note:** use `-pedantic` option 
to turn off gcc extensions because gcc adds vla support by default), I would get the following error:
<pre class = "highlight">$ gcc -std=c89 --pedantic /tmp/test.c
<b>/tmp/test.c:</b> In function ‘<b>main</b>’:
<b>/tmp/test.c:6:9:</b> <font color="#AD7FA8"><b>warning: </b></font>ISO C90 forbids variable length array ‘<b>arr</b>’ [<font color="#AD7FA8"><b>-Wvla</b></font>]
         <font color="#AD7FA8"><b>int</b></font> arr[len];
         <font color="#AD7FA8"><b>^~~</b></font>
<b>/tmp/test.c:6:9:</b> <font color="#AD7FA8"><b>warning: </b></font>ISO C90 forbids mixed declarations and code [<font color="#AD7FA8"><b>-Wdeclaration-after-statement</b></font>]
</pre>

However, if I were to run this using c99, I would have no issue at all:
```shell
$ gcc -std=c99 --pedantic /tmp/test.c
$ echo $?
0
```

This behavior stumbled me. It went against my understanding of the language. It 
would seem that I am not alone in this. Another [blogger ayekat](http://ayekat.ch/blog/vla) 
was also very puzzled by this behavior:
> In my case it was a simple sequence of code that I thought would never compile — and the moment it did, I feared I would not be on good terms with it
> \- [ayekat](http://ayekat.ch/blog/vla)

---

## What are VLA

---

VLA (Variable Length Arrays) were introduced in C99 as a way to introduce the 
ability to create arrays whose length is determined at runtime. VLA in C 
has automatic storage duration on the stack. 

The main benefit I can think of why anyone would want to use VLA is for its 
convenience and readability. For instance, representing matrices 
becomes simple:
```c
int matrix[n][n];
```

Unlike the traditional way to allocate memory whose size is determined during 
runtime using `malloc`, VLA allocates memory in the stack.
According to what I read on the internet, people claim that the overhead with VLA 
is less compared to allocating in the heap. Allocating memory in the stack does 
not require the OS to find a free contiguous block of memory in the heap. 
However, this claim is questionable and maybe true only in certain scenarios. 
I would need more time and fiddling to know for certain. I'll trust in the 
words of Linus that VLA isn't efficient.

VLA has automatic storage duration meaning the scope of a VLA is limited to 
its local scope. Effectively making VLA only great as a short lived and for 
small arrays only. You cannot allocate a big array with VLA as the data lives 
in the stack and can easily be filled up. 

VLA is similar to `alloca` where both concepts allocate memory in the stack. 
As [blogger ayekat](http://ayekat.ch/blog/vla) 
mentions on his take on VLA, using VLA is very risky because the behavior of 
`alloca` is undefined if allocation causes a stack overflow and VLA will behave in a similar manner.

<pre class = "highlight">$ man alloca | grep -A 2 "RETURN VALUE"
<font color="#C01C28"><b>RETURN VALUE</b></font>
       The alloca() function returns a pointer to the beginning of the allocated space.  If the allocation causes stack overflow, program behavior is undefined.
</pre>

For those who are not familiar, a stack overflow not only breaks the program, 
it also introduces a door to exploit your system by feeding it malicious 
input to overwrite sections of memory it should have no access to (look up 
buffer overflow).

A nice way to create a n x n matrix addressable as `matrix[x][y]` as described 
by someone on [stackoverflow](https://stackoverflow.com/a/7326654) is 
the following:
```c
size_t n;
double (*matrix)[n] = malloc(n * sizeof *matrix);
```

This is much more preferred than addressing a matrix as `matrix[y*n + x]` or 
allocating a non-contiguous nxn matrix (i.e. each row points to a different 
section in memory) to achieve the same thing but with performance hits 
(i.e. cannot utilize cache line and so you would need the CPU to fetch to the 
memory multiple times).

**Note:** VLA and `alloca` are different because data created via `alloca` are 
destroyed when the function is terminated. While VLA is local to its scope. 
So if you were to create a VLA within the loop, it can only be used within the 
loop itself and nowhere else in the function.

---

## Should I use VLA

---

My first instinct is to say no. There are a few things wrong about VLA, some 
of which I stated in the previous section.

* VLA is allocated in the stack -&gt; need to ensure the size is small to avoid buffer overflow
* VLA has automatic storage - &gt; need to ensure array is created in the oldest stack frame as possible to avoid referencing a 
section of memory that is freed (i.e. want to avoid dangling pointers).
* portability:
    * It's only supported in C99 -&gt; not portable for older systems
    * Optional in C11 meaning it's up to the compiler's discretion whether to add support or not
    * MSVC does not have VLA support since it [conforms to ANSI C standard](https://docs.microsoft.com/en-us/cpp/c-language/ansi-conformance?view=msvc-160)
<center>
<iframe style = "width: 100% !important; height: 40vh !important" src="https://godbolt.org/e?readOnly=true#g:!((g:!((g:!((h:codeEditor,i:(fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,source:'%23include+%3Cmap%3E%0A%23include+%3Cstring%3E%0A%23include+%3Ciostream%3E%0A%0Aint+main(void)+%7B%0A++++int+n+%3D+10%3B%0A++++int+arr%5Bn%5D%3B%0A%0A%0A++++return+0%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:55.08679411118436,l:'4',m:100,n:'0',o:'',s:0,t:'0'),(g:!((h:conformance,i:(compilers:!((compilerId:g92,options:''),(compilerId:clang900,options:''),(compilerId:icc191,options:''),(compilerId:vcpp_v19_22_x64,options:'')),editorid:1,langId:c%2B%2B,libs:!()),l:'5',n:'0',o:'Conformance+viewer+(Editor+%231)+4/10',t:'0')),k:44.91320588881564,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4"></iframe>
<small><b>iframe 1:</b> Using godbolt (Compiler Explorer) to see what Compilers support VLA</small>
</center>

* VLA aren't efficient
    * VLA has a small runtime overhead to determine the size of the array
    * generates more, slower, and fragile code according to Linus Trovalds

> unsigned long key[geo-&gt;keylen];
>
> (note: skipping some content)
>
> AND USING VLA'S IS ACTIVELY STUPID! It generates much more code, and
much _slower_ code (and more fragile code), than just using a fixed
key size would have done. - [Linus Trovalds](https://lwn.net/Articles/749089/)

---

## Summary

---

Variable Length Array (VLA) allows you to create arrays whose size is determined 
at runtime but at the cost of runtime overhead and security. VLA 
is only supported in C99 and not mandatory in C11 meaning VLA is not a portable 
solution. It is best to avoid using VLA.


**sidenote:** I highly encourage you to 
read [Ayekat's take on VLA](http://ayekat.ch/blog/vla) as it explores something interesting when working 
with 2D arrays.





