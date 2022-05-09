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

---

## Conclusion

To summarize this long blog post, use `recvfrom()` API to retrieve the source IP address (if the protocol supports it). 
Ensure that you have passed non-NULL values for `src_addr` and `addrlen` arguments with `addrlen` initialized to 
`sizeof(struct sockaddr_in)` to obtain all the necessary information.
