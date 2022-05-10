---
layout: post
title: Rust - Exploring the Assembly Code between Mutable and Shadow Variables
description: Exploring the difference in the generated assembly code of mutable versus shadow variables
categories: [programming, rust]
---

Recently I have started to learn Rust through a program called Summer of Rust led by a Computer Science student 
at Carleton University. While I had plans to explore C++ and assembly for the summer, I thought it would be a good time 
to learn Rust instead with a group of students since learning anything by yourself requires a lot of effort.

A student asked in the Discord chat about what would be more efficient, using mutable variables or shadow variables. 
While the two have different purposes, it was an interesting question. Mutable variables allows a programmer to 
mutate the state (i.e. value) that we take forgranted in many other non-functional langauges such as C and Python. 
For instance, in C you could do the following:
```c
int i = 0;
i += 10;
```

Meanwhile, shadowing allows you to reuse the name of the variable in a different scope. For instance, 
this is legal and possible in C:

```c
int sum = 10;                                                                 
printf("the value of sum (%p) is %d\n", &sum, sum);                           
{                                                                             
  int sum = 0;                                                                
  printf("Inside Innerscope\n");                                              
  printf("the value of sum (%p) is %d\n", &sum, sum);                         
}                                                                             
printf("Exited innerscope\n");                                                
printf("the value of sum (%p) is %d\n", &sum, sum); 
```

**Output:**

<div class="language-plaintext highlighter-rouge">                              
<pre class = "highlight"><code class = "red">the value of sum (0x7ffe92723<b>a0c</b>) is 10  
Inside Innerscope                                                               
the value of sum (0x7ffe92723<b>a08</b>) is 0                                         
Exited innerscope                                                               
the value of sum (0x7ffe92723<b>a0c</b>) is 10
</code></pre></div> 

As you can see from the output above, when you shadow a variable, the new variable with 
the same name is effectively a new variable (which explains why the address of the variable 
is different).

However, Rust offers the ability to shadow a variable within the same scope as seen 
in the [Rust Programming Language Book](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html):

```rs
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {}", x);
    }

    println!("The value of x is: {}", x);
}
```

