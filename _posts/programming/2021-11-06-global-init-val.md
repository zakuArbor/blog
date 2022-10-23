---
layout: post
title: The Value of An Uninitialized Global Variable
description: Looking into what the value of an uninitialized global variable is
categories: [programming, c/c++]
---

Recently I started to read [C & C++ Under the Hood](https://www.amazon.ca/C-Under-Hood-2nd/dp/B09B74P6C4/ref=sr_1_2?crid=TY3XFU11UZH9&keywords=c+and+c%2B%2B+under+the+hood&qid=1636227232&sprefix=c+and+c%2B%2B+under+the+hoo%2Caps%2C125&sr=8-2). As the 
name implies, the book explores deeper in what goes on in the assembly level 
using LCC machine language (a simple machine language for educational purposes). 
One of the fact the author points out is that global variables are initialized to 0.
While this should have been common knowledge, I was shocked because I always thought 
the behavior of an uninitialized variable is garbage (i.e. behavior is undefined and hence
can be anything). To my defense, I actively avoid writing code that involves a global 
variable for various reasons (though mainly it was due to my Highschool teacher telling me
to never use global variables).

For the uninitiated, a global variable is a variable defined outside of any 
functions but can be accessed anywhere in the file. This makes it hard to track 
which function modified the value of the global varialbe (especially when you 
start to share this variable to other files). Hence why I avoid the use of global 
variables. In the book, it defines a global variable `int x;` defined using a 
`.word` directive (i.e. `.word 0` where `.word` tells the assembler to convert 0 
into a 4 byte/16bits binary).

The reason for all uninitialized global variables having the value of 0 is because 
it does not require any extra commands to do so. Unlike local variables, global 
variables do **NOT** live in the stack. To initialized a local variable, there 
needs to be at minimum two commands (one to set a register to 0 and the other to push 
the register with the value of 0 into the stack.

```c
int x;
int main() {
  int y = 0;
}
```

```nasm
x: .word 0 ; a global variable (i.e. int x)

.main
... ; some stuff
;set a local variable to 0 (i.e. int y = 0)
mov r0, 0 ; move the value 0 into register 0
push r0   ; push the value of register 0 into the stack
```

To see this using x86 assembly generated using gcc:
```nasm
x:
        .zero   4 ; the global variable
main:
        ... ; some stuff
        movl    $0, -4(%rbp) ; setting local variable y to 0
```

Now you may be wondering, how come it took only one instruction to set the 
local variable to 0? I am not familiar with assembly but from what I can see, 
it's effectively doing the same thing as what lcc assembly does but LCC is 
just being more explicit. Instead of using some intermeditary register to 
temporary store the value 0, x86 directly modifies the stack. Though I do 
wonder how does the program know an item has been added to the stack because 
the intruction corresponds to one binary instruction. Perhaps it is a comination 
of the code being too simple to have the need to use the stack pointer and can 
easily use the symbol table to keep track of the local variables during 
assembly stage (I know I should be studying more). 

---

Anyhow, what really intrigued me about this exploration was the fact that 
the output of my local uninitalized variable was always 0 which broke the 
logic in my head. While I could not find an explanation for this behavior, 
the C language standards does not restrict compiler developers from setting 
the uninitialized variables to 0. However, there is zero indication that 
the generated assembly code sets the local variable to 0. In fact, the 
generated assembly code for the following C code simply ignores the 
variable declaration (though it does generate a `.local` directive that gets 
incremented each time you declare a variable):

```c
int main() {
  int y;
}
```

```nasm
main:
    ... ; does stuff
    .loc 1 3 1
```

v.s.

```c                                                                            
int main() {                                                                    
  int y;    
  int z;                                                                    
}                                                                               
```                                                                             
                                                                                
```nasm                                                                         
main:                                                                           
    ... ; does stuff                                                            
    .loc 1 4 1                                                                  
```   

So why does the local variables have the value of 0 when it should be garbage? 
I believe it has to do with the fact that a bunch of bytes from the base 
pointer are set to 0. Why that is, I have no clue but on my machine, that is 
what I am observing on my machine when I inspect the memory using gdb. Not sure 
if it's coincidence or the OS does something to it. But as one person mentioned 
before on StackOverflow, do not question the reason for an undefined behavior.

Though it would be interesting to investigate this further if I ever get bored 
and have tons of time. Perhaps run a test to map the memory and output for at 
least 1000 times just to check if it's pure coincidence along with testing this 
behavior on a raspberry pi and windows machine to see if I can replicate this 
behavior on another architecture and OS. If it's not pure coincidence then, 
perhaps there is a behavior in Linux I do not know about (which I obviously 
do have since I have little knowledge in systems programming). Perhaps I should 
also observe if this behavior can be replicated if I call a function and observe 
what assembly instructions are generated before the call to the function to see 
if it's setting a bunch of bytes to 0. Though this would be a useless exploration 
to do.


