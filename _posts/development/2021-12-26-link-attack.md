---
layout: post                                                                    
title: "Dev Blog - Symink Attack - Do not trust config files"
description: A dev blog on a attack that could allow a malicious user to access another person's account in ProxyAuth
categories: [dev blog, programming, c/c++]                                                
---

Now that classes are over for the semester, I decided to resume work on a project I've been putting off for a while. 
ProxyAuth is a passwordless authentication module that allows lazy people like me to access their machine without inputting their passwords. 
It authenticates the user if their hardware authenticator (i.e. a smartphone) is close to the machine via Bluetooth connection. 
Currently, the implementation is not convenient and there are a lot of areas that need to be worked on such as the security of the product. 

In May of 2021, I noticed there were a lot of education sessions for the incoming new hires and interns I used to work at. I took the opportunity to have 
myself and the new interns on my team to participate in these sessions. Since I returned to the company later than when most new hires 
start, I missed out on all of the education sessions the previous year. One of these education session was a lecture on writing secure code. 
During the session, the speaker mentioned something along the lines of how files need to be sanitized and how programs can be vulnerable to 
symlink attacks. A symlink attack is when an application must perform some operation (either a read or write) on a file and does not check 
whether the file is a symbolic link or not. I have performed symbolic link attacks before in a cybersecurity course but I completely forgot 
about its existence.

