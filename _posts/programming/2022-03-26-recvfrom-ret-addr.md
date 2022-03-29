---
layout: post
title: recvfrom - Obtaining the Return Address 
description: A dive into recvfrom API
categories: [programming, c/c++, network]
---

Have you ever wondered how to obtain the IP address from a client when working on 
a socket application? That is what `recvfrom()` API comes in handy.

<details>
<summary><b>tldr</b></summary>
<hr/>
<code class="highlighter-rouge">recvfrom()</code> requires <code class = "highlighter-rouge">src_addr</code> and <code class="highlighter-rouge">addrlen</code> to not be null and 
<b><code class="highlighter-rouge">addrlen</code></b> to be initialized with the size of `struct sockaddr`
<hr/>
</details>

From my limited experience with sockets, I have always used the `read()` API to receive 
messages from the client or server. However, there are various methods to read messages 
from a socket such as `recv()` and `recvfrom()`. The `manpages` provide an excellent 
summary of the differences between `read()` and `recv()`:

```
The only difference between recv() and read(2) is the presence of flags.
With a zero flags argument, recv() is generally equivalent to read(2)
```

Essentially `recv()` provides more control on how to behave such as to not ensure 
the call is non-blocking with `MSG_DONTWAIT` flag. This can be useful if you only 
want to set certain behaviors/features per-call rather than applying the behavior 
on the entire socket (i.e `fcntl()`).

Anyhow, to retrieve the IP address of the sender, you will need to use `recvfrom()` 
rather than `recv()` call since you pass in a pointer where the API will set the 
IP address of the sender (`src_addr`) and the size in `addrlen`.

```
ssize_t recv(int sockfd, void *buf, size_t len, int flags);

ssize_t recvfrom(int sockfd, void *restrict buf, size_t len, int flags,
                 struct sockaddr *restrict src_addr,
                 socklen_t *restrict addrlen);
```

Since `src_addr` and `addrlen` are both pointers, to obtain the source address, 
both parameters need to be not NULL. However, `recvfrom()` will not simply work 
as intended if you do not initialize `addrlen` as seen from the output:

<details>

<summary>Snippet</summary>
<code class="highlighter-rouge">printf("(address: %s) %s\n", inet_ntoa(from.sin_addr), buf);</code>
</details>
**Output:**
```
(address: 0.0.0.0) Hello World
```

`recvfrom()` API did not populate `src_addr` (`from` in my code snippet) with the correct IP address because I did 
not initialize `addrlen` parameter with the size of `src_addr` (i.e. `sizeof(addrlen)`).

**Output:**                                                 
```                                                                             
(address: 127.0.0.1) Hello World
```

## Initializing addrlen With Different Sizes

The standard practice is to initialize `addrlen` with the size of `struct sockaddr` which happens to be 16 bytes on my machine. 
However, you could set the value to be less than 16 bytes and it may still work. 

If you set the length to be less than 0, an **errno** will be set 
complaining that an invalid argument has been supplied.

```c
recvfrom(): Invalid argument
```

This is because `addrlen` is of type `unsigned int which we can verify by running the preprocessor:
```c
$ gcc -E server-recvfrom.c  | grep socklen_t
typedef unsigned int __socklen_t;
typedef __socklen_t socklen_t;
```

Your compiler would have caught this error if you have declared `src_addr` as of type `socklen_t` instead of `int` if you have `-Wsign-conversion` flag enabled (at least for gcc).
What happens if you provide the length to a value less than `sizeof(struct sockaddr)` such as 0 bytes? The source address will not filled if the value of `addrlen` is too small. 
Then what would be the minimum length that can be set to `addrlen` for `recvfrom` to populate the source IP address?

The answer lies in examining `sockaddr_in` structure (or you can brute-force which I found was to be 8 bytes on my environment):
```c
$ gcc server-recvfrom.c -E | grep -A 11 -E "struct sockaddr_in$"
struct sockaddr_in
  {
    sa_family_t sin_family;
    in_port_t sin_port;
    struct in_addr sin_addr;


    unsigned char sin_zero[sizeof (struct sockaddr)
      - (sizeof (unsigned short int))
      - sizeof (in_port_t)
      - sizeof (struct in_addr)];
  };
