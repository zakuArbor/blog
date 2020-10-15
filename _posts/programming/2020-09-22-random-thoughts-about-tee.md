---
layout: post
title: "Random thought about Tee"
categories: [programming, unix]
---
<style>
	.tee-img {
		width: 720px;
		margin-top: 10px;
		border-width: 2px;
		border-style: solid;
		border-color: white;
	}
</style>

In the latter half of June (when I flee from my parent's home to Mississauga for 2 months so that I can study and read all I want without being bothered), I decided to read [Intermediate Perl: Beyond The Basics of Learning Perl](https://www.amazon.ca/Intermediate-Perl-Beyond-Basics-Learning/dp/1449393098). For those of you who are not familiar with the book, it's the sequel to the "Llama book" [(Learning Perl)](https://en.wikipedia.org/wiki/Learning_Perl), a classic book on Perl.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/intermediate_perl_cover-1.jpg" alt = "the cover of Intermediate Perl featuring a Llama" class = "center" style = "height: 500px;"/>
<p class = "excerpt">The cover of Intermediate Perl. Following the tradition of O'Reilly books, the animal feature in the cover is the Llama</p>

There was a section where it mentioned about tee, a UNIX command-line tool that writes an output of a command to your console while also writing the output to a file. This is a convenient tool to use when working on the terminal because I would often execute a script and redirect the output to a file but would often need to ensure the script is running as intended. I first encounter tee during my internship when my senior intern introduced me to the tool.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/sun-tee.png" alt = "the man description of tee on SunOS 5.11" class = "center tee-img"/>
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/aix-tee.png" alt = "the man description of tee on AIX 6.1" class = "center tee-img"/>
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/rhel-tee.png" alt = "the man description of tee on RHEL 8.2" class = "center tee-img"/>
<p class = "excerpt">A snippet of what the man displays about tee on three different Operating Systems: SunOS 5.11, AIX 6.1 and on my current distribution RHEL 8.2 respectively. I personally like the Linux definition of tee the most out of the three</p>

To illustrate how `tee` works, it's best to go through a simple example. For instance, let's say we want to echo `Hello World zaku` where `zaku` is the user of the system and save the output to a file named `greetings`. Then we would do the following:
```
$ echo Hello World $USER &gt; greetings
$ cat greetings
Hello World zaku
```
In the example above, you saw how you needed to `cat greetings` to verify the output is what you wanted. Side Note: `cat` is the UNIX tool that outputs the content of one or more files. The name `cat` comes from the word `concatenate` as we are concatenating the contents of various files to `stdout`. At least that's how I think of it.

This can all be done in one line using `tee` by piping the output of the echo command to `tee`:
```
$ echo Hello World $USER | tee greetings
Hello World zaku
```

Although the example is quite simple and pointless, it illustrates how `tee` works. The main point of this post isn't how to use `tee` but some random fact I learnt about `tee`. As usual I like to spout random content before going to the main point of this post.

Perhaps it's best to end this blog post with the actual reason why I made this post

I was very fascinated to learn that the command `tee` was named after the T-Splitter used in plumbing. A `tee` is used to combine or divide the flow of fluids. In the UNIX `tee`, it is used to divide the "flow of fluids", where there is one input pipe (the output of the command) and two output pipes: `stdout` and a file. Not sure why this got me so fascinated about it but it was exciting enough for me to immediately share it with my former coworkers who also never knew where the term came from.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/tee.jpg" alt = "A picture of a tee that is commonly seen under a sink" class = "center"/>
<p class = "excerpt">A PVC Tee that you may see under your sink</p>