---
layout: post
title: What is Name Mangling
description: Exploring name mangling through extern C
categories: [programming, c++]
---

Today I want to explore what name mangling is in C++ and what does `extern "C"` 
means.

---

## Prelude

---

Recently I came across a question about name mangling from a new intern who 
was working with a developer to resolved an `Undefined symbol` error causing 
our aix builds to fail. While the solution was to update our makefile, the 
intern was curious as to what `FOO_EXTERNC` was. When they approached me, I 
had no clue. But after being told that the internal wiki states it 
was used to prevent mangling, I had a general idea of what `FOO_EXTERNC` meant in 
our code.  


Before jumping on me that it should have been obvious based on the name, 
take into consideration the following:
* we are not part of the development team but rather part of DevOps meaning 
we are not familiar with the source code and the macros used
* the intern and I are not C++ programmers (I only dabbled in C++ recently 
after playing with C for many years)

---

## What is Name Mangling

---

In C++, there's a concept called mangling which gives variables and functions 
unique names so that the linker can distinguish between them. If you are a C 
programmer, you may be confused because every variable and function is
unique. To illustrate, you cannot declare two variables with the same name 
if they have the same scope or declare two functions with the same name. 

However, in C++ function overloading is possible. Function overloading gives 
the ability to create functions with the same name but with different 
implementations as long as there is a way to distinguish between the functions. 
Your compiler allows function overloading as long as the functions have 
a different number of arguments, different types of arguments or the presence 
of an ellipsis. For instance, in the example below, we have two definitions of 
`print_val` where the first one takes in an integer and the latter takes in a 
`struct Point` as an argument.

```c++
struct Point {
  int x,
  int y
};

void print_data(int x) {
  cout << x << std::endl;
}

void print_data(struct Point& pt) {
 cout << "x: " << pt.x << " y: " << pt.y << std::endl;
}

int main () {
  int point = 10;
  struct Point pt = {1, 2};
  print_data(x);
  print_data(pt);
  return 0;
}
```

Since C++ allows function overloading, the compiler needs to encode the 
function and variable so that it can uniquely identify between them so that 
the linker can do its job to link the correct function. For instance, on my 
machine (using gcc), `print_data` gets encoded as:

<pre style="background: #282a36; color: white; padding: 15px; font-size: 15px">$ nm a.out | grep -E &quot;print_data|Point&quot;
0000000000401287 t _GLOBAL__sub_I__Z10<font color="#C01C28"><b>print_data</b></font>i
0000000000401186 T _Z10<font color="#C01C28"><b>print_data</b></font>i
00000000004011b0 T _Z10<font color="#C01C28"><b>print_data</b></font>R5<font color="#C01C28"><b>Point</b></font></pre>

As you can see we have two versions of `print_data`, one that has an `i` suffix for integer and the latter having `R5Point` to 
represent the `struct Point`. Every compiler encodes the symbols differently as there are no standards on how to mangle.

---

### Aside: My Exposure to Name Mangling

---

As I stated earlier, I only recently dabbled in C++ so I wouldn't have a need 
to learn about mangling. I never took a compiler course (which is a shame) 
but I have seen enough build logs to notice its existence.

Whenever an AIX build fails, I always see a loadmap is generated where I see 
all sorts of weird mangled symbols. And it's not rare to see them in our logs 
when our product fails during BVT testing. It was only when I read 
Dennis Yurichev's, the author of *Reverse Engineering for Beginners*, [C/C++ Pogramming Language Notes](https://yurichev.com/writings/C-notes-en.pdf) 
did I realize what those weird symbols were.

---

## What Does `extern "C"` Have Anything To Do With Mangling

---

