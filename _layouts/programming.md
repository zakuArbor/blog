---
layout: page
permalink: /programming/
title: Programming
---
A random blog discussing various topics in Computer Science and Programming that I find interesting to write about. It mostly serves as a medium to test or reiterate to myself what I learned.

## C/C++

---
* [GDB - Mix Source Code with Assembly](../gdb-dissassemble-src)
* [The Value of An Uninitialized Global Variable](../global-init-val) 
* [Possible Linker Options to Use to Replicate xlC bloadmap Option on ld](../bloadmap-gcc-alt)
* [What is Name Mangling](../extern-c-name-mangling)
* [C Programming - Variable Length Array (VLA)](../variable-len-arr)
* [Error Loading Shared Library Even If File Exists](../lddconfig)
* [What Goes on When you Press the Play Button](../building-code)
* [printf - Reorder Arguments using $](../printf-$)
* [Debugging expr with ldd](../ldd-to-debug-expr)
* [Dangers of Improper Macro Naming](../dangers-of-improper-macro-naming)
* [A look at Double Pointers](../double-pointers)
* [Another Look at CONST in C](../c-const)
* [A Look at Input Buffer and Scanf](../a-look-at-input-buffer-using-scanf)
* [Debugging Symbols - A Basic Look at Separating Debug Symbols](../debugging-symbols)
* [recvfrom - Obtaining the Return Address](../recvfrom-ret-addr)
* [Polluting the Web With a Useless 5 argument main function](../useless-main/)

## Highlevel Overview of Topics

---

* [An Overview of Build and DevOps from A Semi-Outside Perspective](../build-team)
* [Software Portability](../software-ports)
* [Bias UTM CS Course Review](../bias-utm-cs-course-review)
* [Computer Science – A Long and Gargled Explanation](../computer-science-a-long-and-gargled-explanation)


## Dev Blogs

---

<ul>                                                                            
{% for post in site.posts %}                                                    
{% if post.categories contains 'dev blog' %}
<li><a href = '..{{post.url}}'>{{ post.title }}</a></li>                        
{% endif %}                                                                     
{% endfor %}                                                                    
</ul>        

## Others

---

* [Fluent Bit Avro Frustration](https://zakuarbor.github.io/blog/avro-fluentbit-header/)
* [Duplicate a Fluent-Bit Plugin](https://zakuarbor.github.io/blog/fluentd-kafka-copy/)
* [Verifying Email Signature Manually](../signature-verification/)
* [Rust - Invoking Closures in a Struct](../rust-closure-invoke/)
* [Rust - Exploring the Assembly Code between Mutable and Shadow Variables](../rust-shadow-vs-mut)
* [QNX - An Introduction to Adapative Partitioning Scheduler and How to Bankrupt Partitions](../qnx-aps)
* [QNX - The Search for the Release Notes](../qnx-release-notes)
* [QNX - You Shall Not Slay the Client](../cannot-kill-process)
* [Misconfigured Hostname](../misconfigured-hostname)
* [ct - Bad Phone Number](../ct-bad-phone-number)
* [Random Thoughts about Tee](../random-thoughts-about-tee)
* [Github App Limiation: Not All Refs Are Readable Error](../github-app-limitation-not-all-refs-are-readable-error)
* [Github Apps on GHE: Your Private Key is not Correct](../github-apps-on-ghe-your-private-key-is-not-correct)
* [Testing GithubPages Repo and Directory Conflict Resolution](../github-pages-behavior)
* [Shellbang Character limit](../shellbang-char-limit/)
* [How to Check if an Application is PAM-Aware](../pam-aware)
* [An Uninteresting Glance At Strings](..string-asm)



