---
layout: post
title: A Dive to Build - Part 2 of the Build Series
categories: [programming]
---

On my previous post [What does the Build Team Do](build-team), I covered various topics about builds and devOps. Today, I want to go more in depth on what goes on when you press the run button which I briefly brushed over in the previous post. This does get quite technical but don't fret. I have stopped myself from writing and reading up in depth about the topic to avoid going through the rabbit hole. 

## What is a Build

For the sake of those who did not read my [previous post](build-team) , I'll repeat some of the content I shared previously. 

You may recall when working on Java, C, or C++ you ran a Build by pressing  pressing Build, Run, or Play button

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/eclipse-build.png)

or you "compile" your code on the terminal

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/gcc-build.png)

But what does this actually do? As you may know, a build is just simply the process of converting your source code (i.e. `.c` or `.java`) to a binary/exectuable (i.e. `.exe` or `.o`).

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/highlevel-build.png)

An executable to put it briefly is the **ready to run** form of a program (hence why we call it an **executable**). An executable consists of instructions (i.e. machine code) that consists of zeros and ones assembled in a way the CPU understands. Some common locations where executables can often be found on Unix-Like Operating System (OS) under `/bin`, `/sbin`, `/usr/bin`, or `usr/local/bin`. 

### Steps In  A Build

Turns out, there is actually a lot that goes on in a build. Your IDE or compiler abstracts the build process. Frankly, most developers will never need to understand how your compiler works nor do they need to understand the steps of creating a build. Here's a diagram of what occurs when you are "compiling" (building) your program:

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/highlevel-build2.png)

### 1. Preprocessor - Expands source code

Before your source code is translated to assembly or machine code, it first goes through a program which we call the **preprocessor**. Essentially the preprocessor expands and substitute your code by expanding macros and include files. 

For those with no or limited C programming experience, here's an example of a preprocessor:

```c
#define MAX_BUFFER_SIZE 10


int main () {
    int arr[MAX_BUFFER_SIZE];
    ...
```

The output of the preprocessor becomes:

```c
int main () {
    int arr[10];
    ...
```

