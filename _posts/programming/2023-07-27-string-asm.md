---
layout: post
title: An Uninteresting Glance At Strings
description: An uninteresting post about looking at the generated assembly for strings
categories: [programming, c/c++]
---

An uninteresting post about looking at the generated assembly code of a simple program that just stores a string. I got bored at work and decided to randomly look at strings. 
Nothing interesting about this post, I just wanted to write something quick to kill time.

Strings in C as one may know are just an array of characters that is null terminated. Strings can also be represented as string literals stored in the data section of the program usually. 
I thought I could see something interesting with how strings are stored in ELF format but my quick glance at the ELF and the generated assembly was of no interest (I am a noob at how to inspect ELF 
so I probably missed something interesting). 

**Warning:** Nothing interesting was found. Just a random post written by a sleep deprived student who is bored.

## A Look At String Literals

Let's look at how string literals are stored in the program:
```c
const char *str = "some string";
```

As expected, we can see that the string literal is indeed stored in the read only data section:

```bash 
$ readelf -x .rodata a.out 

Hex dump of section '.rodata':
  0x00402000 01000200 00000000 00000000 00000000 ................
  0x00402010 736f6d65 20737472 696e6700          some string.
```

The assembly code of interest is:
```nasm
.LC0:
	.string	"some string"
    ;omitted
main:
.LFB0:
    ;omitted
	movq	$.LC0, -8(%rbp)
    ;omitted
```

As one can see, the program literally copies the string literal into the stack. Nothing interesting.

## A Look At Strings in an Array

```c
char str[] = "some string";
```

As the string literal "some string" is being stored in an array, we don't expect the literal to be stored in the read only data section:
```bash
$ readelf -x .rodata a.out 

Hex dump of section '.rodata':
  0x00402000 01000200 00000000 00000000 00000000 ................
```

But what about if we add a `const` qualifier? How will the compiler behave?

```c
const char str[] = "some string";
```

Well nothing changes. I would have thought the compiler would have tried to take advantage of the `const` qualifier but it didn't.
The example I have used may have been too simple to be of any interest. I know the paper [How to Write Shared Libraries](https://www.cs.dartmouth.edu/~sergey/cs258/ABI/UlrichDrepper-How-To-Write-Shared-Libraries.pdf) 
offers some interesting suggestion on how to optimize code with const. But I am not trying to replicate their examples.

Let's view the assembly code (edited to show only code that is of interest):
```nasm
$ gcc -c -S test.c -o - 
%omitted
.LFB0:
    %omitted
	movabsq	$8247343400600039283, %rax
	movq	%rax, -12(%rbp)
	movl	$6778473, -4(%rbp)
    %omitted
```

As one can see, the string is represented by some number `8247343400600039283` which is `72747320656D6F73` in hex which represents our string (but backwards).
As the string is long, two instructions were required to push the string into the stack (i.e. "some str" is pushed into the stack and then "ing").

So another idea would be to see if the compiler would do something if I was to repreatedly make use of substrings. Turns out it does not, at least not in my example 
which is very simple. All it does is push the string represented as integers into the stack repeatedly:
```nasm
movabsq	$8247343400600039283, %rax
	movq	%rax, -12(%rbp)
	movl	$6778473, -4(%rbp)
	movl	$1701670771, -17(%rbp)
	movb	$0, -13(%rbp)
	movl	$7171955, -21(%rbp)
	movw	$28531, -24(%rbp)
``` 

## Conclusion

If you made it this far, you must be as bored as I am. As the title suggest, there isn't anything interesting about this post.


