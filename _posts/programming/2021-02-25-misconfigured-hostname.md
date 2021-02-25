---
layout: post
title: Misconfigured hostname
categories: [programming]
---

Reminiscing another problem I encounter during my internship at IBM, I 
encountered an issue with some internal tools during a server migration. Server 
migration is a process that is very tedious and annoying to work on because 
of all the work that needs to be done. It distracts employees from doing their 
everyday job and creates uncertainties about whether or not the new server can 
deliver all its tasks without any issues. You have to figure out what 
dependencies are needed to be installed, what tools and files need to be 
migrated, and perform a regression test on 
all the tools that the server utilizes. However, server migration is very 
critical to ensure security compliance as the hardware and Operating System 
gets outdated.

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

One particular issue out of many I would like to discuss is how a 
misconfiguration to `/etc/hosts` can cause your script to fail. After 
identifying all the dependencies that needed to be installed and migrating 
the database and webserver, we decided to 
do a simple test to see if the website does what it is supposed to do. 
To our surprise, a specific feature on the webpage failed to work. This came 
as a shock because we made no code modifications, downloaded all the 
dependencies, and all external applications such as the database were working 
fine. After much debugging, I narrow down the bug to a particular Perl script 
that was not behaving the way it should be.

---

## Side Track - Talking about the old Internet

To many modern and young web developers, it may seem very odd that a webpage 
feature failed due to a Perl program not running correctly. Before it was 
popular to make websites using some JS framework, dynamic pages could be 
rendered using a CGI (Common Gateway Interface) script or using PHP. This 
is a side tangent from the post, but I would like to inform newer developers 
that the web was very messy in the old times. There is a mash of languages 
and scripts that were used to have dynamic websites. Bash and Perl or PHP were 
quite popular when I was young as CGI languages. PHP can still be seen such as 
on WordPress. To make interactive websites such as games, Java applets and 
Flash were very common (to be run on the client-side) 
but those are now "dead" (In the sense that it reached EOL). The Web was and 
is still weird. 
I've seen and talked with people who worked on web development using many 
different languages such as Python (Flask), C#, Ruby on Rails, Coldfusion, 
and Java. This shocked me in Highschool because the books I read and worked 
with at school and at my Highschool internship were all using the LAMP stack. 
Nowadays, various Javascript frameworks are being used such as React.js or 
Vue.js as the frontend with Node.js in the backend. The rapid progress of 
technologies makes me feel very old even though it's only been a year since 
I graduated from University.

---

Anyhow, back to the main subject. Upon debugging the feature, I came across 
a Perl script where the object it created was returning null. While I cannot 
delve into what the purpose of the script was, some key values in the script 
relied on knowing which SITE the script was run on. SITE in this case refers 
to the campus the script was run on. For instance, if I ran the script in a 
machine in Aloha, then the script will know the SITE of the machine based on 
the machine's domain name which would contain the SITE's name.

How the script got the site name specifically was calling a Perl function 
`gethostbyname()` which in the Perl Doc has the following information 
(`perldoc -f gethostbyname`):
 
```perl
These routines are the same as their counterparts in the system
C library. In list context, the return values from the various
get routines are as follows:
...
my ( $name,   $aliases,  $addrtype,  $length,  @addrs ) = gethost*
```

The script grabbed the official name of the host and performed some regex to 
get the SITE. However, the script was unable to grab the SITE from `$name` 
because the full domain name (FQDN) was not being displayed. From the perldoc, 
we find that the Perl function works the same way as the one in the C library, 
so if we look at the manpages, we find that it looks at the file 
`/etc/hosts` for the hostname's information. Upon inspecting the file, I saw 
that the file did not have the FQDN which would explain the bug. The file 
looked like this
```
192.168.2.1    yukikaze    yukikaze
```
So to resolve the problem, all I needed to do was to place the full FQDN on 
the file where `aloha` would be considered the SITE of the lab.
```
192.168.2.1    yukikaze.aloha.net    yukikaze
```

**Note:** I find Blackberry QNX's documentation on `gethostbyname` to be 
very straightforward. For instance, [QNX Doc 4.25](http://www.qnx.com/developers/docs/qnx_4.25_docs/tcpip50/prog_guide/libs/hostent.html) 
directly tells you where the information is gathered from in the description:
```
This structure describes an Internet host. It contains either the information obtained from the name server, named, or broken-out fields from a line in /etc/hosts. 
```
The man pages do mention the same thing but you had to read a lot more to find 
that information.

---

<h1>Conclusion</h1>

Aside from all the random commentary in today's post, a misconfiguration to 
`/etc/hosts` may mess with your program or script if you are relying on 
`gethostbyname` function to get the FQDN.