A lot of C++ applications rely on C libraries, especially projects with older 
source code. This mix of languages can cause issues if you do not consider 
the possibility of mangling as seen in [this person's blog](https://peeterjoot.wordpress.com/2011/10/11/name-mangling-link-errors-with-mixed-c-and-c/).

The main issue with mixing C libraries into C++ applications is that the linker 
will be unable to find the required symbol from the library because the C++ 
object file will be referencing the mangled variable/function which does 
not exist in the C compiled library. Hence why we need to enclose the 
function declaration within `extern "C"` block to 
tell the compiler to not mangle the symbols so that our linker can resolve 
symbols in our program. It also tells the linker the language linkage (i.e. is 
this symbol using C or C++ linkage. Though this is just my surface level understanding). 
Here's a sample of how the header file should be 
formatted to prevent mangling of our C functions/variables.

```c++
#ifndef HEADER_H
#define HEADER_H

#ifdef __cplusplus
extern "C" {
#endif

//place the function and variable declaration here
void foo();

#ifdef __cplusplus
}
#endif

#endif
```

The macro `__cplusplus` is defined by our C++ compiler. If the header file 
is preprocessed by a C compiler, `__cplusplus` would be evaluated to be false 
causing the functions to not be enclosed within the `extern "C"` block. You must 
ensure the resulting code to the compiler contains `extern "C"` only 
if `__cplusplus` is defined or else you will get the following result:

<pre style = "background: #282a36; color: white; padding: 15px; font-size: 15px">In file included from <b>bluetooth.c:1</b>:
<b>bluetooth.h:11:8:</b> <font color="#C01C28"><b>error: </b></font>expected identifier or ‘<b>(</b>’ before string constant
   11 | extern <font color="#C01C28"><b>&quot;C&quot;</b></font> {
      |        <font color="#C01C28"><b>^~~</b></font>
</pre>

This technique can be seen in every major C library such as [`stdio.h`](https://www.gnu.org/software/m68hc11/examples/stdio_8h-source.html):
```c
00026 #ifndef _STDIO_H_
00027 #ifdef __cplusplus
00028 extern "C" {
00029 #endif
00030 #define _STDIO_H_
```

---

## Demo

---


Let's go through a simple example. Let's say we are creating a program that 
tries to connect to a bluetooth device and we have the following into our 
bluetooth library:
```c++
#include "bluetooth.h"
#include <stdio.h>

//bluetooth stuff
// ...
// ...

int bt_cmp(const char *dev1, const char *dev2) {
  //do stuff
  return 0;
}
```

Let's compile `bluetooth` using our beloved C compiler (I'll be using gcc).
```
$ gcc -c bluetooth.c -o bt.o
```

Since the bluetooth binary has been created, we can use the functions from the 
binary in our C++ applications by including the header file `bluetooth.h`:

```c++
#include <iostream>
#include "bluetooth.h"

int main (int argc, char **argv) {
  printf("Hello world\n");
  const char *dev = "00:11:22:33:FF:EE";
  if (bt_cmp(argv[1], dev) == 0) {
    return 0;
  }
  return 1;
}
```

Whether or not this program will compile will depend on how the header file is 
written. Without the functions enclosed in `extern "C"`, we get the following:
```
/usr/bin/ld: /tmp/ccv7dyLJ.o: in function `main':
test.c:(.text+0x37): undefined reference to `bt_cmp(char const*, char const*)'
collect2: error: ld returned 1 exit status
```

**Note:** The command to compile is: `g++ test.c bt.o -o prog`

Let's examine the issue further by compiling `test.c` separately (i.e. do 
not link with `bt.o`) and compare the symbol defined for `bt_cmp` in each of 
the binaries. As expected, `bt.o` does not mangle our symbol:

```
$ nm bt.o | grep bt_cmp
000000000000001d T bt_cmp
```


With the command `g++ -c test.c -o test.o`, we can compile our C++ code without 
linking. In the resulting binary, we see the following mangled symbol: 
```
nm test.o | grep bt_cmp
                 U _Z6bt_cmpPKcS0_
```

The resulting symbol definitely does not match with the symbol defined in 
our bluetooth binary. Hence why the linker fails to resolve the symbol.

On a side note, you may find `c++filt` to be useful when debugging C++ programs. 
`c++filt` demangles symbols to be more human-readable. For instance, 
`U _Z6bt_cmpPKcS0_` looks plain gibberish but using `c++filt` I can now 
see it's just `bt_cmp`. Definitely useful when working with programs that 
have multiple overloaded functions since it can be hard to understand 
which version of the function you are working on. For instance, let's say 
we have a function `foo` that takes in no parameter and another version of 
`foo` that takes in a single integer value. We get the following mangled 
symbols:
```
000000000040110d T _Z3fooi
0000000000401106 T _Z3foov
```
This may not be obvious as to what the suffix `i` and `v` mean. But if we were 
to demangle, we can see clearly the definition of each symbol 
(`nm a.out | grep foo| c++filt`):
```
000000000040110d T foo(int)
0000000000401106 T foo()
```

To resolve the undef error, we simply need to change the bluetooth header file 
with `extern "C` when the header file goes through a C++ compiler.

```c++
#ifndef BLUETOOTH_H
#define BLUETOOTH_H

#ifdef __cplusplus

extern "C" {

#endif

int bt_cmp(const char *dev1, const char *dev2);

#ifdef __cplusplus
}
#endif

#endif
```

---

## Summary

---

When mixing C libraries into C++ applications, it is important to enclose the 
function declarations (in the header file) with `extern "C"` to avoid undefined 
symbol errors during linktime.

Mangling is an encoding the compiler does to represent a variable or function 
to ensure uniqueness since C++ allows function overloading (i.e. functions 
that have the same name but accept different number of arguments or argument 
types).





