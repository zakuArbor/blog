---
layout: post
title: You shall not slay the client
description: A QNX flag _NTO_CHF_UNBLOCK that puts client in block pausing signals
categories: [programming, c/c++, qnx]
---

Recently, I got the opportunity to attend a two-week-long training in [Real-Time Programming For QNX Neutrino RTOS](https://blackberry.qnx.com/en/services/training/qnx-realtime-programming) 
where I am learning the ins and outs of QNX, a real-time microkernel operating system that is a UNIX-like OS.
On one of the demos, the trainer showed us a behavior that I thought was impossible. This shook the foundation of my 
understanding of IPC (Inter-Process Communication) and on signals. However, this is a feature in QNX that does not 
exist on Linux from my understanding.

The demonstration involved a client and server communicating with each other. Nothing out of the ordinary with 
the exception that the client is REPLY blocked. At this state, the client is blocked and is waiting for the 
server to reply back either with a message or an error. If the server sets the flag `_NTO_CHF_UNBLOCK` during 
the creation of the channel. In QNX Neutrino, threads communicate on a channel or on a connection whereby 
one thread (i.e. the server) will initiate a channel and have the other thread (i.e. client) 
"connect" to the channel by attaching to the channel. 
(On a side tangent, my brief introduction to QNX IPC makes me jealous). 
When the server creates a channel [ChannelCreate()](https://www.qnx.com/developers/docs/7.0.0/com.qnx.doc.neutrino.lib_ref/topic/c/channelcreate.html), 
it can pass a flag `_NTO_CHF_UNBLOCK` whereby it can stop the client from unblocking itself (such as to respond to a signal).

> This says to the kernel, “Tell me when a client tries to unblock from me (by sending me a pulse), but don't let the client unblock! I'll unblock the client myself.”
>
> The key thing to keep in mind is that this server flag changes the behavior of the client by not allowing the client to unblock until the server says it's okay to do so. 
> [Getting Started with QNX Neutrino - _NTO_CHF_UNBLOCK](https://www.qnx.com/developers/docs/7.0.0/#com.qnx.doc.neutrino.getting_started/topic/s1_msg_ntochfunblock.html)

Therefore, any signals set onto the client becomes pending and the client remains blocked. This includes `SIGKILL` and `SIGTERM`, which is very worrisome. 
The purpose of this feature has merit and is well explained in the [documentation](https://www.qnx.com/developers/docs/7.0.0/#com.qnx.doc.neutrino.getting_started/topic/s1_msg_ntochfunblock.html) 
but the fact it can still stop `SIGKILL` and `SIGTERM` is something unexpected for those of us new to QNX and come from Linux.

From the realm of Linux, signals can be blocked but `SIGKILL` and `SIGTERM` are definitely not one of them as seen from the man pages (`man 7 signal`):
<pre class = "highlight"><font color="#D0CFCC"><b>$ </b></font>man 7 signal | grep &quot;SIGKILL and SIGSTOP&quot;
       The signals <font color="#C01C28"><b>SIGKILL and SIGSTOP</b></font> cannot be caught, blocked, or ignored.
</pre>

The reason why this is worrisome is the fact that you cannot kill a misbehaving thread which is often the case during development. 
You would be required to either have the server respond to the misbehaving thread in a timingly manner or kill the server itself 
to kill the client. This would cause panic to anyone not familiar with QNX as my trainer noted during the session 
where clients would call for technical support. You can also see similar questions arising in forums such as [this](https://forums.openqnx.com/t/topic/37720).

It also doesn't help that the [documentation for QNX 7.1](http://www.qnx.com/developers/docs/6.6.0.update/#com.qnx.doc.neutrino.sys_arch/topic/ipc_Signal_summary.html) 
states that `SIGKILL` cannot be blocked or caught. But with `_NTO_CHF_UNBLOCK`, you could block the signal (the server creating the channel with this flag cannot ignore it though).
Perhaps it would be helpful to add an asterik to state there are some exceptions but that's just my opinion. POSIX standards from my interpretation does not state anything against 
blocking a SIGKILL. 
[The POSIX Standard (IEEE Std 1003.1-2017)](https://pubs.opengroup.org/onlinepubs/9699919799.2018edition/) states that `Kill (cannot be caught or ignored).` but nothing about being blocked.

## Conclusion

In summary, do not expect the behaviors of how signals work on Linux (or your preferred POSIX OS) to apply to all other POSIX compliant Operating Systems. QNX allows a server during channel creation 
to specify `_NTO_CHF_UNBLOCK` to prevent clients from unblocking and even blocks SIGTERM and SIGKILL.

ps: `slay` is a QNX utility to kill or send a signal to a process (Hence the title)