```

A `struct` from my understanding is similar to an array in the sense that all members in the struct 
are stored in a contiguous chunk of memory. This means that you can address a member in a struct 
without using the dot nor the arrow operator (i.e. `person.age` or `person->age`). This can be achieved 
by knowing the size of each member (also taking into account of padding for alignment reasons). For instance, 
let's define a struct as the following:

```c
struct Person {
  int age;
  char name[16];
}
```

where the size of the struct is 20 bytes:
* 4 bytes to represent the integer
* 16 bytes to represent a character array of 16 characters

Although I am not familiar with how to access structs using pointers, a method I 
came up with is using memcpy to access members I desire.

**Code:**
```c
struct Person human = { 21, "John Smith" };                                   
int age = 0;                                                                  
memcpy(&age, &human, sizeof(int));                                            
printf("the person age is: %d\n", age);  
```

**Output:**
```
the person age is: 21
```

Given the fact that a struct is just a contiguous chunk of memory that consists of 
members of different sizes, we can estimate the minimum amount of memory required 
to set `addrlen` to obtain the IP address from `recvfrom()`

Recall `src_addr` is the type `struct sockaddr_in`:
```
struct sockaddr_in                                                              
  {                                                                             
    sa_family_t sin_family;                                                     
    in_port_t sin_port;                                                         
    struct in_addr sin_addr;   
```

We can see that to represent the IP address (`sin_addr`), we need at least 
`sizeof(sa_family_t) + sizeof(in_port_t) + sizeof(struct in_addr)` which happens 
to be 8 bytes on my machine because `sa_family_t` is a typedef of `short unsigned int` (2 bytes), 
`sin_port_t` is a typedef of `uint16_t` (16 $\require{cancel}\bcancel{bits} \cdot \frac{bytes}{8\bcancel{bits}} = 2$ bytes) and 
`struct in_addr` is simply a struct that contains only one member of type `in_addr_t` which is simply a typdef of `uint32_t` 
(4 bytes). This happens to be the same number of bytes as what I found through brute-force.

```
$ gcc server-recvfrom.c -E | grep  -E "sa_family_t;"
typedef unsigned short int sa_family_t;
$ gcc server-recvfrom.c -E | grep -E "in_port_t;$"
typedef uint16_t in_port_t;
$ gcc server-recvfrom.c -E | grep -E -A 3 "struct in_addr$"
struct in_addr
  {
    in_addr_t s_addr;
  };
$ gcc server-recvfrom.c -E | grep -E  "in_addr_t;"
typedef uint32_t in_addr_t;
```

You may be asking why do we pass `addrlen` as a pointer and not as an unsigned integer. 
The reason can be found in the manpages: `Upon return, addrlen is updated to contain the actual size of the source address`. 
So `addrlen` will not have the size of 8 bytes or whatever bytes you have set it to be. 
Does this mean that the value of `addrlen` matter? Yes it does because `recvfrom()` will 
only write up to `addrlen` bytes to `src_addr` as seen in the [code](https://elixir.bootlin.com/glibc/latest/source/sysdeps/mach/hurd/recvfrom.c#L31).

```
/* Read N bytes into BUF through socket FD.
   If ADDR is not NULL, fill in *ADDR_LEN bytes of it with tha address of
   the sender, and store the actual size of the address in *ADDR_LEN.
   Returns the number of bytes read or -1 for errors.  */
```

---

## Conclusion

To summarize this long blog post, use `recvfrom()` API to retrieve the source IP address (if the protocol supports it). 
Ensure that you have passed non-NULL values for `src_addr` and `addrlen` arguments with `addrlen` initialized to 
`sizeof(struct sockaddr_in)` to obtain all the necessary information.

<script src="https://gist.github.com/zakuArbor/7b46dba0eff54085ddbaafe12d278562.js"></script>
