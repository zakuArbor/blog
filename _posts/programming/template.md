---
layout: post
title: 
description: 
categories: [programming]
---


<details>
<summary><b>tldr</b></summary>
<hr/>
<code class="highlighter-rouge">recvfrom()</code> requires <code class = "highlighter-rouge">src_addr</code> and <code class="highlighter-rouge">addrlen</code> to not be null and 
<b><code class="highlighter-rouge">addrlen</code></b> to be initialized with the size of `struct sockaddr`
<hr/>
</details>

<div class="language-plaintext highlighter-rouge">                              
<pre class = "highlight"><code class = "red"># aps                              
                    +-------- CPU Time --------+-- Critical Time --             
Partition name   id | Budget |   Max  |   Used | Budget |   Used                
--------------------+------------------------+---------------------             
System            0 |  55.0% | 100.0% | 0.01% |  200ms |   0.000ms              
drivers           1 |  40.0% | 100.0% | 0.25% |    0ms |   0.000ms              
recovery          2 |   5.0% | 100.0% | 2.08% |    0ms |   0.000ms              
--------------------+------------------------+---------------------             
Total               | 100.0% |        | <b>2.35%</b>|</code></pre></div> 

---

## Conclusion

To summarize this long blog post, use `recvfrom()` API to retrieve the source IP address (if the protocol supports it). 
Ensure that you have passed non-NULL values for `src_addr` and `addrlen` arguments with `addrlen` initialized to 
`sizeof(struct sockaddr_in)` to obtain all the necessary information.
