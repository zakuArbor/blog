---
layout: post
title: Shellbang Character limit
description: A quick note to myself on shebang's character limit
categories: [programming, shell]
---

A short  blog, more like a note to myself about the character limit on shebang. 
Shebang in the UNIX-like world is the characters `#!` at the beginning of a script 
to indicate the interpreter's path.

**tldr:**
* character limit is 256 on modern Linux systems including the shebang
* specified by `BINPRM_BUF_SIZE`

**TOC:**
* [Introduction](#intro)

<a name = "intro"/>
## Introduction - What is a Shebang

A script is essentially a textfile that is useless without a program to interpret 
the commands. Unlike a program where there exists either a static or dynamic program loader, 
a script is "interpreted" line by line by a program called the interpreter which translates  
the commands in your script into a series of instructions that the OS, CPU or another program 
can understand (I could be wrong on the technicalities). For a script to be executed 
without feeding the program into an interpreter manually, the shebang is used to 
indicate to the shell or the shell's program loader I guess to execute the specified 
interpreter so that the script can be run.

```
sh test.sh
perl test.pl
python test.py
```

<p class = "caption">An example of manually running the script into an interpreter</p>

In UNIX-like environments, you can set a file to be executable. However, if it's not a 
compiled program (an actual executable file such as an ELF file), the OS or shell needs to know 
how to execute the program. While I don't know the internals how the OS knows how to 
execute the program, I believe if the file is not under some executable format like 
COFF or ELF, it'll look at the shebang at the beginning of the file to see if 
there's an interpreter in the specified file.

```
#!/usr/bin/sh
#!/usr/bin/perl
#!/usr/bin/python
```

<p class = "caption">An example of how to specify the path of the interpreterin Shell Bourne, Perl, and Python respectively</p>

Below is an example of an error one may see if there's no shebang at the beginning of a script:

<div class="language-plaintext highlighter-rouge">                              
<pre class = "highlight"><font color="#26A269"><b>13:45 </b></font><font color="#D0CFCC"><b>[</b></font><font color="#2AA1B3">zaku</font><font color="#D0CFCC"><b>:</b></font><font color="#A347BA">/tmp</font><font color="#D0CFCC"><b>]</b></font>
<font color="#D0CFCC"><b>$ </b></font>cat test.py
print(&quot;Hello World&quot;)
<font color="#26A269"><b>13:45 </b></font><font color="#D0CFCC"><b>[</b></font><font color="#2AA1B3">zaku</font><font color="#D0CFCC"><b>:</b></font><font color="#A347BA">/tmp</font><font color="#D0CFCC"><b>]</b></font>
<font color="#D0CFCC"><b>$ </b></font>./test.py 
./test.py: line 1: syntax error near unexpected token `&quot;Hello World&quot;&apos;
./test.py: line 1: `print(&quot;Hello World&quot;)&apos;
<font color="#26A269"><b>13:45 </b></font><font color="#D0CFCC"><b>[</b></font><font color="#2AA1B3">zaku</font><font color="#D0CFCC"><b>:</b></font><font color="#A347BA">/tmp</font><font color="#D0CFCC"><b>]</b></font>
</pre>
</div>

<p class = "caption">An example of a python program that cannot be executed on the shell because the shell does not know how to interpret the script</p>

With the shebang, the shell will know how to execute the script:

<div class="language-plaintext highlighter-rouge">                              
<pre class = "highlight"><font color="#26A269"><b>13:45 </b></font><font color="#D0CFCC"><b>[</b></font><font color="#2AA1B3">zaku</font><font color="#D0CFCC"><b>:</b></font><font color="#A347BA">/tmp</font><font color="#D0CFCC"><b>]</b></font>
<font color="#D0CFCC"><b>$ </b></font>cat test.py
#!/usr/bin/python
print(&quot;Hello World&quot;)
<font color="#26A269"><b>13:51 </b></font><font color="#D0CFCC"><b>[</b></font><font color="#2AA1B3">zaku</font><font color="#D0CFCC"><b>:</b></font><font color="#A347BA">/tmp</font><font color="#D0CFCC"><b>]</b></font>
<font color="#D0CFCC"><b>$ </b></font>./test.py 
Hello World
</pre></div>

<p class = "caption">An example of a python program being executed since the shebang points to the interpreter telling the shell to load the script into the interpreter</p>

Here's an example if you provide an invalid interpreter path:
```
$ ./test.py 
bash: ./test.py: /usr/bin/python#: bad interpreter: No such file or directory
```

<!--
<div class="language-plaintext highlighter-rouge">                              
<pre class = "highlight">
</pre></div>
-->

## Character Limit

Being bored on my morning commute to school (being on the bus at 6:50am is not fun), I noticed someone mentioned how there was a 255 character limit in shebang 
on the school's computer science discord that I lurk around despite being a Math student. 
I got curious and decided to speculate before taking a look online. I speculated it must have to do with `PATH_MAX` or `NAME_MAX` 
specified in `limits.h` because of encountering issues on Window Builds in the past at two places I worked at before 
where the builds would fail because the path was too long. However, my speculation was wrong when 
I did a quick google search: 

> Limited to 127 chars on 99.9% of systems due to kernel compile time buffer limit.
> It's limited in the kernel by BINPRM_BUF_SIZE, set in include/linux/binfmts.h.
> -- [Stackoverflow](https://stackoverflow.com/questions/10813538/shebang-line-limit-in-bash-and-linux-kernel)

As this contradicted what a student said, I decided to take a look at the file as the answer was from 2012. Surely 
enough, it was 256 characters long as the student stated.

```
/*
 * These are the maximum length and maximum number of strings passed to the
 * execve() system call.  MAX_ARG_STRLEN is essentially random but serves to
 * prevent the kernel from being unduly impacted by misaddressed pointers.
 * MAX_ARG_STRINGS is chosen to fit in a signed 32-bit integer.
 */
#define MAX_ARG_STRLEN (PAGE_SIZE * 32)
#define MAX_ARG_STRINGS 0x7FFFFFFF

/* sizeof(linux_binprm->buf) */
#define BINPRM_BUF_SIZE 256
```

<p class = "caption">A snippet of binfmts.h. Source: <a href = "https://elixir.bootlin.com/linux/latest/source/include/uapi/linux/binfmts.h#L19" alt = "binfmts.h source code">Elixir Source Code Viewer: /include/uapi/linux/binfmts.h</a></p>

We can test this theory ourselves by padding `//` at the beginning or `./` in between the path. 

```
#!/./././././././././././usr/bin/python
```

If the path is over 256 characters, we can see an error occurs as expected:

```
$ head -n 1 test.py | wc -c
290
$ ./test.py 
./test.py: line 2: syntax error near unexpected token `"Hello World"'
./test.py: line 2: `print("Hello World")'
```

But if we have exactly 256 characters (256) characters, the program runs 
as expected:
```
$ ./test.py 
$ head -n 1 test.py | wc -c
256
$ ./test.py 
Hello World
```

**Note:** The path length includes two characters from the shebang `#!` 

---

## Conclusion

Nothing exciting but as I said, it's a note to myself that the interpreter path 
is restricted to 256 characters in length including the shebang (i.e. length of 
the path is 254 characters long). Hopefully there'll be a more exciting post 
in the near future but no guarantees. 

The only implication of this finding 
I can think of is when your system has some very ridiculous path to an interpreter 
such as Python which can occur. At one place I worked at, we did store compilers 
in some shared mount that has a somewhat long path but nowhere near the limit. But 
I could imagine there would be some places where they do exceed that limit whether it 
being in some ridiculous location or the workspace name on their Jenkins setup is 
long (though I think this rarely happens).