ProxyAuth, the project I am working on for fun, does not check whether if the config file is a symbolic link meaning a malicious user could 
set their own smartphone as a trusted device to access another user on the machine.
A [tracker issue](https://github.com/zakuArbor/proxyAuth/issues/47) has been opened to address this vulnerability along with other possible attacks that will be 
discussed on this blog.

---

## Issue #1 - Config Directory and File Permissions are not Enforced

---

ProxyAuth checks under the directory `/etc/proxy_auth/` to find what devices are whitelisted for each user on the machine. Under the directory 
contains the whitelist for each user. For instance, for the user `zaku`, the file `/etc/proxy_auth/zaku` will contain all the bluetooth addresses 
the user wishes to use to authenticate the machine. Before considering the symlink attack, a malicious user could 
create a whitelist for another user if the directory has write permission for anyone. For instance, let's say the malicious user has the username 
`public` and another user on the machine has the username `zaku`. If the directory `/etc/proxy_auth/` has write permission for all users then `public` 
could create a whitelist for the user `zaku` with their own device as seen below:

```
[public@localhost proxy_auth]$ whoami
public
[public@localhost proxy_auth]$ ls -l /etc/ | grep proxy_auth
drwxrwxrwx. 1 root root        28 Dec 25 00:00 proxy_auth
[public@localhost proxy_auth]$ echo 31:BA:11:CD:AF:12 >> zaku
```

We'll be using a small program called `pam_test` I created for development and testing purposes. This is how the code looks like:

```c
    const char *username = "zaku";                                              
    char *detected_dev;                                                         
                                                                                
    if (bluetooth_login(log_fp, trusted_dir_path, username, &detected_dev)) {   
       printf("Welcome %s. Login via Auth Proxy.\n", username);                 
    }                                                                           
    else {                                                                      
        printf("Failed to login\n");                                                       
    }                                                                           
```

It's a simple program that will either print success or a failure if the function 
`bluetooth_login` fails to detect any bluetooth device that the user trusts. (It's currently 
implemented poorly and only checks whether or not a trusted device is currently paired with 
the machine). If it is able to log in, it'll also print `pika: <bluetooth address` from some 
function called in `bluetooth_login` for debugging purposes.

As the malicious user `public`, let's see if the malicious user can access as `zaku`:
```
[public@localhost pam]$ ./pam_test 
pika: 31:BA:11:CD:AF:12
Welcome zaku. Login via Auth Proxy.
```

Even if the directory had the correct permissions (i.e. only owner can write), 
if the user's file does not have the correct permission, the same issue will 
still occur.

---

## Mitigation #1 - Check File Permissions

---

To resolve this issue, I am going to patch the program to check 
whether or not the directory and file has the correct permissions. This is done 
via the function call `stat` (should be `lstat` but more on this later). 

To utilize the function `stat` or any of its variants, you pass the file you 
wish to inspect and the pointer to an uninitialized `struct stat`. `struct stat` is 
a structure that contains various fields about the file such as the owner and file mode 
and is populated by the function `stat`.

`st_mode` field is an unsigned int (with the macro type `mode_t`) that contains bits of 
boolean values in which you can perform binary operations to determine the type of the file 
and the file permissions. For instance, to check whether the group has write permission to the file 
you could perform an `&` (binary and) with the macro `S_IWGRP` like so:

```c
if (st->st_mode & S_IWGRP) {
  printf("Group has write permission\n");
}
```

To resolve this security flaw in ProxyAuth, I'll be checking whether the config directory 
or config file has the correct permissions by ensuring the group and other type does not 
have write permission to the files. In addition, I'll be checking whether or not the owner 
has RW (Read and Write) permission by doing some bit shifting. I could perform 
three binary and operations to check whether or not the owner RWX permission to the file but 
I wanted to shorten the code but still be understandable. While researching for a method, 
I came across a [webpage from Weber University on File Permissions](https://icarus.cs.weber.edu/~dab/cs1410/textbook/2.Core/file_access.html) and it lays out beautifully 
how to perform the operation I wanted to perform. In Linux, there are three types of owners: owner, group, and others.
Each type has 3 bits to store the type's permission on the file: 1 bit for read, 1 bit for write, and 1 bit for execute. 
For instance, 100 (binary) is 4 in decimal and means the type has read permission. I won't go into details about how 
permissions work but if you are curious on how permissions work on Linux, there are many excellent [resources online](https://icarus.cs.weber.edu/~dab/cs1410/textbook/2.Core/file_access.html).

The document I linked explains both visually and with words how to get the permission of the owner type only so take a look at it if you are confused by my explanation. The method is to shift 
the bits to the right by 6 and clear all the unneeded bits by performing a bitwise and operation with the decimal number 7. The first 9 bits in `st_mode` (from the right) contain the ACL (access control list), 
3 bits for each owner type. So shifting `st_mode` by 6 bits will remove the ACL bits for the group and other type. So the first 3 bits (from the right) will be the read, write, and execute bit for the owner. However, 
`st_mode` will still contain 7 bits of information for the file mode (i.e. the file type and attributes). To clear the bits, perform a bitwise and operation with the hexadecimal 7 (i.e. binary: 0 000 000 000 000 111) 
to clear the unneeded bits. So you are left with the 3 bits of interest. Since I desire to check if the owner has RWX permission for directories and RW permission for the config file, 
I check if `st_mode` after all those bit manipulation equals to 7 and 6 respectively (i.e. 110 (binary) means type has RW permission but to access a directory, the execute bit must be set as well).

```c
if ( ((st->st_mode >> 6) & 0x7) != 7) { //owner
    fprintf(stderr, "Error: Owner does not have RWX permission to the directory\n");
}
```

In ProxyAuth, the mitigation will be placed under a new function named `check_perm` in a new file `pam_sec.c`. I plan to place any code that deals with the security of the PAM module to be placed 
under this file from now on. Applying the correct changes to the project (with the help of Doxygen and cscope to figure out where to write the check), we can now test whether or not the security bug has been 
patched.


```
[public@localhost ~]$ ls -ld /etc/proxy_auth/
drwxrw---x. 1 root root 36 Dec 25 21:44 /etc/proxy_auth/
```

As you can see from above, the config directory and config file have the wrong permissions. Let's see if the program can detect the error:
```
[public@localhost ~]$ ./pam_test 
checking file: /etc/proxy_auth/
Error: Group has write permission to /etc/proxy_auth/
```

As desired, the program detected that the config directory has the wrong permission so the program terminates. I won't bore you with the various 
test cases and move on to the next security bug in the program.

---

## Issue #2 - File Ownership

---

Regardless if the permissions are set correctly, if the directory or file is owned by the malicious user, then the entire authentication module is useless. 
This is mostly an error on the system admin but as good programmers, we should take this into account. Files outside the user's home directory are usually owned by root. 
The same will apply to the config directory. To check if the directory is owned by root is simple. Every file has a uid that identifies who the owner is and this value is numeric. In UNIX-like 
OS, the uid of root is 0. So we can compare if the field `st_uid` of the directory is 0. But what about the config file? Should the config file be owned by root or by the user. This is where it gets 
a bit complicated. As a system administrator, you want to limit suoder privileges but that would mean the sysadmin will have to manually write the bluetooth address of every user's smartphone. This will be a 
pain to do because people can switch phones anytime they want and perhaps users want to be able to use other devices as a hardware authenticator. However, that's an issue for the future me. For now, we will restrict 
the config file to only be editable by root. (I can see myself needing to edit the permission check of the config files in the future to restrict read access to root only once I am able to figure out how to spoof my bluetooth).

```
[public@localhost ~]$ ls -l /etc/proxy_auth/zaku
-rw-r--r--. 1 public public 18 Dec 26 01:19 /etc/proxy_auth/zaku
[public@localhost ~]$ ./pam_test 
start bluetooth_login
pika: 31:BA:11:CD:AF:12
checking file: /etc/proxy_auth/
checking file: /etc/proxy_auth/zaku
Welcome zaku. Login via Auth Proxy.
```

An example of how the program will behave if the config file is not owned by root even if the file permissions are set correctly.

---

## Mitigation #2 - Compare st\_uid with the root uid

---

**Code:**

```c
if (st->st_uid != 0) {
  fprintf(stderr, "Error: %s is not owned by root\n", file);
}
```

**Setup:**

Set the config file `zaku` to be owned by the user `public`, the malicious user.

```
[public@localhost ~]$ ls -l /etc/proxy_auth/zaku
-rw-r--r--. 1 public public 18 Dec 26 01:19 /etc/proxy_auth/zaku
```

**Result:**
```
[public@localhost ~]$ ./pam_test                                                
pika: 31:BA:11:CD:AF:12                                                         
checking file: /etc/proxy_auth/                                                 
checking file: /etc/proxy_auth/zaku                                             
Error: /etc/proxy_auth/zaku is not owned by root   
```

---

## Issue #3 - Symlink Attack

---

As mentioned in the beginning, the program is vulnerable to symlinks attack. Although file ownership will not resolve a symlink attack, 
the file permission check may resolve this vulnerability. I could not figure a way to modify the link's permission on Linux. 
According to the response on [stackoverflow](https://askubuntu.com/questions/1151269/is-it-possible-to-change-the-permissions-for-the-symbolic-link), 
symlinks do not have permissions. This is further supported by the man pages (2):

```
The permissions of a symbolic link are irrelevant; the ownership
is ignored when following the link, but is checked when removal
or renaming of the link is requested and the link is in a
directory with the sticky bit (S_ISVTX) set.
```

However, for other distributions such as BSD, this may not be the case. In FreeBSD, the `-h` option for the command `chmod` states this in their manpages:

```
-h	   If	the file is a symbolic link, change the	mode of	the link it-
	     self rather than the file that the	link points to.
```

While a permission check may be sufficent for Linux, it would appear that if one was to port the project to FreeBSD, the module could be vulnerable to 
a symlink attack. Even though there are no plans to make a FreeBSD port for this project, it would be good to verify the file type of the config directory 
and the config files to avoid any unexpected behaviors.

To check whether or not the file is a link, passing `st_mode` to the macro `S_ISLNK` will return a 1 if the file is a link. This is where knowing the differences between 
`stat` and `lstat` is important. If one was to use the function `stat` rather than `lstat`, then they'll get the wrong result. According to man pages:

```
lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to. 
```

This means that `stat` will never return a non-zero value even if the file is a link. When playing around with the patch, I found that even if I do not use `lstat`, the 
program will always complain that the config file is not owned by root despite having both the link and the file it's pointing to be owned by root. This can be explained 
through the man page I posted earlier about `symlink` where it states `the ownership is ignored when following the link, but is checked when removal or renaming of the link is requested`. 
However, this is a behavior I should not rely on. Aside from doing additional checks to ensure the config directory is a directory and the config file is a regular file, [Issue #47](https://github.com/zakuArbor/proxyAuth/issues/47) 
should be resolved.

---

## Conclusion

---

To resolve the symlink attack and from a malicious user exploiting improperly configured files used by the program, adding a permission check and file ownership is sufficent. It turns out that on Linux, symbolic link
permissions and group ownership do not matter and are in fact not read (with the exception when one tries to remove or rename a link). But I decided to check for the file type to ensure the config files are not a symlink nor 
be a regular file when it should be a directory and vice versa.

This concludes my first development blog for the project ProxyAuth. Hopefully, my next dev blog would be more interesting and more concise.


