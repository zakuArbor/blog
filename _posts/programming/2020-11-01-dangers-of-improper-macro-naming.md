---
layout: post
title: Dangers of Improper Macro Naming
categories: [programming, c, c++]
---

---
# TOC
* [1. A random promotion](#sec1)
* [2. Expected unqualified-id before string constant Error](#sec2)
    * [2.1. Verifying the Error is not Environment Related](#sec2-1)
* [3. The Dangers of MACROS](#sec3)
      
---

<h1 id = "sec1">A random promotion</h1>

For the past 2 days, I've been spending most of my day working on a Virtual 
Machine translator to translate VM intermediate language to assembly for 
the Hack 16 Bit Computer. Hack is a 16-bit computer designed by Noam Nisan and 
Shimon Schocken from 
[Nand2Tetris II](https://www.coursera.org/learn/nand2tetris2) course offered on 
Coursera. It's an amazing course and I highly recommend anyone interested in 
understanding how your computer works from very a very low level of using NAND 
gates all the way to construct a program on top of OS you theoretically made. 
They also have a textbook named **The Elements of Computing: Building a Modern 
Computer from First Principles** (the 2nd edition is coming out on July 6 2021, 
so I recommend waiting for it).

<h1 id = "sec2">Expected unqualified-id before string constant Error</h1>

Enough with the tangent. While working on the translator, I encountered a 
particular error:

<pre style="background: #282a36; color: white; padding: 15px; font-size:15px">
In file included from <b>Parser.h:9</b>,
                 from <b>main.cpp:6</b>:
<b>/usr/include/c++/8/sstream:167:7:</b> <font color="#EF2929"><b>error: </b></font>expected unqualified-id before string constant
       <font color="#EF2929"><b>str</b></font>() const
       <font color="#EF2929"><b>^~~</b></font>
</pre>

From the error itself, it is not obvious what is the issue. Usually, such error 
could be caused by forgetting to end a quote or a bracket. We do see that the 
issue relates to `str` and a const. One of the first things I did was to test 
whether or not there was an issue with my system since **\<sstream\>** is a 
standard library and not a file I modified.

<h2 id = "sec2-1">Verifying the Error is not Environment Related</h2>
**\<sstream\>** is a standard C++ library provided by 
**libstdc++-devel-8.3.1-5.el8.x86_64** package on my system 
(if you use yum package manager, you can use: 
**rpm -q --whatprovides \<file\>** to find the package). Finding 
any sample sufficient from [cplusplus.com](cplusplus.com) relating to 
**\<sstream\>** would be sufficient to test if there is something wrong with the 
package you installed. It's unlikely to be an issue with the package but I love 
blaming the computer for all my problems in life. Though it can occur. I've 
been quite skeptical with C++ libraries especially after trying to set up two 
bare metal machines (a SLES AMD machine and a RHEL machine running on PowerPC) 
for work. Trying to compile our source code on these machines can cause some 
serious headaches if you didn't realize that the machines had environment 
issues.


Anyhow, in my case I decided to copy code relating to regex from the internet 
to test whether or not there was an issue with **\<sstream\>** library. As 
expected, there was no issue but I was still very lost on why the issue 
occurred. For context, the error started to appear when I added **\<regex\>** library in my code. **FYI: \<regex\>** library includes **\<sstream\>** in 
line 46:

<pre style="background: #282a36; color: white; padding: 15px;font-size:15px">
$ grep -n sstream /usr/include/c++/8/regex
<font color="#4E9A06">46</font><font color="#06989A">:</font>#include &lt;<font color="#EF2929"><b>sstream</b></font>&gt;
</pre>

While playing around with my code, I found a weird behavior where the error 
would disappear when I reordered my **includes**. In particular, the following 
lines would cause an error:

<pre style="background: #282a36; color: white; padding: 15px;font-size:15px">
<font color="#FF2929">#include</font> <font color="#FFFF33"> "instr_info.h"</font>
<font color="#FF2929">#include</font> <font color="#FFFF33"> &lt;regex&gt;</font>
</pre>
But when the code is reordered:
<pre style="background: #282a36; color: white; padding: 15px;font-size:15px">
<font color="#FF2929">#include</font> <font color="#FFFF33"> &lt;regex&gt;</font>
<font color="#FF2929">#include</font> <font color="#FFFF33"> "instr_info.h"</font>
</pre>
The errors would "magically" disappear. Therefore, I decided to take a look at 
the file **instr_info.h** to see what is up. The first thing that appears in my 
eyes is the following line:
<pre style="background: #282a36; color: white; padding: 15px;font-size:15px">
<font color="#FF2929">#define</font> <font color="#ADFF2F"> str</font>(s) #s
</pre>

<h1 id = "sec3">The Dangers of MACROS</h1>
The issue with my code was choosing a poor MACRO. The word **str** appears 
quite frequently in any codebase, so using **str** as a MACRO is a very poor 
choice. In fact, when using MACROS, you should always make it distinct and 
obvious that the MACRO you are using is indeed a MACRO. It's recommended that 
your MACROs are capitalized to differentiate it from any other keywords and 
variables. I usually follow this rule to heart. However, this MACRO 
defined in **instr_info.h** was just some scratch code I copied from the 
internet and I stupidly forgot to remove it from my code. However, this was a 
good lesson to myself on how dangerous MACROs are. MACROs are great to define 
constants and to control the source code such as using it for header guards 
or to remove/swap blocks of code depending on the target platform.

**SIDENOTE:** The MACRO I copied from the internet is from 
[GNU 3.4 Stringizing](https://gcc.gnu.org/onlinedocs/cpp/Stringizing.html) to 
convert my MACROs into string constants. I am surprised GNU documentation would 
even give such a dangerous example.

But not managing your MACROS properly can leave very destructive results to your 
generated source code. A simple non-programming example I can give is 
the use of **alias** on your bash terminal. Imagine if you were some nefarious 
actor, you could simply make **ls** to be an alias to **rm -rf ~/\***. 
The effect it has on the users of the system is huge. Though the negative 
impact due to improper use of MACROs is usually unintentional, it should make 
programmers weary from using MACROs when it's not needed. Another alternative 
is to use namespace constants such as the following:
```c++
namespace constants {
  constexpr double PI = 3.14159;
}
```

---

To recap, due to MACRO's potential to replace unintended areas of your source 
code during preprocessing, it's best to avoid using MACROs when namespace 
constants are available. When no such alternative exists such as in C or it 
would be more appropriate to use a MACRO, ensure you follow good coding 
convention. MACROs should be capitalized to differentiate itself from other 
variables and keywords such as **printf**.