Although it may look similar to a **constant** variable but macros are substituted by the preprocessor while the compiler will deal with variables. There are some things you can do with macros that const cannot do such as the example above where the array size can be easily changed. Macros can do more than subsitute constant values. The power of macros are its ability to control what part of the source code to substitute (conditional directives) and the ability to write "function" like macros that does not have the overhead of function calls (which I won't get into).

```c
#ifdef DEBUG
printf("File: %s on line %d", __FILE, __LINE);
printf("Value of x: %d\n", x);
#endif
```

If the macro `DEBUG` is 1 or enabled (i.e. pass `-DDEBUG` to the preprocessor), the resulting source code will contain the block above. If not, the code above will not appear in the resulting program. This is especially important if you are working on software that supports multiple platforms (we'll get to this later). But here's a sneak preview (extracted from the source code of Node.js JS runtime):

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/nodejs-macro.png)

In regards to macro's "function" like ability, here's a short example:

```c
#define PI 3.14
#define AREA(x) (PI*(x)*(x))
double area = PI * Square(9.5); //area = pi * r^2
```

The compiler will see the resulting source code below:

```c
const double area_of_scope = (3.14*(9.5)*(9.5));
```

---

#### Side Note: A Quick Metric on Function Overhead Performance

On a side note, if you want to see how much performance hit function overhead can be, see the following example:

```c
#include <stdio.h>
#include <stdint.h>
#include <time.h>

#define DIVISOR 3.56
#define DIV(x) ((x)/DIVISOR)

double div(uint32_t x) {
  return x / DIVISOR;
}

int main () {
  double sum = 0;
  clock_t begin = clock();
  for (uint32_t i = 0; i < UINT32_MAX; i++) {
    #ifndef DIV_MACRO
    sum += div(i);
    #else
    sum += DIV(i);
    #endif
  }
  clock_t end = clock();
  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  printf("%f", time_spent);
  return 0;
}
```

To measure the function overhead performance, I wanted to conduct a test where the function gets called a lot of times (hence why the program loops `UINT32_MAX`) and performs some expensive operation (float division are a bit expensive) so that results are very noticeable. 

The program was compiled **using no optimization** (i.e. `-O0`) because any form of optimization will remove the need to create a new stack frame which would defeat the purpose of explaining the penalty of calling a function. You can verify this through looking at the resulting assembly code (i.e. `-S`) or running `gprof` (a profiling tool) with optimization enabled. You'll see that they reduced the amount of stack frames created to 0. Meanwhile  with no optimization, the function `div` gets called `4294967295/4294967295` as needed. Your compilers are very good at optimization. 

Here was the result on my Raspberry Pi 3B, taking the average of 3 runs:

```bash
== WITH MACRO ==
Optimization 0: 143.475339

== NO MACRO - FUNCTION CALLS ==
Optimization 0: 193.950554666667
```

As you can see, there is a notiecable performance impact when we choose not to use a macro

---

### 2. Compile & Assembler

The job of the compilation and assembling stage is to create an object file which contains machine code but is not complete. The resulting object file is **not executable**. If we were to try execute the object file, we'll get the following error:

**Example:**

```bash
$ gcc -c test.c -o test.o
$ chmod +x test.o
$ ./test.o
-bash: ./test.o: cannot execute binary file: Exec format error 
```

The compiler will first translate the given highl level source code into assembly which gets passed onto the assembler to be translated to machine language. Typically, each assembly instruction has a one to one corresponding machine code instruction unlike high level languages where a lot of lines of assembly code will be needed per instruction. An object file typically isn't complete because it contains symbol references (i.e. variables and functions) not defined in the file itself and doesn't have the instructions for the program to be executable. To make the program executable, the files must be linked which is done by the linker.

**Note:** To replicate the compile stage (which also assembles the code), run **gcc** with `-c` option

**Note:** To produce the assembly code, run **gcc** with `-S` option

## 3. Linker

A linker is a program that takes one or more object files & data and combines them into an exectuable file, a library file, or another object file. During compilation (the previous stage), the compiler will not complain if the code references symbols or functions in the code are not defined. To illustrate, here's an example:

**main.c**

```c
void honk();
void meow();
int main() {
    honk();
    meow();
    return 0;
}
```

where `main.c` contains function calls to `honk` and `meow` not defined in the code itself. So how does `main.c` know about the two functions? The simple answer is through declaraing to the compiler that the functions exist. The ability to call functions defined in other files is common in programming (run `readelf -a main.o` and you'll see that `meow` and `honk` are located in the `relocation` section. I probably won't explain what this is).

A linker resolves the missing references of symbols and functions not defined in a file by linking them with other files that does contain the implementation. In software developing, we like to berak prorgams into many smaller parts (especially in Object oriented programming) and use functions that are defined in other files. Therefore,  to compile code referencing symbols or functions defined elsewhere, you need to **declare** (provide a signature or definition) them for the build to not break as seen in **main.c**. In **main.c**, the first two lines `void honk();` and `void meow();` declares to the compiler of the functions existence. Something simple as `printf` from the standard input and ouput library has to be declared in your source code. Although you may have never explicitly delcared the `printf` function in your programs, referencing (i.e. including) the standard input/output (i.e. `stdio.h`) library at the start of your source code actually contains the declaration of `printf` and all other functions the standard io library provides you. This is actually done by the **preprocessor** which I explained earlier.

One of the benefits of linkers is that they allow compilation to be done separately or in smaller manageable parts. A change in one module or file does not require recompilation of the entire project. All that is needed is to recompile and relink a single or a small set of modules. This is a time saving feature.

![](https://www.webopedia.com/wp-content/uploads/2020/10/link_5f854d22127de-2.gif)

Though confusing, `gcc` is a C and C++ compiler that normally does all the steps of the build from preprocessing to linking object files. Here's the description of `gcc` from the man pages:

```bash
When you invoke GCC, it normally does preprocessing, compilation, assembly and linking. 
```

![](https://upload.wikimedia.org/wikipedia/commons/9/9a/Preprocessor.png)

#### Demo

Let's go over to the terminal and work on building a program step by step. We have the following 3 files:

**main.c**

```c
void honk();
void meow();
int main() {
    honk();
    meow();
    return 0;
}
```

**goose.c**

```c
#include <stdio.h>
#define PI 3.14
#define Square(x) ((x)*(x))
void honk() {
    double area = PI * Square(9); //area = pi * r^2
    printf("The Goose Honks the area of the circular pond: %.2f m^2\n", a);
}
```

**cat.c**

```c
#include <stdio.h>
void meow() {
    printf("The Cat Meows at its \n");
}
```

### Step 1 - Preprocessing

The first step in the build process is preprocessing. To see what the compiler (`gcc` in our case) sees, we can run `gcc -E <file.c>`. 

If we were to run the preprocessor for the file `goose.c`, we can see the following:

```bash
# 4 "goose.c"
extern int printf (const char *__restrict __format, ...);
void honk() {
  double area = 3.14 * ((9)*(9));
  printf("The Goose Honks the area of the circular pond: %.2f m^2\n", area);
}
```

(this is just the snippet of the output from the preprocessor and not the entire time)

As expected, all the macros of been expanded and substituted along with the declaration of printf to tell the compiler that the function exists.

## Step 2- Compilation and Assembler

Once the source files have been preprocessed such that all external symbols have been declared and all macros have either been expanded or ran, we need to compile the code to produce the assembly code of our source files. This can be done using the `-S` option in `gcc`. Let's look at the ouput of compiling `main.c`:

```c
        .file   "main.c"
        .text
        .globl  main
        .type   main, @function
main:
.LFB0:
        .cfi_startproc
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        movl    $0, %eax
        call    honk
        movl    $0, %eax
        call    meow
        movl    $0, %eax
        popq    %rbp
        .cfi_def_cfa 7, 8
        ret
        .cfi_endproc
.LFE0:
        .size   main, .-main
        .ident  "GCC: (GNU) 10.2.1 20201125 (Red Hat 10.2.1-9)"
        .section        .note.GNU-stack,"",@progbits
```

[]alk about relocatable files here]

---

Although assembly is an extremely low-level language, our CPU does not understand ASCII characters. We need to translate the resulting assembly code to ones and zeroes. Luckily, assembly is a mnemonic language (symbolic language) meaning that each command in Assembly typically has a corresponding opcode (binary instruction). So we will need to run the assembler to transform our assembly code to machine language which should be very fast. This can be done using the assembler `as`. But let's just use the   `-c` option in `gcc` to do all the steps we covered so far: preprocessor, compilation, and assembly stage. 

```bash
$ gcc -c main.c
$ gcc -c cat.c
$ gcc -c goose.c
```

### Step 3: Linking

As I stated earlier, producing the object file for the project does not mean you can execute the program. The object files may contain instructions that your CPU could somewhat understand, it is not complete. Object files will have undefined references to symbols and functions that are not defined within the files themselves. To illustrate, imagine you are running an errand to deliver a package to a person's house using the bus. However, you are not given the address of where the house is, who is the receiver, nor have the package with you. You cannot complete the tasks with those missing information. That's where the linker comes in handy. The information you need to perform some action in software development is often defined elsewhere. The linker combines all the object files, static files and figure out what dynamic libraries are needed and packaged them into one executable file. 

We will be using **ld** to link our object files to relocate data and tie up symbol references. 

The basic idea is to link all the object files generated for this project like so:

```bash
ld cat.c goose.c main.c -o prog
```

Unfortunately, it's a lot more complex than that. We also need to link other files which I won't go into. The actual command is given below:

```bash
ld /usr/lib64/crti.o /usr/lib64/crtn.o /usr/lib64/crt1.o /usr/lib64/libc.so cat.o goose.o main.o -dynamic-linker /lib64/ld-linux-x86-64.so.2 -o prog
```

(Thanks to [ZeZNiQ]([c - Running gcc's steps manually, compiling, assembling, linking - Stack Overflow](https://stackoverflow.com/questions/8527743/running-gccs-steps-manually-compiling-assembling-linking/56209398)) for outlining the `crt` files needed to execute on amd64 (x86_64))

Once the files have been compiled, assembled, and linked, we can execute the program:

```bash
$ ./prog
The Goose Honks
The Cat Meows
```

## Build Definition - Summary

* build is the process of converting source code into an executable

* builds have a few steps such as compilation and linking

* compilation is the process of converting source code into machine code saved in the form of an **object file**

* linking is the process of combining object files into an executable

* You do **NOT** need to understand the entire detail of what was covered just now about how to build each step. But it's very helpful and useful to have a general understanding of what goes behind the scenes

### Why Care How Build Works

Frankly most developers do not care how software gets built. We just want to make small changes, recompile and iterate. Learning all the complexities of the build simply consumes way too much time. Accordnig to the book **Software Build Systems: Principles and Experience**

## Compiled v.s Interpreted Languages



## Image Credits (Not exhaustive)

* Olivier Pinçon &amp; Sébastien Granjoux - http://library.gnome.org/users/anjuta-build-tutorial/2.26/build-gcc.html.en, [GFDL](https://commons.wikimedia.org/w/index.php?curid=13208308)
