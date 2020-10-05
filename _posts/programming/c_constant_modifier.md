---
title: Another Look at CONST in C
published: true
---
Recently, I've been learning embedded programming from [udemy](https://www.udemy.com/course/microcontroller-embedded-c-programming/) and there was a section dedicated to look at `const`.
The section was interesting because despite programming in C a lot during my duration of my undergrad, I never taken a look at `const` in too much detail. I am sure there is more to `const` than
what the course provides but I still learned a lot from this section itself.

`const` is a type qualifier that is often used in C and C++ programming, especially appearing in the standard libraries frequently. An example, is the function definition of `strlen`:
```
       size_t strlen(const char *s);
```
The main purpose of `const` keyword is to document to programmers and compilers that the object cannot be mutated after initialization. A type qualifier is simply just giving additional information about the object to both the programmer and the compiler. Compilers can parse `const` to perform various optimization and it may place the object to ROM (Read Only Memory), making modification to the value 
unfeasible.

Let's look at a simple example of `const` before I delve into what I learned from the course:
```
const int x = 10;
x = 20;
```
If we were to compile the code above, we would get the following error:
```
test.c: In function ‘main’:
test.c:6:4: error: assignment of read-only variable ‘x’
  x = 20;
    ^
```
