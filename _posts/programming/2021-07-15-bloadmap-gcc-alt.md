---
layout: post
title: Possible Linker Options to Use to Replicate xlC bloadmap Option on ld
description: A possible replication of xlC bloadmap option on ld via g++ to debug undefined symbols
categories: [programming, c++]
---

For context, xlC is IBM's C++ compiler that is used to optimize C/C++ applications on IBM's supported environments 
and is out of reach from the hands of the average developer. xlC compiler is typically only 
used on AIX systems or on mainframes running z/OS or Linux on Power. 

Today I want to suggest a linker option for g++ (i.e. using the ld linker) that 
can potentially replicate `bloadmap` option that exists on xlC. 
Though I never tried using this option to actually debug unresolved symbols.

---

## What is bloadmap

---

Whenever there is an unresolved symbol error on our AIX builds, I typically 
see a map file that gets generated. While I am not very familiar with the usage, 
I thought it's a great feature because it clearly lists the object file that contains 
the unresolved symbol.

For instance, if we were to compile the example I gave in my post about 
[name mangling](../extern-c-name-mangling) on AIX, we'll see the following:
```
ld: 0711-317 ERROR: Undefined symbol: .bt_cmp                    
ld: 0711-344 See the loadmap file file.map for more information.
```

At the bottom of `file.map`, we'll see the following:
```
(ld): er full
ld: 0711-318 ERROR: Undefined symbols were found.
        The following symbols are in error:
 Symbol                    Inpndx  TY CL Source-File(Object-File) OR Import-File{Shared-object}
                              RLD: Address  Section  Rld-type Referencing Symbol
 ----------------------------------------------------------------------------------------------
 .bt_cmp__FPCcPCc          [26]    ER PR test.C(/home/db2v2/tmpdir/8847540_0.o)
                                   00000038 .text    R_RBR    [12]    .main
```

Based on this information, we know the source file and the mangled symbol the 
linker failed to resolve.

For more information on `bloadmap`, I suggest taking a look at IBM's xlC documentation 
on [Diagnosing link-time problems](https://www.ibm.com/docs/en/xl-c-and-cpp-aix/16.1?topic=cc-diagnosing-link-time-problems).

---

## Replicating bloadmap on ld (g++)

---

Seeing this feature existing on out AIX builds, it made me curious if we could 
try to replicate this on our Linux AMD6 builds (i.e. non-xlC supported platform).

On the linker `ld`, there's an option `-Map=mapfile` which will produce the 
linker log similar to what `bloadmap` provides from my assumption 
(I never had a need to look at the other information so I could be wrong). 
If we look at the man pages for `ld` we see the following:

```
A link map provides information about the link, including the following:

           •   Where object files are mapped into memory.

           •   How common symbols are allocated.

           •   All archive members included in the link, with a mention of the symbol which caused the archive member to be brought in.

           •   The values assigned to symbols.
```

Notice how it never mentions unresolved symbols in the documentation. It turns 
out that `-Map` option doesn't really give us any useful information to debug 
link-time errors. Unlike `ld`, xlC `bloadmap` option clearly states essentially 
what everyone uses the option for: 

```
If any unresolved symbol is found, the linker log file lists the object file or shared object that references the symbol
```

The closest I managed to replicate the feature I want is using the option `-Wl,--no-demangle`
```
test.c:(.text+0x37): undefined reference to `_Z6bt_cmpPKcS0_'
collect2: error: ld returned 1 exit status
```

If we couple this option with `-Map`, we possibly could have a g++ `bloadmap` 
equivalent feature. To confess, I don't work in development so I never had to 
debug unresolved symbols. So I am not sure if there's an actually need for 
this feature.

## Summary

---

A linker option you may want to try out to replicate `bloadmap` feature that 
exists on xlC, try `g++ -Wl,--no-demangle,-Map=file.map`. Though it's not a 
perfect replacement and I never had to resolve linker issues so not sure 
how useful this feature would be. I was just curious if I could quickly 
think of a possible alternative on `ld`.

**Note:** This blog is quite similar to Peeter Joot's look at a linker option 
to consider the next time he hits a linker error. 
I did not read his post till after I concluded my search. 
