---
layout: post
title: Error Loading Shared Library Even If File Exists
description: Debugging loading shared library even though file exists
categories: [programming, c/c++, linker]
---

Have you ever encountered an error running a program where it's missing a dll or a shared library? 

![An image of a missing dll when trying to run Skype](https://filestore.community.support.microsoft.com/api/images/21f18fc5-2ff9-4fc8-a4b3-3734461b5b10)

In my previous blogs such as [A Dive to the Build Process]({{ site.url }}/blog/building-code/) or [Debugging expr with ldd]({{ site.url }}/blog/ldd-to-debug-expr/), I have explained briefly went over 
ldd and the usage of shared libraries. Today, I want to expand on this topic by going over something I encountered at work.

---

At work, one of my tasks was to do a proof of concept (PoC) on transferring and running a development build of our product to some new internal development environment.
During my work, I kept encountering a lot of minor errors where the generated object files or libraries would be missing simply due to differences in the project structure and the development environments. 
After writing a script to resolve all these minor issues, it was time to test run some sanity tests to ensure the product works as intended in the new environment.

However, I kept encountering a lot of linking errors even though I resolved the issue of missing generated object files and libraries in the new environment.
```shell
$ db2iset -a kimju10
db2iset: error while loading shared libraries: libdb2.so.1: cannot open shared object file: No such file or directory
```

If we were to run `ldd`, it should tell us if `libdb2.so` is missing and where our dynamic linker would find `libdb2.so`:
```shell
$ ldd db2iset | grep 'libdb2.so' 
        libdb2.so.1 => /home/kimju10/build/lib64/libdb2.so.1 (0x00007fdf3293a000)
```

I proceeded to check manually if the file exists:
```shell
$ readlink -f /home/kimju10/build/lib64/libdb2.so.1
/home/kimju10/<project>/<component>/lib/libdb2.so.1
$ ls -l /home/kimju10/<project>/<component>/lib/libdb2.so.1
-rwxr-xr-x 1 kimju10 build 55152984 Apr 24 05:22 /home/kimju10/<project>/<component>/lib/libdb2.so.1
```

The file existed so this stumbled me for a bit. I got a bit desparate and thought perhaps I needed to check <b>`LD_LIBRARY_PATH`</b> was set correctly. Though I think `ldd` would have complained about not being able to find the library if 
that was the issue. I completely forgot the run-time linker uses a cache. While I always thought updating `LD_LIBRARY_PATH` would suffice, in this case I needed to regenerate the links and cache that is used by the runtime linker.
While I am not knowledgeable as to why simply running `ldconfig` did not suffice, it may be due to the fact that `libdb2.so` was stored in some non-standard path (i.e. under <i>`/home`</i>). 
To resolve the issue, I simply added the path to the config: <i>`/etc/ld.so.conf`</i> and ran `ldconfig` to regenerate the cache.


Here's the description of <b>`ldconfig`</b> from the man pages:
```shell
DESCRIPTION
       ldconfig  creates  the  necessary  links and cache to the most recent shared libraries found in the directories specified on the command line, in the file /etc/ld.so.conf, and in the trusted directories, /lib and /usr/lib (on
       some 64-bit architectures such as x86-64, /lib and /usr/lib are the trusted directories for 32-bit libraries, while /lib64 and /usr/lib64 are used for 64-bit libraries).

       The cache is used by the run-time linker, ld.so or ld-linux.so.  ldconfig checks the header and filenames of the libraries it encounters when determining which versions should have their links updated.
```

---

## Summary

---

If you get an error about missing a shared library, try:
* using <b>`ldd`</b> to see if the library exists
* check if the linker library path is correct (i.e. <b>`LD_LIBRARY_PATH`</b>)
* recreate the cache using <b>`ldconfig`</b>
* You may need to edit the linker config under <i>`/etc/ld.so.conf`</i> before running <b>`ldconfig`</b>

