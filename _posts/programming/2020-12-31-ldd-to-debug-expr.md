---
layout: post
title: Debugging expr with ldd
categories: [programming, c/c++, linker]
---

---
# TOC
* [1. expr failing to perform simple multiplication](#sec1)
* [2. Investigating expr](#sec2)
* [3. Looking at the libraries used by expr](#sec3)
      
---

<h1 id = "sec1">expr Failing to Perform Simple Multiplication</h1>

At work, I have been doing some investigation as to why a build of low 
priority stopped passing sanity testing. During my 
investigation, I was plugging in some numbers to `expr`, a unix tool that can 
evaluate basic expressions such as adding and subtracting numbers, to 
calculate some values in the program setting. However, I encountered a strange 
behavior where the math was not making sense. To illustrate, look at the 
figure below:

```bash
$ expr 2 \* 2
8589934592
```

What you are seeing is a program that is failing to do basic math. This made 
me very curious. I knew this was likely not related to the investigation, 
but I never saw a well established UNIX tool failing to do its job. So I 
decided to take a small detour from my work.

<h1 id = "sec2">Investigating expr</h1>

One of the first things you want to do when debugging is to see if the error 
can be replicated on another machine. As expected, I was not able to replicate 
this abnormal behavior on other machines. Any input I would give to the 
target machine would never compute the product correctly. Though it'll 
calculate any other expression (i.e. +, -, /, <, >, etc) correctly.

This seemed very odd to me because `expr` was working on every other function 
other than multiplication. This behavior made me think that perhaps `expr` 
is not able to read `\*` properly because of some random alias. 

So I decided to use `strace`, a program that tracks system calls and signals 
made to and from the program you wish to trace. Seeing the first line of 
strace made me immediately give up the idea that the input was being supplied 
to `expr` incorrectly.

```c
execve("/usr/bin/expr", ["expr", "10", "*", "10"], 0x7ffff18d5b98 /* 35 vars */) = 0
```

Seeing how the arguments to `expr` (the 2nd parameter to `execve`) are 
correct, I decided to see if there was something wrong with the math 
library by writing a simple C program:

```c
#include <stdio.h>
#include <stdlib.h>

int main () {
  printf("%d\n", 10*10);
  return 0;
}
```

As expected, the program prints to stdout with the correct result (i.e 100). 
I cannot imagine there being an issue with the OS math library because I am 
fairly sure it just runs some assembly such as `MULT` or `MUL`. So it was 
stupid of me to even think there was an issue with the standard library. 
Though I wouldn't be too far off it would seem.

<h1 id = "sec3">Looking at the libraries used by expr</h1>

I cannot imagine how difficult it would be for a program to do some basic 
multiplication. But I did recall there exist various algorithms to compute 
the product of some numbers very efficiently. So perhaps `expr` is doing more 
than just multiplying numbers using the built-in assembly instruction. So I 
decided to check what dependencies (libraries) `expr` is using with `ldd`. 
`ldd` is a unix tool that prints the shared object dependencies of the 
program. It's quite simple, just type in `ldd <prog>` to see a list of shared 
libraries it utilizes. For those who do not know what shared libraries are, 
it's simply a binary that contains functions that are linked to the program 
during runtime. This allows for the program to be small in size since it does 
not need to include the code of common functions.

```bash
$ ldd `which expr`
  linux-vdso64.so.1 => (0x0003fff9d4800000)
  libgmp.so.10 => /home/user/dir/lib/libgmp.so.10 (0x00003fff9df00000)
  libc.so.6 => /lib64/power8/libc.so.6 (0x00003fff9d200000)
  /lib64/ld64.so.2 (0x00000000749a0000)
```

If we were to compare this with our test c program,
```
$ ldd a.out
	linux-vdso.so.1 (0x00007ffc06fcb000)
	libc.so.6 => /lib64/power8/libc.so.6 (0x00007f093f68e000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f093f875000)
```

We see that `expr` uses a library named `libgmp.so.10` which our test program 
does not. For context, GMP is "GMP is a free library for arbitrary precision 
arithmetic, operating on signed integers, rational numbers, and 
floating-point numbers.". There's actually no suprise that `expr` uses the 
GMP library. However, notice where `expr` is loading `libgmp.so.10` from. 
**It's located under `/home`!** This was really unexpected. Normally you would 
expect the shared library be located under `/lib64` on RHEL and Fedora 
machines. I compared the md5sum of the
binaries stored under `/home` and from `/lib64`. As expected, the 
md5sum of each binary was different.

**Note:** `md5sum` is a tool that is useful to compare whether 
two files are identical.

Now you may be wondering why it's looking at the GMP library under `/home` 
rather than under `/lib64`. The answer is quite simple. The environment 
variable, `PATH` contains all the directories that the system will check for 
when trying to load a library or module. It would seem that the particular 
user has a copy of GMP under its `/home` directory which has a higher 
search priority than `/lib64`. Hence why it loaded the version stored under 
`/home` and not from `/lib64`. I suspect the version under `/home` is for 
another version of RHEL which could explain why `expr` was acting weirdly. 
I did try to go deeper into the rabbit hole by looking at the source code for 
`expr` but that's for another time. All I needed to know was that it was using 
the incorrect GMP library.

---

<h1>Conclusion</h1>

The next time a UNIX tool is acting weirdly, use `ldd` to check which library 
it is using and compare it with the most stable version your distribution 
offers because it could just be a faulty library.
