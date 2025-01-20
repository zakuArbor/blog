---
layout: post 
title:  "Stack Overflow: The Case of a Small Stack"
description: "How a simple innocent looking one line code to allocate a buffer in main can crash the program and a look into why amd64 is yet isn't affected in our target platform"
categories: [micro, stack, qnx, C/C++]
---

Years ago I was once asked by an intern to debug a mysterious crash that seemed so innocent. While I no longer recall what the code was about, we stripped the program to a single line in 
`main`. Yet the program still continued to crash.

**Source:**
```c
int main() {
    char buf[1024*1024*1024];
}
```

**Result:**
```
# ./prog-arm64 

Process 630803 (prog-arm64) terminated SIGSEGV code=1 fltno=11 ip=00000025333267f0 mapaddr=00000000000007f0 ref=000000443dd5dc50
Memory fault (core dumped) 
```

This bewildered all of the interns as it made absolutely no sense. Through our investigation, there was two things we noticed:
1. The program worked on our local machines but not on our target virtual machine
2. We were allocating an extremely large buffer in the stack which was unusual

It turns out the intern wanted to allocate a 1MiB buffer for some networking or driver related ticket. If I recall correctly, our target 
only had 512MB RAM so this could have explained the mysterious crash. But even 1MiB buffer on the stack was too large for our target:

```c
int main() {
	char buf[1024*1024];
}
```

**Result:**
```
# ./prog-arm64 

Process 696339 (prog-arm64) terminated SIGSEGV code=1 fltno=11 ip=0000004de7e7a7ec mapaddr=00000000000007ec ref=000000383b19fbe0
Memory fault (core dumped) 
```

