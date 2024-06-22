---
layout: post
title: Polluting the Web With a Useless 5 argument main function
description: An odd occurance of a 5 argument main function that I encountered during decompilation and the efforts to replicate the result
categories: [programming, c/c++, ghidara]
---

A random blog post that does not have a good definite answer nor have much purpose aside from writing my random bits of nonesensical information. 
You have been warned.

Recently I got an invitation to try [hextree.io](https://www.hextree.io/) before their official launch date. For those who do not know,
hextree is a future cybersecurity learning platform created by two popular educational hacking youtubers [LiveOverflow](https://www.youtube.com/liveoverflow) 
and [stacksmashing](https://www.youtube.com/stacksmashing). I always wanted to try Ghidra, an open source reverse engineering tool developed by 
the NSA, after watching a few decompilation projects on youtube and on Github appear in my feeds. So when I saw a short introductory course 
was offered for free on Hextree, I jumped in. This also means I only have 2-3 hours of Ghidra experience, so please excuse my ignorance of 
how Ghidra works.

One of my initial surprises about its decompilation is how "bad" it decompiles `main`.
For context, a decompilation tool like Ghidra takes in a binary and does its best to decompile the code into some human readable code like C. It is the user's job to fill in the blanks, correct and 
make their own analysis of the resulting code. Let's look at a simple example of what is expected that may be of surprise to those who have 
not used Ghidra before:

```c
undefined8 main(undefined8 param_1,undefined8 *param_2)
```

or 

```c
undefined8 main(int param_1,long param_2)
```

One would naturally expect any decompilers to be able to correctly decompile the function signature of main to be:

```c
int main(int argc, char **argv)
```

On a 64-bit x86 Linux machine, `int` has a size of 4 bytes. But Ghidra states the return type of `main` and `argc` which are both of type `int` 
to have a size of 8 bytes. I do not know enough to comment about this particular issue nor had I have any success figuring out an answer that 
is satisfactory. Through [dogbolt](dogbolt.org), I always see BinaryNinja decompiling `main` properly so I guess either BinaryNinja has a 
better decompilation algorithm or it simply translate `main` using "common-sense". I think it's the latter as we will see in the next section.

> Random Note: This post was originally intended to go over assembly and potentially explain why Ghidra decompiled `main` terribly but I 
gave up after I found out my hypothesis was wrong :(

## Bizarre Decompilation of Main: 5 arguments

`main()` function has one of the following number of arguments:
* 0 arguments as stated in the C standard
* 2 arguments `(int argc, char **argv)` - as stated in the C standard
* 3 arguments `(int argc, char **argv, char **envp)` - which is not POSIX compliant (refer to `man execve` for more details)
* 4 arguments `(int argc, char **argv, char **envp, char **apple)` - apparently this is a thing on [Darwin-based OS such as macOS](https://en.wikipedia.org/wiki/Entry_point)

However, on one of the decompilation challenges, Ghidra decompiled main with 5 parameters:

```c
undefined8 main(int param_1,long param_2,undefined8 param_3,uchar *param_4,size_t param_5)
```

This stumped me because I have never seen `main` in any standards and implementation with more than 3 arguments (minus macOS which 
I never knew was a thing till I started my research for this blog post). 
This prompted me to see how one would even replicate this behavior as the original C code was not provided in the challenge.
There was no way Ghidra can do such a bad job that it decompiles `main` with 5 parameters unless the programmer tricked Ghidra 
to output such madness because all Ghidra does is decompiles the binary into C code based on disassembling the binary into assembly 
first (I think) and do some tricks to know where to start disassembling and perhaps follow all jumps and branches 
(I got zero clue to be honest). Astute readers should realize that I am truly unqualified to make any assumptions about Ghidra 
as I only have 2-3 hours of experience with the tool.

Regardless of how Ghidra managed to decompile `main()` to have 5 arguments, I am approaching this problem assuming the 
programmer purposely obfuscated `main()` to trip beginners to the tool (it is an excercise after all).

I now present to the internet the most useless `main()` function in existence that has 5 parameters for no good reason aside 
from polluting the web with nonesense like most of my content:

```c
#include <stdio.h>

void foo(int param1, char **arg2, char status) {
  printf("%p", arg2);
}

int main(int a, char **b, char *c, short int d, char e, ...) {
  foo(a, b, e);
}
```

With the symbols stripped, Ghidra will decompile the following `main()` as:
```
undefined8
FUN_00401153(undefined4 param_1,undefined8 param_2,undefined8 param_3,undefined8 param_4,
            char param_5)

{
  FUN_00401126(param_1,param_2,(int)param_5);
  return 0;
}
```

However, [BinaryNinja](https://dogbolt.org/?id=74e519e9-b8b6-4b70-bd06-bbe500b07833#BinaryNinja=75) will decompile `main` properly, completely ignoring my trick:
```
int32_t main(int32_t argc, char** argv, char** envp)
```
Seeing the resulting decompilation from BinaryNinja, I don't think it's even bothering to respect the code I wrote seeing how it passes `argv` 
into the function `foo`.

A pattern I figured out to either trick gcc or Ghidra to obtain the 5 parameter `main()` function was to ensure the 
5th parameter is mentioned in `main()` even if it's useless as passing it to another function that completely ignores it.

## Why is this Possible?

Contrary to popular beliefs, `main()` is not the first function that gets executed. There's a whole hidden world that your teachers don't tell 
you about (unless you happen to have a need to learn it). On a Linux environment, `gcc` by default will link your code with a few `crt` object 
files which are c runtime object code that deals with stuff before and after main. When you execute your program, the dynamic linker should 
link your program with glibc, where it'll call `main()`. The very first program that actually executes (once the loader runs) is `_start()`.

I am not going into specifics but here are links I only skimmed for a minute or two: 
* Brief: [CRT: C Run Time Before Starting main()](https://www.vishalchovatiya.com/crt-run-time-before-starting-main/)
* In-Depth: [Linux x86 Program Start Up or - How the heck do we get to main()? ](http://dbp-consulting.com/tutorials/debugging/linuxProgramStartup.html)

Here is an overview of what goes on before we call `main()` based on a quick trace I did on gdb:
1. Program begins at the function `_start` 
2. `_start` will call `__libc_start_main_impl`
3. `__libc_start_main_impl` will initialize and prepare to execute `main` such as retrieving the secret `envp` pointer
4. Eventually when everything is ready, `__libc_start_main_impl` will call `__libc_start_call_main` which will eventually call `main`

The answer as to why we can pass in more than 3 arguments lies in the following line under `glibc/glibc/sysdeps/nptl/libc_start_call_main.h`:
```c
result = main (argc, argv, __environ MAIN_AUXVEC_PARAM);
```

Notice after `__environ` which is our mysterious `envp` pointer, there is the macro `MAIN_AUXVEC_PARAM` whose possible definition can be found 
under `csu/libc-start.c`:

```c
# define MAIN_AUXVEC_PARAM	, auxvec
```

Despite my attempts to discover what the value of `auxvec` is or if `MAIN_AUXVEC_PARAM` expands to anything else, I was unable to. I was 
initially hoping that this macro `MAIN_AUXVEC_PARAM` has the answer to my question. However, it does not seem to but rather have a 
disappointing answer. The closest thing I could find about `auxvec` is that it stores a certain set of information that is passed to the 
userspace by the Kernel's ELF binary loader such as the size of data cache block.

The best I could come up with is simply that the code before `main()` doesn't care if you provide it 3 or 6 arguments to `main()`, it'll 
execute `main` as if it was a 3 or 4 parameter function. Which closes this blog post on a sad and disappointing note. 
As the title suggest, this blog post is a post that simply pollutes the internet.

### Random Notes - Ignore

```c
int main(int argc, char **argv) {
    return argc;
}
```

```nasm
main:
        push    rbp                     ; push the base pointer into the stack
        mov     rbp, rsp                ; replace the base pointer with the current stack pointer
        mov     DWORD PTR [rbp-4], edi  ; set edi with the value of argc
        mov     QWORD PTR [rbp-16], rsi ; set rsi with the value of argv (the 2nd argument)
        mov     eax, DWORD PTR [rbp-4]  ; set the eax register, the register that will hold the return value with argc 
                                        ;   setting eax with edi should also be valid I think 
        pop     rbp                     ; pop the top of the stack and store it to rbp register
                                        ;   i.e.restores the caller's rbp
        ret
```
