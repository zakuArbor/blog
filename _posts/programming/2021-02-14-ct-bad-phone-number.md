---
layout: post
title: ct - Bad Phone Number
categories: [programming]
---

During my internship at IBM a while back, I recall encountering an error on 
some HP UNIX machine when I was trying to checkout a file using the CLI tool 
`cleartool` for the version control system `Clearcase`. 

<style>                                                                         
  iframe {                                                                      
    width: 560px;                                                               
    height: 315px;                                                              
  }                                                                             
                                                                                
  .img_50 {                                                                     
    max-width: 50%;                                                             
  }                                                                             
                                                                                
  .img_60 {                                                                     
    max-width: 60%;                                                             
  }                           
  
  .img_40 {                                                                     
    max-width: 40%;                                                             
  }                                                                             
                                                                                
  .img_33 {                                                                     
    max-width: 30%;                                                             
  }                                                                             
                                                                                
  .multiple_img_div {                                                           
    display: inline-block;                                                      
  }                                                                             
  @media only screen and (max-width: 800px) {                                   
    .img_50, .img_60, .img_40, img_33 {                                         
      max-width: 100%;                                                          
    }                                                                           
                                                                                
    .multiple_img_div {                                                         
      display: block;                                                           
    }                
    
    iframe {                                                                    
      width: 80vw;                                                              
      height: 45vw;                                                             
    }                                                                           
  }                                                                             
                                                                                
  @media                                                                        
  only screen and (-webkit-min-device-pixel-ratio: 1.5),                        
  only screen and (-o-min-device-pixel-ratio: 3/2),                             
  only screen and (min--moz-device-pixel-ratio: 1.5),                           
  only screen and (min-device-pixel-ratio: 1.5){                                
                                                                                
    html,                                                                       
    body{                                                                       
      width:100%;                                                               
      overflow-x:hidden;                                                        
    }                                                                           
                                                                                
  }                                                                             
</style>    


```bash
# ct co -nc foo.c
ct: bad phone number -- foo.c
ct: bad phone number -- -nc
ct: bad phone number -- co
```

For context, at IBM there are some departments where we still are using a 
centralized version control system developed by Atria Software in the 90s, 
now owned by IBM and maintained by both IBM and HCL (though we are 
transitioning away from Clearcase to Git. But still need to use it to 
support and develop legacy products till our customers decide to upgrade).

`cleartool` is a CLI client to Clearcase and we often use `ct` as an alias.

```bash
$ type ct
ct is an alias for cleartool
```

<h1 id = "sec2">Why does the error show up?</h1>

The error I shown above is something I found very interesting. It's not an 
error that many would ever see (though I could be wrong considering this post 
on 
[stackoverflow](https://stackoverflow.com/questions/10416063/clearcase-running-commands-from-a-script-error-bad-phone-number) 
was viewed over 3000 times in the past 8 years). An intern recently 
encountered this issue a few days ago and asked me about it. 
While I didn't have a good answer 
for them at the time, I knew `ct` was a Basic Network Utility (BNU) 
command that enables remote user on a terminal to communicate to a 
workstation via a telephone line since I encountered the same error 2 years 
ago. 

![Man page for ct](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/ct.png)

To cut the chase, the error shows up because on some users, we did not have 
`ct` to be an alias to `cleartool` so when we run `ct` on some machines with 
a particular user, we get the following:

```
$ type ct
ct is /usr/bin/ct
```

Therefore any attempts to use it as a version control will inevitably return 
`ct: bad phone number` since those options are not valid phone numbers.

<h1 id = "sec3">A brief talk about ct</h1>

Before the age of Personal PC, the average Joe did not have access to a 
computer. Mainframes were common in large organizations, research labs 
and Universities where there would be terminals that are connected to the 
mainframe. Though before UNIX and some other time sharing OS, any work done 
on the mainframe had to be done in batches. For those who do not know what 
mainframes are, they are just essentially very large computers with a large 
amount of memory and processors, often used for bulk processing such as 
commercial databases, transaction servers and applications that require 
high resiliency and agility. Computers (mainframes) in the past  were 
extremely large and would often require an entire room to fit all of its 
components (interesting to see how much technology progressed to the point 
where our smartphones are not only smaller, but also cheaper, faster, and 
more versatile).

![IBM 7090](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/7090.jpg)
<center>
IBM 7090 - An IBM Mainframe
</center>

Since Computers were not widely available, researchers and students had to 
connect to the mainframe to do their work via a terminal or a console. 
Timesharing OS such as UNIX allowed 
multiple users to use the mainframe simultaneously.

<center>                                                                        
<div style = "display: inline-block;" class = "multiple_img_div center">       
<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/TTY33ASR.jpg/220px-TTY33ASR.jpg" 
alt="A teleprinter to communicate with the mainframe" style = "float:left;"/>
<img src = "https://upload.wikimedia.org/wikipedia/commons/9/99/DEC_VT100_terminal.jpg" 
alt="A VT100 which from my understanding is a terminal that can communicate with a workstationstyle"
style = "float:right;height:188px;padding-left: 10px"/>
</div>
<p>A teletype model 33 (left) and a VT100 terminal (right)</p>
</center>

Before the internet, people would connect to networks via 
phone lines since they already exist. It's a dial-up connection similar 
to dial-up internet that was common in the 90s and early 2000s. Something I 
do not recall using as I never touched the internet till the mid-2000s (we 
upgraded to broadband by the time I got my first shared laptop). 
`ct` is one of the commands that 
allows people to have remote access to the terminal such as connecting from 
home. Though it's quite different from what I expected. To use `ct`, both 
the local system and the remote terminal needs to be connected to a modem. The 
part which was surprising to me was that the user on a local system needs to 
issue the `ct` command with the appropriate phone number to call the modem 
attached to the remote terminal and not the other way around. There are 
benefits to this as mentioned on the man page of AIX 7.2 which is for 
security whereby the machine's phone number is kept a secret and the 
remote terminal can be monitored for any suspicious activities by the 
machine operator (the local user who initiates the connection by calling `ct`) 

---

<h1>Conclusion</h1>

`ct` is a UNIX utility that allows a local machine gives access to a remote 
user via a telephone line (where both the terminal and machine need to be 
hooked to a modem). `ct` is also often used as an alias for `cleartool`, a 
CLI client to the centralized version control system Clearcase. So confusion 
can pop up randomly when you are trying to use `ct` for either purpose. 