One thing I purposely omitted was that our target was running QNX, a realtime operating system. If we were to take a look at the documentation:
> A process's main thread starts with an automatically allocated 512 KB stack
> -- [QNX SDP 8.0 - Stack Allocation](https://www.qnx.com/developers/docs/8.0/com.qnx.doc.neutrino.prog/topic/process_stack.html)

This shocked all of us since 1 MiB is not a large buffer in 2021 where we had plenty of memory on our own personal system at home. 

**Note 1:** The target used in the example was an aarch64le. This example will work on amd64 (x86_64) but requires you to add something such as a print statement

**Note 2:** QNX 8.0 was released to the general public in late 2023 or early 2024 so the actual target at the time when the question was asked was running either QNX 7.0 or QNX 7.1 (I do not recall which version)

## Investigating why AMD64 (x86_64) seems unaffected

**Note:** Everything below is nothing shocking nor interesting. I just felt like keeping it there.

The behavior for AMD64 (x86_64) as noted requires more fiddling to trigger a crash which came to my surprise. From my understanding of the documentation, the stack size should still be 512KB.
Suspecting there could be some optimization going on, I fiddled around with the compiler setting and added some code to see if I could trigger the crash and it turns out that if I make 
a call to `printf`, the program will indeed crash as desired.

**Source Code:**
```c
#include <stdio.h>
int main() {
  char buf[1024*1024];
  printf("Hello World\n");
}
```

**Result:**
```
# ./prog-amd64  

Process 2977812 (prog-amd64) terminated SIGSEGV code=1 fltno=11 ip=0000002c51b107f6 mapaddr=00000000000007f6 ref=0000003f4ece4b58
Memory fault (core dumped) 
```

To test my hypothesis that there was optimization under the hood, I generated the assembly (i.e. pass `-S` to `qcc`):

```nasm
main:
.LFB0:
        .file 1 "prog.c"
        .loc 1 2 12
        .cfi_startproc
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        subq    $1048592, %rsp
```

With much disappointment, my hypothesis was incorrect. We can see that the stack pointer indeed does move at least by 1 MiB (1024 x 1024 = 1048576). 
As this file was simply incomplete as we still needed to run the assembler and linker to make the program executable, I then proceeded to running the 
program on the debugger in hopes that I can save my hypothesis (spoiler: my initial hypothesis is false).


```nasm
(gdb) disassemble
Dump of assembler code for function main:
   0x0000000008048791 <+0>:     push   %rbp
   0x0000000008048792 <+1>:     mov    %rsp,%rbp
   0x0000000008048795 <+4>:     sub    $0x100010,%rsp
   0x000000000804879c <+11>:    mov    0x182d(%rip),%rax        # 0x8049fd0
   0x00000000080487a3 <+18>:    mov    (%rax),%rcx
   0x00000000080487a6 <+21>:    mov    %rcx,-0x8(%rbp)
   0x00000000080487aa <+25>:    xor    %ecx,%ecx
   0x00000000080487ac <+27>:    mov    $0x0,%eax
   0x00000000080487b1 <+32>:    mov    %eax,%edx
   0x00000000080487b3 <+34>:    mov    0x1816(%rip),%rax        # 0x8049fd0
   0x00000000080487ba <+41>:    mov    -0x8(%rbp),%rsi
   0x00000000080487be <+45>:    sub    (%rax),%rsi
   0x00000000080487c1 <+48>:    je     0x80487c8 <main+55>
   0x00000000080487c3 <+50>:    call   0x8048620 <__stack_chk_fail@plt>
=> 0x00000000080487c8 <+55>:    mov    %edx,%eax
```

As we can see from the assembly above, the stack pointer does move at least by 1MiB so the theory of optimization is definitely ruled out.
Going through the program via the debugger using `stepi` I notice the following:

```nasm
   0x00000000080487be <+45>:    sub    (%rax),%rsi
   0x00000000080487c1 <+48>:    je     0x80487c8 <main+55>
   0x00000000080487c3 <+50>:    call   0x8048620 <__stack_chk_fail@plt>
=> 0x00000000080487c8 <+55>:    mov    %edx,%eax
```

The instruction pointer skipped `<__stack_chk_fail@plt>` which is the the stack guard that is added to mitigate against stack buffer oveflows (whether intentional or not).
Essentially, a stack guard inserts some small value known as the canary between the stack variables and the return address. If the return address was overwritten, then the 
canary value would be overwritten. The way to check whether the canary has been overwritten can be done in either two ways:

1. `canary - original_canary != 0`
2. `canary ^ original_canary != 0`

If any of the two are evaluated to be true, then the program will jump to the fail function to terminate the program.
In our program, it would seem that we did not overwrite register `rax` which appears to be our canary with the value of `0x8049fd0`.
I will now attempt to walk through with you what exactly is going on with my limited knowledge in Assembly (I'm going to use the excuse that I am a Mathematics student to excuse 
my lack of assembly knowledge :D):

For simplicity, I am going to modify the above assembly above to use more friendly notation when making references to addresses and write some pseudocode in C syntax (I'll be 
omitting some details so it's not a one to one replication). From instructions between `<+11>` to `<+21>`, 
we are storing the canary value 8 bytes below the base pointer:

```nasm
<+11>:    mov    0x182d(%rip),%rax        # 0x8049fd0
<+18>:    mov    (%rax),%rcx
<+21>:    mov    %rcx,-0x8(%rbp)
```

```c
rax = 0x8049fd0
rcx = rax
*(rbp-8) = rcx
```

This value is then compared with `rax` register which is again loaded with the original canary value in the instruction address `<+34>`. The generated assembly code utilises the 
2nd method to check whether a canary value has been overwritten, by subtracting the two canary values:

```nasm
<+34>:    mov    0x1816(%rip),%rax        # 0x8049fd0
<+41>:    mov    -0x8(%rbp),%rsi
<+45>:    sub    (%rax),%rsi
```

```c
rax = 0x8049fd0;//store the original canary value into rax (this value will ideally be not modified)
rsi = *(rbp-8); //store our canary value to register rsi (this value could be modified if we have a buffer overflow)
result = rsi - rax
```

As the canary value was not modified, the result is set to `0`. `je` in iaddress `<+48>` will skip the next instruction to call `__stack_chk_fail@plt` (iaddress `<+50>`).

**Note:** I did not read into the function `__stack_chk_fail@plt` so maybe they do more checks to see if the canary failed because it has the name `chk` into the name

As our program skipped `__stack_chk_fail@plt`, the program does not crash.

Now let's take a quick look into why adding a print statement triggers the crash:

```
=> 0x00000000080487f6 <+37>:    call   0x8048650 <puts@plt>
   0x00000000080487fb <+42>:    mov    $0x0,%eax
   0x0000000008048800 <+47>:    mov    %eax,%edx
   0x0000000008048802 <+49>:    mov    0x17c7(%rip),%rax        # 0x8049fd0
   0x0000000008048809 <+56>:    mov    -0x8(%rbp),%rsi
   0x000000000804880d <+60>:    sub    (%rax),%rsi
   0x0000000008048810 <+63>:    je     0x8048817 <main+70>
   0x0000000008048812 <+65>:    call   0x8048660 <__stack_chk_fail@plt>
   0x0000000008048817 <+70>:    mov    %edx,%eax
   0x0000000008048819 <+72>:    leave
   0x000000000804881a <+73>:    ret
End of assembler dump.
(gdb) stepi

Program received signal SIGSEGV, Segmentation fault.
```

Immediately we can see that the stack guard is not the reason for the crash but rather a call to `puts@plt` that triggered the crash. 
Let's compare the two instruction registers before the crash is triggered where the first is from a program with a valid buffer size:

```nasm
(gdb) i r
...
rbp            0x81ce0             0x81ce0
rsp            0x818d0             0x818d0
...
```

v.s.

```nasm
(gdb) info r
...
rbp            0x81ce0             0x81ce0
rsp            0xfffffffffff81cd0  0xfffffffffff81cd0
...
```

Only the stack pointer `rsp` differs which is to be expected. To understand the crash, we first need to recall the fact that each function has their own stack. 

<details>
<summary>Side Note: Stacks</summary>

Feel free to skip this section. This section investigates how the stack grows. All you need to understand is that the new stack frame will be located "after" the 
callee stack frame.

Let's observe the following simple program:

<div class="language-c highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">#include</span> <span class="cpf">&lt;stdio.h&gt;</span><span class="cp">
</span><span class="kt">void</span> <span class="nf">foo</span><span class="p">(</span><span class="kt">char</span> <span class="o">*</span><span class="n">x</span><span class="p">,</span> <span class="kt">int</span> <span class="n">y</span><span class="p">)</span> <span class="p">{</span>
    <span class="kt">char</span> <span class="n">z</span><span class="p">[</span><span class="mi">16</span><span class="p">]</span> <span class="o">=</span> <span class="p">{</span><span class="sc">'W'</span><span class="p">,</span> <span class="sc">'o'</span><span class="p">,</span> <span class="sc">'r'</span><span class="p">,</span> <span class="sc">'l'</span><span class="p">,</span> <span class="sc">'d'</span><span class="p">};</span>
    <span class="n">printf</span><span class="p">(</span><span class="s">"%d: %s %y</span><span class="se">\n</span><span class="s">"</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">x</span><span class="p">,</span> <span class="n">z</span><span class="p">);</span>
<span class="p">}</span>
<span class="kt">int</span> <span class="nf">main</span><span class="p">()</span> <span class="p">{</span>
    <span class="kt">char</span> <span class="n">x</span><span class="p">[</span><span class="mi">32</span><span class="p">]</span> <span class="o">=</span> <span class="p">{</span><span class="sc">'H'</span><span class="p">,</span> <span class="sc">'e'</span><span class="p">,</span> <span class="sc">'l'</span><span class="p">,</span> <span class="sc">'l'</span><span class="p">,</span> <span class="sc">'o'</span><span class="p">};</span>
    <span class="kt">int</span> <span class="n">y</span> <span class="o">=</span> <span class="mi">21</span><span class="p">;</span>
    <span class="n">foo</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div></div>
<b>Note:</b> When reading the stack, recall which way the stack grows and the endian. In our case, the stack grows downwards starting from a higher address and 
grows towards the lower addresses. The format is in little endian meaning the least significant bit is placed in the lower address.

Before <code class = "language-plaintext highlighter-rouge">foo</code> is called, this is the state of our base and stack pointers:
<div class="language-nasm highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="p">(</span><span class="nf">gdb</span><span class="p">)</span> <span class="nv">i</span> <span class="nv">r</span> <span class="nb">rbp</span>
<span class="nf">rbp</span>            <span class="mh">0x81ce0</span>             <span class="mh">0x81ce0</span>
<span class="p">(</span><span class="nf">gdb</span><span class="p">)</span> <span class="nv">i</span> <span class="nv">r</span> <span class="nb">rsp</span>
<span class="nf">rsp</span>            <span class="mh">0x81ca0</span>             <span class="mh">0x81ca0</span>
</code></pre></div></div>

and the addresses of the stack variables:

<div class="highlighter-rouge"><pre class="highlight"><code>(gdb) p &x[0]
$2 = <font color="ff5733"><b>0x81cb0</b></font> "Hello"
(gdb) p &y
$3 = (int *) <font color="c898ff"><b>0x81cac</b></font>
</code></pre></div>

and the corresponding values in the stack (highlighted the same color as its corresponding addresses):
<div class="highlighter-rouge"><pre class="highlight"><code>(gdb) x/6x $sp
0x81ca0:        0x08049dd8      0x00000000      0x08049dd8      <font color="c898ff"><b>0x00000015</b></font>
0x81cb0:        <font color="ff5733"><b>0x6c6c6548      0x0000006f</b></font>
...
</code></pre></div>

<details>
<summary>Reading the Stack</summary>
<code class = "language-plaintext highlighter-rouge">y = 21</code> corresponds to <code class = "language-plaintext highlighter-rouge">0x15</code> stored in the address <font color="c898ff"><b>0x81cac</b></font>

<div class="highlighter-rouge"><pre class="highlight"><code>char x[32] = {'H', 'e', 'l', 'l', 'o'};
movabs $0x6f6c6c6548,%rax
</code></pre></div>

The string <code  class = "language-plaintext highlighter-rouge">x</code> starts from <font color="ff5733"><b>0x81cb0</b></font> where <code class = "language-plaintext highlighter-rouge">H</code> is <code class = "language-plaintext highlighter-rouge">0x48</code> (104 in ASCII) and <code class = "language-plaintext highlighter-rouge">o</code> is <code class = "language-plaintext highlighter-rouge">6f</code> (111 in ASCII)
</details>

When the function <code class = "language-plaintext highlighter-rouge">foo</code> is called, we can observe that the new base stack is "above" (lower address) than the callee <code class = "language-plaintext highlighter-rouge">main</code>:
<table>
<thead>
    <tr>
        <td>Register</td><td>main</td><td>foo</td>
    </tr>
</thead>
<tbody>
    <tr>
        <td>rbp</td><td>0x81ce0</td><td>0x81ca0</td>
    </tr>
    <tr>
        <td>rsp</td><td>0x81c90</td><td>0x81c60</td>
    </tr>
</tbody>
</table>

Therefore we should observe the stack variables under <code class = "language-plaintext highlighter-rouge">foo</code> "above" (lower address) than the callee <code  class = "language-plaintext highlighter-rouge">main</code> as well:

<div class="language-nasm highlighter-rouge"><div class="highlight"><pre class="highlight"><code>(gdb) p &(x[0])
$4 = 0x81cb0 "Hello"
(gdb) p &y
$5 = (int *) 0x81c64
(gdb) p &z[0]
$6 = 0x81c70 "World"
(gdb) x/80x rsp
No symbol "rsp" in current context.
(gdb) x/-21x 0x81cb0+8
0x81c64:        0x00000015      0x00081cb0      0x00000000      0x6c726f57
0x81c74:        0x00000064      0x00000000      0x00000000      0x000e74a0
0x81c84:        0x00000001      0x649d7900      0xd7224120      0x00081ce0
0x81c94:        0x00000000      0x08048897      0x00000000      0x08049dd8
0x81ca4:        0x00000000      0x08049dd8      0x00000015      0x6c6c6548
0x81cb4:        0x0000006f
</code></pre></div></div>
</details>

Any new stack frames will come after `rsp` (lower addresses in our case), so we can simply try to modify `rsp` with any random value to trigger a segfault. Considering we cannot even 
access the variable `buf`, it will come to no surprise that `gdb` will prevent us from writing to the memory address:
```nasm
(gdb) p buf[0]
Cannot access memory at address 0xfffffffffff81cd0
(gdb) p &buf[0]
$4 = 0xfffffffffff81cd0 <error: Cannot access memory at address 0xfffffffffff81cd0>
(gdb) set {int}$rsp=8
Cannot access memory at address 0xfffffffffff81cd0
```

Honestly, this was very anti-climatic.

**Conclusions:**
* The stack guard was never triggered since we never overwrote our canary value (I mean the program did nothing anyways)
* Adding a single print statement was enough to trigger a segmentation fault as the stack pointer will point into an unreachable address for writing

---

### Some Random Notes on GDB

A few notes on working with a remote target with gdb:
* **Connecting to the target:** `target qnx <ip-address>:8000`
* **Load the file:** `file <prog-binary>`
* **Upload binary to the target:** `upload <file> <full_path_in_remote>`

**Example:**
```
(gdb) target qnx 192.168.124.207:8000
Remote debugging using 192.168.124.207:8000
MsgNak received - resending
Remote target is little-endian
Disabled 'set detach-on-fork' for remote targets
(gdb) file prog-amd64
Reading symbols from prog-amd64...
(gdb) upload prog-amd64 /tmp/prog-amd64
```

Some stuff I found out:
```
(gdb) x/1s 0x8048824
0x8048824:      "hello world"
```

