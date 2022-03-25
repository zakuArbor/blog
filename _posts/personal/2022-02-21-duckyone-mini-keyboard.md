---
layout: post
title: Ducky One 2 Mini - Replace Caps Lock as Function Key
description: How to set caps lock as a function key for the ducky one 2 mini keyboard and how to use caps lock still
categories: [keyboard]
---

![An image of my ducky one 2 mini keyboard with stencil filter]({{ site.url }}{{ site.baseurl}}/assets/personal/ducky-keyboard.jpg)

Last month I got interested trying out a 60% keyboard which is a keyboard that does not have a numpad, Function keys, navigation keys (i.e. page up), and arrow keys. 
During my research, I found the Ducky One 2 Mini is one of the two best 60% keyboard for Linux users.

To utilize the stripped out keys such as the arrow keys, users need to press the function key which is inconveniently on the right side of the keyboard. This makes it 
extremely uncomfortable to use the arrow keys (ijkl keys) which I use very frequently when I write. Proposed solutions I found online were unsatisfactory as they were 
not for DKON2061ST model which I have. Proposed solutions online state that you could use the dip switches to have the `Caps Lock` act as the function key. 

Luckily the manufacturer has a decent user manual on their site which explains how. 
According to the [manual](https://duckychannel.net/download/user_manual/2020/Ducky_Mecha_One2mini_2061ST_usermanual.pdf) on page 36, to replace the `Caps Lock` key 
as the function key, you first need to press `fn+alt+k` for a few seconds. Then you press the `ESC, L_Ctrl, L_Win, L_Alt, R_Alt, R_Win, Fn, R_Ctrl, and Caps lock keys` 
will all light up. Then tap the `Caps Lock` once to set the function key to `Caps Lock`. Press `ESC` to exit the programming mode.

Now that your `Caps Lock` key acts a function key, if you want to use the caps lock functionality, you will need to press `caps lock + tab` (not at the same time). 
I accidentally found out about this when I tried to write the backtick which is `CAPS LOCK + ESC` but pressed `tab` instead of `ESC`.

**Note [2021-03-25]:** It came to my attention that you will require the latest firmware for this feature to work

**Note:** I dislike how the arrow keys do not follow VIM bindings so I get confused whenever I write on any applications that have vim bindings enabled

**Note:** The cover image is an image of my keyboard but with sketch filter which I found out existed today


