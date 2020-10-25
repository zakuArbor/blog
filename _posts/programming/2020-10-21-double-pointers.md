---
layout: post
title: A look at Double Pointers
categories: [programming, c]
---
I was randomly browsing r/CarletonU community on Reddit since it's one of the schools I may attend 
next Fall. A particular post interested me due to the title: **For anyone in Computer Science**. 
As a recent graduate in Computer Science (undergrad), this post caught my attention. This blog post 
is inspired from my response [on reddit](https://www.reddit.com/r/CarletonU/comments/jefune/for_anyo
ne_in_computer_science/) about double pointers.

Today I want to discuss with you two use cases for double pointers: making modifications to a 
pointer in a function and in 2d arrays.

---
# TOC
* [1. What is a double pointer](#sec1)
    * [1.1. Representing Double Pointer in Memory](#sec1-1)
* [2. When Should I Use Double Pointers?](#sec2)
    * [2.1. Mutating a pointer's value in another function](#sec2-1)
    * [2.2. Representing "Complex" Data Structures](#sec2-2)

---
<h1 id = "sec1"> What is a double pointer</h1>
Before I can delve into the use case of double pointers, it's best to refresh your minds on what a 
double pointer is. If you already have an understanding of how double pointers work, you can safetly
 pass this section. Based on the name itself, we can infer that it involves with the use of two 
pointers. A double pointer is a pointer to another pointer. We know a pointer is a data type that 
stores some address as its value. Therefore, a double pointer is a data type where it stores an 
address of another pointer which itself points to another address in memory. Sounds confusing 
doesn't it. It makes more sense if we see a diagram of how this works:

<img 
  src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/pointer_vs_double_pointers.jpg" 
  alt = "a diagram displaying a high overview of how a pointer and a double pointer work" 
  class = "center"
/>
<p class = "excerpt">A diagram to visualize in a high level how pointers work</p>

As you can see from the diagram above, the first pointer points to another pointer which points to 
some data such as an int. In the post on reddit that motivated me to write a blog about double 
pointers has a good literary illustration on how double pointers work. Written by robby105, he tries
 to describe pointers as a mailbox where the value is the mail itself in which he refers it as a 
 page.
```
 So basically it's like using a pointer for a normal data type. Because all pointers are, are just a 
 reference to a location. So it's like a mailbox, all it does is hold a value of a an address. 
 Then in that address is the value inside of it.

So here is an example, you have a mailbox called P. And inside the mailbox there's a page with the 
value 123 Carleton Avenue. So then you drive to 123 Carleton Avenue and you check in that mailbox 
nd you see the value is 50. So here mailbox P is a pointer to the variable N that holds the value of
50, but all P is the address of N. Nothing else. So by understanding that a double pointer is just 
a pointer to another pointer that holds the address to some variable.
```

I hope you are able to follow the blog up to this point. Pointers are confusing and are cause of 
great headaches even to experienced developers and this can be seen through all the exploits that 
exist due to inproper use and protection on pointers. Perhaps it's also a great idea to see how 
double pointers work in the memory with a diagram (You can skip this section. It's quite long).


<h2 id = "sec1-1">Representing Double Pointer in Memory</h2>

<img 
  src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/double-pointer-mem-diagram.jpg" 
  alt = "a diagram displaying how double pointers look like in memory" 
  class = "center"
/>
<p class = "excerpt">
  A diagram displaying how double pointers look like in memory formatted in big endian
</p>

In the diagram above, **p** has the address **0x7ffff690d7828**. Since **p** is of type `int **`, 
the value of **p** will be another pointer of type `int *`. Therefore, the value of **p** should be 
another hex value representing some location in memory. Which we indeed have as shown in the diagram
above where the value is **0x7fff690d7820**. As a side note, the diagram orders the bits in big 
endian, where the lowest significant bits are stored at the highest address. You are probably used 
to seeing bytes ordered in little endian because of your CPU (i.e. x86 and AMD64/x86-4 series). I 
didn't notice this when I was making the diagram a few nights ago but we'll just have to live with 
it for the time being.

On another tangent, the size of pointers in the diagram is 8 bytes. This is why you see 0 paddings 
at the start of lowest bit in memory (they represent the highest bit of the address pointed by our
pointers) since the addresses we are working on isn't pointing to any address that requires all 8 
bits to represent it.

Anyhow, back to explaining the diagram. The value of **p** is **0x7fff690d7820**, a location in 
memory which contains another pointer that gives us the address of the integer data we want.
Following the location where **p** points to (by dereferencing **p**), we find that the integer we 
want is stored in the address **0xa0a3b8**. Therefore, if we go to that location in memory (****p**),
 we should see the integer value which I set it to as 10. Long and behold, **0xa0a3b8** does 
contain the value 10 which is represented in hex as **0x0A**.

---

<h1 id = "sec2">When Should I Use Double Pointers?</h1>
On top of my head, there are two main scenarios where using double pointers makes sense:
1. Mutating a pointer's value in another function
2. Representing "Complex" Data Structures

<h2 id = "sec2-1">Use Case 1: Mutating a pointer's value in another function</h2>
There are scenarios where you would want to change the value of a pointer outside the function 
where you defined the pointer. In such cases, simply reassigning the pointer in a function will not 
be suffice. Here's an example of trying to make a memory reassignment fruitlessly:

```c
void invert_point(int *x, int *y) {
	int *temp = x;
	x = y;
	y = temp;
	printf("\tSwapping (x,y) to (y,x)\n");
	printf("\tThe pair is now (%d, %d)\n", *x, *y);
}

int main () {
	/*****Allocation*****/
	int **point = malloc(sizeof(int *) * 2);
	point[0] = malloc(sizeof(int));
	point[1] = malloc(sizeof(int));
	*point[0] = 5;
	*point[1] = 1;

	printf("===Before Swap===\n");
	printf("Address of (x, y): (%p, %p)\n", point, point+1);
	printf("Values of (x, y) : (%d, %d)\n", *point[0], *point[1]);
	invert_point(*point, *(point+1));
	printf("===After Swap====\n");
        printf("Address of (x, y): (%p, %p)\n", point, point+1);
        printf("Values of (x, y) : (%d, %d)\n", *point[0], *point[1]);

	/*****DeAllocate*****/
	free(point[1]);
	free(point[0]);
	free(point);

	return 0;
}
``` 
<p class = "excerpt"><b>Example 1:</b>The code attempting to swap a point on a graph fruitlessly</p>

In **Example 1**, we have a pair of integer pointers representing a point on a graph. The function 
**invert_point** swaps x and y. If we were to compile and run Example 1, you’ll quickly notice that 
there has been no change at all despite appearing so in the function **invert_point**.
```
===Before Swap===
Address of (x, y): (0x15352a0, 0x15352a8)
Values of (x, y) : (5, 1)
	Swapping (x,y) to (y,x)
	The pair is now (1, 5)
===After Swap====
Address of (x, y): (0x15352a0, 0x15352a8)
Values of (x, y) : (5, 1)
```
Although it may be confusing at first because it may seem like **Example 1** should work since we 
pass in pointers to the function. It does not acheive the desired effect because the variables 
**x** and **y** in the function **compare** are copies that contain the value where the integers 
are stored (we call this call by value). Any modification to **x** and **y** only swaps 
the copies and does not make any modification to the desired variable defined by the calling 
function (**main**). Therefore, you must pass in a double pointer to the function **compare** to 
make the swap affect the pair defined in **main**.

```c
void invert_point(int **x, int **y) {
	int *temp = *x;
	*x = *y;
	*y = temp;
	printf("\tSwapping (x,y) to (y,x)\n");
	printf("\tThe pair is now (%d, %d)\n", **x, **y);
}

```
<p class = "excerpt"><b>Example 2:</b> The correct implement to swap a point on a graph properly</p>

If we were to compile and execute the program, we'll get the desired output as seen below:

```
===Before Swap===
Address of (x, y): (0x1a322a0, 0x1a322a8)
Values of (x, y) : (5, 1)
	Swapping (x,y) to (y,x)
	The pair is now (1, 5)
===After Swap====
Address of (x, y): (0x1a322a0, 0x1a322a8)
Values of (x, y) : (1, 5)
```

I wonder if you noticed, but this example is very similar to the clasical example of **swap**. For 
those of you who never read **[K&R](https://en.wikipedia.org/wiki/The_C_Programming_Language)**, a 
classical book on C, **swap** is an example in the book to illustrate why pointers are needed to 
alter a variable in the calling function. In fact, altering double pointers in the calling function 
can be reduced to **swap** since altering a pointer is just an extension of altering a non-pointer 
variable. Double pointers is just an extension of single pointers, just an additional layer of 
indirection.

<h2 id = "sec2-2">Representing "Complex" Data Structures</h2>
Often times we will be working with data structures that are more complex than the primitive data 
types in C. Primitive data types include int, char, and etc. Some more "complex" data type requires 
the use of double pointers to implement the data structure. An extremely simple example is a 
mutli-dimensional array. As the name implies, a multi-dimensional array is simply an array of 
arrays (i.e. having more than one dimension). A 2d array is composed of an array where each element 
is another array as seen in **Example 3**.

```python
# Let's say we want a 2x3 array
# 2 row x 3 cols

[
    [0, 1, 2],
    [3, 4, 5]
]
```
<p class = "excerpt"><b>Example 3:</b> An example how 2x3 array looks like in Python</p>

A motivating example where 2d arrays are used is in representing a matrix in Mathematics. A matrix 
is a set of numbers arranged in rows and columns to form a rectangular array. A matrix is abstract 
concept but it's widely used in many fields. A simple example of a matrix that is relatable to most 
humans is representing an image. More on that later.

### Relation of arrays with Pointers
A regular array is similar to a regular pointer in C. For instance, in the example below you have a 
regular pointer to an int named `x` and an array of int named `arr`. `arr` is just a pointer to 
the first element in the array we allocated and it looks oddly similar to `x`, an integer variable. 
Except, we reserved 5 consecutive block of size int for the array (i.e. total size is 5 * 
sizeof(int) which is typically 20 Bytes in a typical system).
```c
int *x;
int *arr = malloc(sizeof(int) * 5); //arr[5]
```

But when we are working with multi-dimensional arrays, you need more than one pointer. If we are 
working with a 2d array, you'll need two pointers. The first pointer is an array of pointers where 
each element in the array points to another array. It's confusing on words so let's see a diagram:





---

##
talk about a sentence being a double pointer