where you can see the variable x is shadowed twice (i.e. 3 variables with the name `x`.

## Mutable v.s Shadowing - Initial Thoughts

Let's look at the following two versions that achieves the same output:

**mutable version:**
```rs
fn test()->i32 {
    let mut x: i32 = 1;
    x = x + 4;

    let mut y: i32 = 0;
    y = y + 10;
    x + y
}
```

**shadow version:**
```rs
fn test()->i32 {
    let x: i32 = 1;
    let x = x + 4;

    let mut y: i32 = 0;
    y = y + 10;
    x + y
}
```

Without looking the underlying assembly code, I could only make assumptions on the 
performance. My first thought was that the mutable version is faster because 
when CPU sets the value of `x`, the variable would be stored in a register. 
But with shadowing, an entirely new variable is created so not only would it 
consume more memory, the CPU would need to fetch from memory for the value if the 
program was more complex (I assume the value would be stored in a register for this 
simple example).

While it was agreed that readable code is more important than trying to optimize our code, it 
was still an interesting question (although this example was very simple and small so 
performance did not matter anyways). Generally, optimization should not be of a concern for 
most programmers and if one really wanted to optimize their code, they should first profile 
their code and consider to either change their algorithm or the data structure they were using. 
Modern compilers are great at optimizating code so the need for the average programmer to 
optimize their code by inspecting the underlying assembly code is becoming a thing of the past 
(of course it varies depending on what you are working on).

In addition, I have extremely limited knowledge of assembly, compilers and optimization. So 
all this speculation I have made in my head could be very wrong. Which is why I'll 
be trying to interpret the generated assembly code through [Compiler Explorer](https://godbolt.org/), 
a neat tool to inspect the assembly code generated from small code snippets with the 
best I can with my limited knowledge on assembly.

---

## Inspecting the Assembly Code

<iframe class = "iframe-full" width="800px" height="200px" src="https://godbolt.org/e#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DEArgoKkl9ZATwDKjdAGFUtEywYSAnKUcAZPAZMADl3ACNMYhAAZlIAB1QFQjsGFzcPb3jE5IEAoNCWCKjYq0wbFKECJmICNPdPLh9S8oFK6oI8kPDImMsqmrqMxr72zoKimIBKS1QTYmR2DgB6JYBqABUATzjMVc3Z4lW0LFWESMxSVZJV2lQmdFXDVcxVVjj6ADoAUg0AQTiTGFVlQGKsCJhzBBJgBaL7RbB4aIAJlWXwA7AAhH6/Va4m6YAirdSrREouEAEVWXDhWL%2BePxhNUqOilKZXyRGNWkhp2Ox9PohJYJkJmxAJORzMpGh5dLxm0le1RHKp0uitJxeLZys2vLR5N5fxWqwAklQ9rNVmZdl8AGwaFhMQJQ20aS5YZAGYi7QiPBSou0AsIusGoVZKb2EwJgs5XYUAgggbFGwPA0EOp2TVGY1YfXNZ/V/DjTWicACsvE8HC0pFQnAASmZCQoDgsldEeKQE1Wi9MANYgJGl/ScSQVzS8WscXgKECurtaaZwWBINAsOJ0SLkSir9f0KLELh2100Wjg4gziBhcekMKBaqi7i8VdsQQAeQYtAf1awDqM4m7pD4F65QAG4QteLxlMKiwdoE4IlgBtB4GExD3i4WDXgQxB4CwnA8NMVAGMACgAGp4JgADur47JWHb8IIIhiOwUgyIIigqOoAG6Fw%2BiGMYjb6MhM6QNMqBxLYAgzlOliYNYEmeBAjiDA0vgMOgYzdFEPEJEk8nKXoOk5AwGmFD0PHNPJbQDK49R6BZFT9B0gRdKZWkjNZ6QqeYozOeMZnTM2cwLHoWGYDBRbDhw5akJW1aTqY5jIFSHx2h8GirBADbmJcuCENc7LtpcLhrhuhwFVwky8POPakP2SIABwfGiDVeF4XCll4No2tE9U2qW0gIaOMXXpO06zp246LjAiAoBgOD4EQZAUNQG7MGweG8PRwiiOILFbexajXroSK8UYIAJRY9n2Ipan6UisT%2BL5mkgEOhl6TZGT3VkukpCZExDldDBWbUH2eF9gPA39PQA45d0lI5UNRKWAUtosSZrKa5omJaSj%2BvajoMM6dpumUnoRr6eOBsGRBhmFJKRqCBAxrMBDxomhprCmIKrOmhOZuinK5h8%2BbYlzjMQgQUKwvCpJZuq/IEjzwpEmKssUlSMoaribIskSSqctyaoGlrDJKyKqsSurqry3KCryuynJcNbfKavrey6uSEUIdFsUTvWjZhqjbZIlVk19gOXAfEiaJOxo9WSBo0TRDaXDRJINqRUNvs1pwY1zpNpBLjNO6lVuEAl3u52Hhox50GeF5XgBt7MMQD4ds%2BjAEO%2Bn7Xj%2BfH/t%2BeDAbYYFSdWkHINBG3kIIsnXkhKFoXNmHYbhj4EURpHkVRNHT1tjG7dI%2B1KIdXEDqd/HZQvwlQjW4kpFJ06yWU8kOLdoN6I9%2BTPdp2TvZ5Bk/6/Seq5Oyz8WhA1hh/cy4DLIIxARMcyUCAFIJ8t/UBFUZhBXYCdUK4VixljHABeKjYkqR1SulTKAlVi5UWsHIqqASp7mDpVCa3ZJjh0HJnIhcVc6WHGtVDhkUQ7DWIXwwR0wwLnhSCASQQA%3D%3D"></iframe>

The code may be difficult to see (especially on mobile) so I will paste the relevant assembly code below (with annotations):

**mutable version:**

```nasm
sub     rsp, 24                   ;increase the size of the stack 
mov     dword ptr [rsp + 16], 1   ;let mut x: i32 = 1
mov     dword ptr [rsp + 16], 5   ;x = x + 4
mov     dword ptr [rsp + 20], 0   ;let mut y: i32 = 0
mov     dword ptr [rsp + 20], 10  ;y = y + 10
mov     eax, dword ptr [rsp + 16] ;set register with the value of x
add     eax, 10                   ;add 10 to the register
mov     dword ptr [rsp + 12], eax ;store the result to rsp + 12 temporarilt
seto    al                        ;no clue what that does
test    al, 1                     ; 
jne     .LBB0_2                   ; 
mov     eax, dword ptr [rsp + 12] ;restore the value of eax
add     rsp, 24                   ; decrease the stack
ret                               ; 
```

**shadow version:**

```nasm
push    rax                       ;align stack I think
mov     dword ptr [rsp + 4], 0    ;let mut y:i32 = 0 
mov     dword ptr [rsp + 4], 10   ;y = y + 10
mov     eax, 5                    ;set register to equal 5 which is the precomputed value of x = x = 4
add     eax, 10                   ;x + y (except it's not retrieving the value from the stack)
mov     dword ptr [rsp], eax      ;temporarily store the result
seto    al                        ;does something I have no clue
test    al, 1                     ;
jne     .LBB0_2                   ;
mov     eax, dword ptr [rsp]      ;restores the result back to eax register
pop     rcx                       ;probably something to do with alignment like in line 1
ret                               ;
```

To begin, the first thing that popped to my mind was that the mutable version creates a 
bigger stack which was somewhat of a surprise. 

```nasm
sub     rsp, 24                                                                 
```

The reason why I was somewhat surprised about this result is because I would have 
expected the shadow version to push multiple values into the stack instead. If I 
was given the assembly code for both versions, I would have mixed the two up.

It would seem that the compiler wants to respect 
the programmer's desire to store new values into the variable which is why we see the following:
```nasm
mov     dword ptr [rsp + 16], 1   ;let mut x: i32 = 1
mov     dword ptr [rsp + 16], 5   ;x = x + 4
mov     dword ptr [rsp + 20], 0   ;let mut y: i32 = 0
mov     dword ptr [rsp + 20], 10  ;y = y + 10
```

An interesting note is that the compiler precomputes the arithmetric operation. 
For instance, instead of writing the instruction to add `x = x + 4`, it instead sets 
`x = 5` instead. But it still respects the initial assignment of `x = 1`. Another 
interesting note is that the value of `y` is stored but not used at all. Instead the 
compiler loads the value of `x` into the register `eax` and then adds 10. This would 
indeed be more efficient than trying to retrieve from memory the value of `y` (i.e. `rsp+20`).

Unlike the mutable version, the shadow version begins and ends (before the return command) with 
`push rax` and `pop rcx` which I assume is to align the stack. So the stack for the shadow version 
is definitely a lot smaller based on both my guess and from stackoverflow 
(i.e. [Why does this function push RAX to the stack as the first operation?](https://stackoverflow.com/questions/37773787/why-does-this-function-push-rax-to-the-stack-as-the-first-operation)). 

The shadow version is making use of registers which was my suspicion would occur if 
all the optimizations were turned on. As stated earlier, I would have thought the mutable 
version would make use of the registers more so than the shadow version. But it does not. 

```nasm
mov     dword ptr [rsp + 4], 0    ;let mut y:i32 = 0                            
mov     dword ptr [rsp + 4], 10   ;y = y + 10                    
```

The lines after the stack alignment is interesting. Since the compiler has free reign 
reorganizing the code, the initial value of `y` is set first and then set to 10 
in response to the line `y = y + 10;`. Similarly how in the mutable version the compiler 
precomputes the value, the same idea occurs in the shadow version. Instead of writing 
the instruction to add 0 with 10, it simply just stores the end result. 

The next two lines makes it obvious (at least from my limited knowledge of assembly) 
that the shadow version is more efficient:
```nasm
mov     eax, 5                    ;set register to equal 5 which is the precomputed value of x = x = 4
add     eax, 10                   ;x + y (except it's not retrieving the value from the stack)
```

Unlike the mutable version which retrieves the value of x from the stack, the shadow version 
loads 5 into the register and then adds 10. So the shadow version is making full use of 
the register unlike the mutable version.

The fact that the mutable version loads the value of `x` to the register made me think 
of `volatile` keyword for some odd reason. The fact that it still consulted the value 
from the stack instead of pushing a constant value 5 into the register like how the 
shadow version made me think about the connection. However, it proceeds to add 10 
instead of consulting the value of `y` in the stack so that's where things break down. 
Perhaps a good topic for me to look at is how the `volatile` keyword changes the resulting 
assembly code.

---

## Conclusion

To summarize this long blog post, for the example code I used, it was found that 
shadow version resulted in smaller use of the stack and makes use of the register 
more than the mutable version. Meaning mutable seemed to result in both inefficient 
code in respect to both time and space.
