---
layout: post
title: Splitting Files On Linux
description: Splitting files into smaller chunks
categories: [utilities, pdf]
---

Today I was asked to reshare my notes from a class I took in the Fall as they noticed that 
they no longer have access to the files on Google Drive. Unfortunately for me, I had way 
too many files on Google Drive that I had to do a massive purge on my Google account which 
was not limited to only Drive itself but also most emails I had since 2011. Not wanting to 
overcrowd my Google cloud storage again, I decided to send them the notes either via email 
or Discord. However, the issue with that is:

* Both Gmail and Discord have a 25MB limit
* Sending via email takes my Google Storage
* Two of the three files are over 25MB
* Files were not highly compressible (little savings after trying both zip and xz compression)

In hindsight, I could have just split the pdf to have fewer pages but I did not think of that. 
So I guess the friend will be forced to boot up their Linux VM or hopefully had WSL2 on their 
Windows machine.

## Splitting Files
`split` is a utility that is offered in most Linux Distributions and is a handy tool to split 
files into many parts. The only issue is that it names files starting with the letter `x` and 
each part is ordered from `a` to `z` so you get filenames like `xa`, `xb`, `xc` and etc. 
While you can probably write a script to fix this, I'm lazy and I only needed to split two pdfs 
into 20MB chunks so it wasn't a pain to rename.

```
$ split --bytes=20M MATH3001-notes-1_231013_112237.pdf
$ ls -sh x*
20M xaa  16M xab
$ mv xaa math3001-notes1-1
$mv xab math3001-notes1-2
```

To combine them again, just cat the files:
```
cat math3001-notes1-1 math3001-notes1-2 > math3001-notes1.pdf
```

To verify the files were split and combined successfully, we can compare the md5sum (or just look at the pdf itself):
```
$ md5sum math3001-notes1.pdf 
692e1b5fee087b0f6095cbacbeda3fa0  math3001-notes1.pdf
$ md5sum MATH3001-notes-1_231013_112237.pdf 
692e1b5fee087b0f6095cbacbeda3fa0  MATH3001-notes-1_231013_112237.pdf
```

![A gif demonstrating splitting and combining a pdf file](../assets/gif/split.gif)
