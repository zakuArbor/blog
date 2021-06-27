---
layout: post
title: C Programming - Variable Length Array (VLA)
description: Exploring variable length array introduced in C99
categories: [programming]
---

I always thought it was not possible to create a "dynamic" array in C without the use of `malloc` till 
recently where I was introduced to **variable length arrays (VLA)**. Although the use of "dynamic" is 
a poor choice, the ability to allocate an array at runtime based on a variable whose value is not known 
during runtime came to a shock.

Variable length arrays came into C starting from C99 standard (hence not suitable for anyone who 
work on legacy systems or in projects that follow C89 standard. To illustrate, here's an example of 
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
<pre style="background: #282a36; color: white; padding: 15px; font-size: 15px">$ gcc -std=c89 --pedantic /tmp/test.c
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


