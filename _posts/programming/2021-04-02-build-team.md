---
layout: post
title: What does the Build Team Do - An Overview of Builds and DevOps
categories: [programming, build]

---

In my undergraduate in Computer Science, I got the opportunity to work at IBM as a member of the Build Infrastructure Team. I had absolutely no clue what the Build Infrastructure Team is or does. Though I am no expert and I still have a difficult time explaining what I do to friends and family, I'll try to tackle the subject to the best of my ability. This post is a precursor to an education session titled *An Overview of DevOps and Builds* I plan to give to new interns of the Build Infrastructure Team at IBM this May. I am hoping my actions of writing a blog will prepare me for my presentation. (On a side note, this is a good sequel to my previous blog about [Software Ports](https://zakuarbor.github.io/blog/software-ports/))

On my first week of joining the Build Infrastructure team, I tried to search up what a Build Team does because it was not clear to me what I will be doing. I came across a paper titled *[Understanding and Improving Software Build Teams](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/phillips-icse-2014.pdf)* which examines the various Build Teams at Microsoft. It's one of the only comprehensive pieces of  information I could find about Build Infrastructure teams at the time. Little did I know that there are tons of information about Build Teams but I did not google `Build Engineer`.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/build-paper.png)

## Disclaimer:

The information presented is from publically available sources or is not a secret to the public. Any views presented are personal and do not reflect any single company or group.

---

# Timeline

- **Overview of DevOps and Builds - From a Semi Outside Perspective**

- A Dive to the Build Process: What Goes On When You Press the Play Button

- [Internal] Version Control and Software Tracking: Git, Github, Clearcase, ClearQuest

- Build Automation Tool: Jenkins, Buildforge, and Github Actions
  
  - Buildforge will be presented internally and will not be shared to the general public

---

## What is a Build

Before we talk about what a Build team is, we first need to go to the basic question, **what is a build?**

You may recall when working on Java, C, or C++ you ran a Build by pressing Build, Run, or Play button

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/eclipse-build.png)

or you would "compile" your code on the terminal

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/gcc-build.png)

But what does this actually do? As you may know, a build is just simply the process of converting your source code (i.e. `.c` or `.java`) to a binary/executable (i.e. `.exe` or `.o`). More formally (if you accept Wikipedia as credible):

> In software development, a **build** is the process of converting **source code** files into standalone **software artifact(s)** that can be run on a computer, or the result of doing so. - Wikipedia

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/highlevel-build.png)

An executable to put it briefly is the **ready to run** form of a program (hence why we call it an **executable**). An executable consists of instructions (i.e. machine code) that consists of zeros and ones assembled in a way the CPU understands. Some common locations where executables can often be found on Unix-like Operating System (OS) under `/bin`, `/sbin`, `/usr/bin`, or `usr/local/bin`. As this is more of a brief overview about builds, I won't delve into the structure of an executable (i.e. ELF Format. Though not like I have a good understanding of the topic either). 

**Note:** If you want to have a more in-depth overview of how a build works, see my next post coming in the next few days.

## Build Tools

Build tools are simply just tools that automate the build process but can do more than simply building a program. Some common examples of Build tools are Make, CMake, Ant, Maven, and Gradle.

> **Build automation** is the process of automating the creation of a **software build** and the associated processes including: **compiling** computer **source code** into **binary code**, packagine binary code, and running **automated tests**
> -Wikipedia

![Compile](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/makefile-diablo.png)

<small>An example of a makefile from Diablo</small>

When working on a project, it quickly gets tedious to type the entire command to compile all your files, especially when there are a lot of files. I personally would rather just press the play button or write a shell script to compile a few files like the following:

```bash
gcc parser.c symbol_table.c assembler.c -o assembler
```

However, when programs get sufficiently complex and large (i.e. a couple of files with many dependencies), a **build system** is needed. A build system simplifies the process of building your code from compiling to running all your tests and perhaps generate documentation for it as well using tools such as JavaDocs or Doxygen. 

---

For more in-depth look at Build Tools, I would suggest looking at a blog post titled [What's in a Build Tool by Haoyi Li]([What's in a Build Tool?](https://www.lihaoyi.com/post/WhatsinaBuildTool.html)).
For more in-depth look at Build Systems, I suggest taking a look at [a lecture from University of Victoria](https://www.engr.uvic.ca/~seng371/labs/Lab10-ppt-371-S13-col.pdf) or from the textbook the lecture is based on titled **Software Build Systems: Principles and Experience** 

![](https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348661523l/11643362.jpg)

---

## Why Do Build Team Exists?

Build systems can get quickly complex and large such that it becomes unmanageable. Coupled with the fact that builds can take hours to build, especially with larger projects. For instance, at Microsoft, some projects can take 6 hours to build. From my experience, I've seen builds from 30mins to an entire day to build. This causes a lot of idling time for developers (you would be wrong to assume developers will be able to multi-task effectively plus the overhead of context switching was found to impact productivity and developers can forget on tasks they were working on).  

![](https://imgs.xkcd.com/comics/compiling.png)

Bugs are very common to create so a single build failure creates more delays not only in development but also **increases** uncertainty whether or not the new code changes will compile fine and pass all the tests. The health of your program becomes more murky and unhealthy. Clean and consistent builds are considered to be the healthy "heart" of software development. A good practice of software development is to catch errors as early as possible when they are still small and manageable.

Build teams were formed out of both **necessity** and **frustration** in the growing complexity of build systems. Though since Build teams were formed out of a reactionary response to the growing issue, roles are often ambiguous, especially in the early formations (i.e. Microsoft). Though I could not find much information about Build teams online, they are not uncommon in large organizations. They can be found in many companies such as Microsoft, Google, IBM, Facebook, Netflix, Mozilla, LinkedIn, Gnome, Eclipse, Qualcomm*, VMWare*

If a build team or a Build & Release team does not exist, it'll exist within some devOps team. The main tasks of the Build team from my experience and what I read is to abstract the build complexity and to be responsible for building the entire project for all supported hardware and platforms. More on this later.

## What Does the Build Team Do?

The exact role of the build teams are often found to be ambiguous and differ from each member within the team. Here are the main generalized tasks I can think of:

- monitors ci and nightly
- runs some tests and tracks down errors
  - i.e. **Build Verification Test (BVT)/Smoke Tests:** a subset of tests that verify main/critical functionalities to ensure the build is not corrupted or bad
- maintains build and infrastructure tools and environments

## What is a Nightly Build and CI Build

A **nightly build (also called daily build)** is a build that is performed at the end of the day in a **neutral** environment (an environment not used for development). The idea of building your program on a **neutral** environment is critical. I had experience with group members including myself where the code would not run on anyone's computer but you swear that the code compiles and runs fine on your machine. 

One **key** goal of a build system is that it must be **repeatable**. The project is built exactly the same way **regardless** of **who** and **where** it was built. The build must be **reproducible** such that I can move or copy the build system to a different server and can perform a build. Think of it as being able to clone a project from Github and being able to compile the program.

![Works On My Machine Ops Problem Now  Disaster Girl  Make a Meme](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXGB0YGBgYFx0VGhcXFxcXFx0aFRgaHSggHRolHhgYITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGC0lHx8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABMEAACAQMCAwYCBwUEBQoHAAABAgMABBESIQUxQQYTIlFhcYGRBxQjMqGx8EJSwdHhFXKS8SRigrK0FiUzQ0RTVHOiwhc1dISTpdL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAqEQACAgIBBAICAQQDAAAAAAAAAQIRAxIhBDFBURNhFCJxQoGR0QUyM//aAAwDAQACEQMRAD8Ad2nEJYhqEqnI6kMPamkXaCbGXXV1zGR+INLo5FDFJEDEbBgvMeR8jU68GRvtEYDb7hNdlHKFxcYMvKQL00nnn1qeTjJgVmmYKiKWY/ewoBJOBudhyqv3XCDq1KFHU8yAaCv+EuY5UdvC6MMg6gdSkY9OdDBJFqu+0cBKxSrOryZ7tDa3Ad9Iy3dqYstgbnGcdaUPe27s8cazl48d4otZy0eoEr3iiLK5AJGQMjcVZEhW4m4Vdkfcglkz5d7BGOfsTUNzGLZuNXYG7RI/v3VqcAfrrXP8jZuoJFTVFmyLdJJwoBJjjZlXUoYAtgDXpIOnmMjIqvvmRikUcrv4sosMjOmgqGEiBdSEF15gfeFdA4DF9W4XYpESg+tRqcHBIe6IYMeuc4NGW0QXj8uBjVZa29W72JMn1wij4Cpcikc0tXMLD6zHLCME5likjB0gsdJZQCcAnA32pjxDiLrIkPcThpM92rW8qtJoALaFKZbAIJwNqsH0sM8fBZY7htUzzN3bAEgL9YeVQWAwCLcad+e4363y84WrXMNydzBFMqj1mMO49cRkf7dK2DVnFRBPPI8UVvO0keNa906aNShgGLgAEgggc8Gkl07o7RyK8br95HUowzyOCNwehGxrp30f8WN7ZXSpIIrySZ5yCSraZCrocjfRoCxagDjQRvjFUz6S+JzzXai4tRbSRx6dpe+EqFyVdG0KNOdXqCTkCix0BcKsbiZWaCCWVUOCyISuRzCn9ojqFya0M7yArHHK5AYsEjd2QIQG1qqkrgnBBxvXT+AuY7HgaxsVEjR6wDgOHsriUhscwXAbfqAa94HAq8evcDGqIMfcpaZPxp7C1OUWquYxOI5DCTgS92/dk6+7/wCk06fveHnzpzYK7k6Ipn04BMcMkoBIzglFIBx0q6drODCz4G9uuNKXKlAOiScREiD4KwHwrb6JpQkF2x5K4J9hEDRsxUIeFXCuCUSdwp0tptp3AYAZUlYzhhkZHMcjQ0/EowYpwkpjfaOT6vMFk1AkKhMeGJwcAc+ldR7McPW3EsQ5vNLcH+7PNIy/gMfCqN9HlgLrhsFsx3tZ7a4XJyTG3d3Pw3aZB/cp7sNUV3jZAf7sqaCrFWhljfTIzAAKyAtkqwGkHlVol4wkSeNZ0L4RVa2nXvGJChU1RjU+/Ib4yehpfxy6M1xcTbFGuEiQkfsW0giOD/5glYf3q6D2js0lkty3/ZpRcn+6sU6/nj8KNmhao5lGwXQkyzRZZ5SskEqHSpUHRlMucugwuT4hVouuORQw6e7nUHwgvazxLqbYAvJGFBPqa3+kGAyX3DFHJi+fVVubCRh8VRqYdtJ0mtbxD/2WWF29BH9XuT/6SR8aN2GiK7w69MgJiimlEfhJSJmUMPvANjDMORC5xy51uOLRyFQnetnOQkEsjJpIDCREjLIwJAwwFStxH6rw3gkgd0jLQGXRqOpGs5ZH1hd2BbxEb770d2Uv4J+J3M0BJR4gSSrJlh3KE4YA8lAz6UbsNEaW/auzSIzEzCJSVLm0udAIbQQW7rAIbw489qYzdqIFIQi4Dtsim0uQzkBmOhTFlsBSSRy68xSXtTwl7XgVzFIVLd60mVJIxLeiReYG+GGfXzp12iP/ADpwz3n/AOHko+RhogH/AJT25UsplZEz3ji2nZYyoywkYR4RlG5DYI64oiPjsTAFUuWUjIZbO5ZSOhUiHBB8xUnFODi3suLlcBZxPOAOhe1RWz6l0Zv9qt7drkcNsmtiBpjjaX7oJiFu2yalI1a+75jlmn8jDRBFhcpKiSocpIodDgjKsAwODuMgg70ci0s4DbLHbwRpnSkSKurGrSqKBqxtnAHKmy1sZM9FRSpkVJWkpxQhC17QZrKKfOayrsVFVForAsjgt1Vjgk15AqPpIOlhzHPcdCKkaJY2AkjyM7OOY+NT/UPEJEbI6kHBHv50gNoOIfsyLoPINjY+9ExwKc4IA9tjUf1XXscMD50KlnNEcIfCeQ5imIy14zBFwcoJYu+ht5YEj7xQ2uPVCqgE5ySqivOKcdt5eED7WIyzwwI8feKW1S93Gylc5yNRB9jU8akk7DON9gDSXiEqKT4vTcYNc8sdeTojO/A04Bex3VpHCskaS290skiO2khEuDKCB1DJgg8t8Z2NQ8N7Q20nHJpRNGI1tTCHLhVdkkhZtDE4YAsRkdVNUq4VHbdFb3AP50xt+HJjkPlsKytNm7xtK2Fdqr6B+z91EJYy5uZiFDqWI/tR2yFBzjTvnyOavF72st0vbaL6xD3ckU+SJFIDobcrk5wPCZOdUe8wi6cY8qRd8gOMDJofAowbLNZcLspFvre1e1W/jmdoJyVDqspWdGSRQW0qJCm2caSCN6W/TNxSCa6t0idXaGOTvCp1Be8aIqpI21eBjjmMjzFLr2BGG6qR6gGqzfIFPhAA9BilYKB1zsjdxXNjwzTNErWTJ36u+ll7u1mgO3qXVgTgFd80J2Z7QW8nGrycSoIWj0xuzBVfR9XQlCTuMq2D1AzyrlsUSuBlVJ9QD+dNoLDOD0pktUXftH2iiuuDyp3qGVbpYtIcFisd8mkgZyR3YVsj1rTsReRQ2d+kssaMykqGdVJHcY2BOTuKrdpwwAjNWmBFAAwKpKyG6G/ZPtXBLcSO08ag2VmfE6r42+suw3PMalyOlKPorvIYgrSSJGWs7ZfG4TVo7zlqO+NXTzofiFqDhopGjYdQAc++aFj4jcJA6kgOM4fAwSfyqtBbP0ObCOMcNjkLKR3UbkkjZiFckn3JOam7c9qYUN0qTxktw6XSVdW+0D6VHP732mceh8q4zei9jikiJJV2MjENsfP5+Vb9l+3Bt17t0Dr6gE7+dKVMqMZXVHauPcQtpOKcLcXEWmJLpmIlXG6QKoY5xzOQP9X0ole0FjctxC2zDHqXQ0hkTFx3kbR6hyzpCaevIVzngfaCOdiiRqBnUQNudWy4BCEKoU5x57EChQvyKbcHTJuz0kN5YcK0ywj6m0LzpI2kgRWzxHwkdSysCcAqcg8smcD4zbHiE0wkijgdGWJyyosoj+rhmjzjUussuRsdORtikj8QtImCz93rb98Bz+PIVZX4nCiqXdFB5aiB8s0/j+xbP0VPiPGIW4BcqZ4y5nkwDIpYr9fJGBnONOMemKsvaDi9seJ8OcTwlVMwZhIuF1QSY1HOBn1oftOI5I02B8WQR7dCKHtYFCDbO3Xej4/sNwriXamCSDjEJniyiOI/GvjSS0UjRv4vtO8G3lipFe2uLCyj+uW0ZjWNyshWRW/0d4ikiCRD/wBZq57FBtQa2ysVyoODkD19KtEMYIAVAB6Cmsf2L5PoG4FL3kMT5U+AboMIemUGThfIZPvTbNQyOEUbb/wqNboGtUZWE1q4yK8EoNYTypgDH0rKySEEk5rKYFRk40+QJIiQR7fGtluQmDCdOeYbqfI1jXy6RhC/n6e1AOzucldI9s/Aikwof2nEf3xo/wBXmPgaJuOJDSDjw+fOqVLBIxYhjv06A+xrz67IF0vsR5dalzotY2xxe8dwxI/lVb4jemRgSM+1EwTBjgrqHniipbOJBttmvPz9VT1PX6Xof62xPbLuQPenXDHztn3pasLBjjrRNtGQc1nDLVWbZsO16jXia5XGBVTaywSTuataxahnUPbyoC+tdPxol1EZOiIdLOMbYn1gCk16Ax2FPmt87YoO+scNgCj5ldMr8Z1YvtIgOlWGzRWXGcGh1tVVN8aq8jBB2FbY8ilycfUYXB0HLIV2Ybipo74bUvmmyN9jUCy451umcuo9W6yap/bTjuoGBMn0AwVxuSaYXnESCscW8jfd8vc0RfcE7uPEUJlmlUa3PTqdzyFX3JUnB2il8EniNvMZBJI68gG0hV8/Xesh4WZYPAmpyNWwGQo86cxcAuHkMfcIjFRyOBgedWLhvYGdYy0sxQkacR7DHqaSXFFSyXO2yrfRtb4lfUzLkYxoyDg/vdK6KmVj9mIGTnkaAteDCGNVDbIeeNzg5ol5cwocfeY/mauKrgyyS2dlZ7Z3YdQUMZ0uNQ5tq6fClfGr6R5WONYEQDIRnRkb4FWduGQ953hjXV5460Pf8Igd+8bKtyJDacj1olA0x5lFJUF8Cuw9rABnAB50+tJs7eX4VX45o00quAq8hU0PE41/Q+fOp2S4slpybdFjhm0sD5GmNvxhgAuBnVjc4AGedUt+MoRsCfff8Rmlk3G5skAoo6jO/wAiKe6JeNnR+McdjDHDqSvQHPKl8HH42kBZCCdg4O3Inf5Vz88TJ5jI88g/wqeC+DDTn1x+FHyDWNHRkugWwkwyf2W+e1GW0z76gMeanP4VSOE3qCRWbGx/9uKnZHV1MZfDc2U5AJPIirUrE4Fsa+XO4b5GvaScQ4hKsjKJMAf6uegrKqyKC7WxC5JB/pUiJGvWjEszjwkn8fxoW4tCDjTuKxyZYx4OjFgcgW6tlcHT4fUc6rUjjX3ROT1NXRuEssevJ1Hp6Ul/5OS98JNGzb52/nXn5Org+zPQwYUu7Rpw+1CfdqK/tix8Xlt6VZYrBox93f8AKo3tGY40b9dq8vf93I9NZoNV4Edtwvwg5zWXdh9hI3Lwn9CrCbZh4VWtpuH/AOiyhuZU7eW1J5vN+TOWZJceTknZm3dryMam0k7jUcHCk710m44TrbAFUrsvGVvI9up+ZBrsVtAAM1XWTayLX0YyyvDEqdv2fCsCw2pP2niRH2HSugX1xGikuwUeZOKp3HJIrhNUPj36b1yYpylk/Y06fPObtr/RQJnJfNFQuc70bdcLKDUcDPTrQgBFe5immuDHNje1sllXVWsluuMYqWNhW97aal8LFeuVrojI4pwB+AcLEcoYb75ydz7b1ZeIcYeIDSiMuMMSwBHrg1z7gsxnn7pXO2ckknGKbcS4WIiMnIPM7DT+ddMXwcc40x/xTituCkolXWvMLuSDzG1AXfajS+VmeSM7ldGMexquSmMyIA3hJIJB2PxxW3G7NCpSAqZQQcM3Trzqm3RKimxjxDt7CoKGOTOOeAQM0JZ9tbdkjRi+oHfw0DFbyLaSxaY2mlK4wQQoU5NecL4akIyyq8vXGyr8f41Lm0Usafks4vQ4yMgeZ2/HpQsk6YyW28+Q+B60quLt28KDW3njwL7A4z78veg7mNRvPKM/u5/gBtWbm5FKCiE3fG4hnHi9vCPietJ5+NOc6NK425bnn+0fatWmib7qZ8iw5eoB5ederajY+XT35k/hihDI4LicnPhI8yMn51PJPKc4bBHMYGOXxqZQN8D5VIr9f15/r2pgJrm5mQ6hkHzHX4daYWHFO8G4AYDJxtnHUY/KjFKtlSARjl6Y6fr+NB3HDgDqXY8xj8D+vWkAwF6RghufxB/kf1zppw3tAyHZipHkdviORHpVSuJiu+PC33h0z19unvUKXWMHPh8/L3z0o7Adft+0khUErG3rlRn4E5rK5V3rdDt6Hb4VlXsyNEdFsPpUgXw6WHmT/KsuPpYQlQgGx54JJrlfB+H95MitvqbH4Zra7tWSV4wpGMsP7oNc0oRTtnVCUp8I6u/0nl1YeHfb7p29t6g4H9IRiBRw0q6iVPVc9N+lUbjXCEj4fBOCe8kfBOemGOMfCoOzdqTDI5OdJ2rm/Hw5otamkm8T1fK7l6u/pIue+bQvg2wCOvzou5+kaYD7NAMjctzz6Ck/ZNEZW1qCfWjOJcHiLIMYzgZB8zWbwYIvVx7HVrKcdlX+Bhw76Q5XYBlUevPfzq4R8fia2LysEByM9D6iqrL2GiiJzqIIGkg45/1qndrOFz25VHfUmCVwTgee3nULp8ef/wA1SRnNxilt38UOo+M2ltdLJ3utVOdufIirrF2rkuQPqyhVbk8nr1VB/Eivnu41E014S1yhQwu+oHKqMnf+7y61XU9KpRu+V5ZWOaySuUbOzvw1ZJitxKZGGMajsP7qjYUzt47eDKakTbK5wM+1cUvOMXiSnvn8fUH+lM7Ltk2krIiuDy/1fauH8DK0v2v+Dpc4v9dq+joD8AnkUyPp25b5yPSlVxwGQpqXBOcYHOpeB9uAYTCy/skK24+Bqv8A9tTqBiTl1Xr710YVlX6+hOT5c/7DTh/Z+aXKqhyOZ5AH1pnYdkrhTh1GPfNAcN7R3ir4SMHzApzYdspwR3iqR1wCDj51rJ512OaUrfFCHtL2NuYxqgZV67DB/wAQrn94brvG7wuTjBxuPhXa+NdqUZNKfdI3LbfAVzrizkI7ReJz0zjGa7enyTlD9lycrxK1txZTRZTEYCSYHIdKCJYuVIbXnBBO9XbszNIkR79tySRuTsaTXdqiTNOCTnOAfMnGf10rpfCs53FbUmS2aCIaF+8Rl28uuP17mtpLxVG5wvQftN8PKldxdFRgbkn5nzP66VBBCWOWOT8/nWZQdNxKRhhfAvn1/wA/aoYbDJBbO56/mfX8qNtrLOD5cvSmH1bAB6nl+vKiy9LAIbfnj/Ll/KsuFwB6fz/X4U2htMc6B4kmGx+v1miwcaQuEu/6+FTBhy89/l+hS+8fSa8gudx+ue38aqzMML7Z6jce3l+vKiVufPyyPngj570s7/bny/qK9SX7h9SPnmkAXdbHUOX7X/8AQ/XWl1zZ4JaPrzU8s+lTd/jI8vyO/wDT40Olxjw9By9j/n+VNMQMt9p2IYY6bH8ayp/rCnmB8ayqpBY67MW5+tRnHIk/+k1F2knlluWdAAAndnHXcn+I+VZ2Ly0yEg5Ct+W1aT8PlyT3L7nyrOUVJptFRyOCaT7m/GFmaGCI7oi5AxyO/X4047O2pWwlOMZakd7FJqxh8ADAwdqu/ZKxMlm0bZGWOc8+frRCGosmTbkQpJNFayTRqfvBc89zgfxp5wGHv4bdnm+0ckMMY0DOBn15Ur7WtNbItsD9k5LH1Iwd6W9mb8uxiBGpuWfMVU+jcoOd82bQ6zVqHii4dte0TW6d276iQUUjY7bahVPbtXPNEsM8iuAw0nThiPU0n7WTvLcmNmyyeHbkOtQPAAqYzqUj471y4MfxQryzTPlWSXHZFqtODhpVBGxP8M10bsVwuNEDpGAdA1HmTgmqdw6c94gK4OMn/DV27G8XgVGRptTEeEEacbbqPXNcX/Ixk8SS9m2GfEq+jmfaO3727mYY3c/ht/ClZtQD7Uw4mCZpCoONbfmahe3bHnvXXiTUEvoMjWzLJw62UiNs7Bcmq/xi8WJS2M77Cug8PurVFQ6shUAIx18q5J2uuvtABsuScfHYGsulTlN2jXqsiUFRceDcSMlqGGx5fjVrt7e37tQ50yFc885251zLsxxD7JlJ21DA96srKpbIfcAbdcmujNjuua5OfBNc/wAEl3ckrpPLNTcCuEGvWygY6jPypFxKUjOP3jSO8v2XA7wpnbAGdVdUf1OSb3Qzgu2LSZJK6jp9s9KE4rMMjPQch7EUXYHEZyhcnljofOkt9N4jgZJOw5nnj4CjIycfkijXJz8Dvy9CefwFWHhllkZ6fh8KV8Lti7AZz5+Q9quMYAAUb4+QrJs1jEiS3AwT8B5+lEG16nn+A9BUsSAHJ5+fkPIeX9KnkO1CRdgDsNvPl8RSHjbbq3rj2NM75j0/WKQ8Ym1LnqDSAD4qMjV58/eq+lwVOP1+v5VY5DqHv/Kq7xO3wfb8qqLM5IIE43Pw+ZrdZvAvufzFKUlo+BvCP1zzVGZNez6XHt/H+lDyzY+BI/l+FC3smT7f0NaNJ/D8sfwpiCmY52yR51lBCQ1lHIF0+j45n8b4AHU4rpYjj6Sj08VVifsvbR/9JcAeigZoO6ayhQtEZGlUZUkbZ9RyrKOZSlSJeOSRcpoFGCz6SeWrbPtRvDWxqGoNVP4fMnEolEk4Eo5DTgA+VBXfDbq1bSWIzyIJIPtVPLFSoHBruMPpOAxCx5ZIzS76O41Uyvgcx4j0+NDXZlkC94xYZ2zURSQKY1JCNzA611PJWJGKX7iXtBD3d3IxYHvCWXBzgeprzhzjvF8JfBBwDnODSbi0OmVgOQ2pj2UgbUzqSCBjI9a5pLybxZ1S0sy8gfkSOXlkUvuOycifclbOfhS604rcRsCDn0Io2TtPcbHSu3vUvVqmXHJKLuLNB2fnjXX3gHoVzvUEjzR8yh9NPOp7ntNPIgUouAc5FB/2tLnOgGncRbyGvC5GlQ+EZ57elULtUwExyOdXDh3Gni1ju9mG2/Imqb2jjZiCRvVQ1vgJTbQ4+jy0iLMxPiBGB0x/OuiiCM/sj5Vybs3NLGGCjBODnyq32/HWAGpCSOZpT79wRN2tgVdGkYzk0u4PNGsMolTUx2XYEg1vxHiAkIOG2FQ8MK4Os82G2OlaRa9kO+wL3pRBvgnl5b7fx/CkM+AxC558+uP61euNwW7NnC4jjZj5lttIHyb5iudF8uPMn8Kifc0hRbuz0eFH651YY1pNwIYQU3EwqEjYKC147UObsVobkGqAju1qvcRtM5wOdWBgD1rT6rn2pNDsp9orH7PByPyqPiNjIRuD8hVn4hw3BDrzFRTnUm/OlXJJzhkxRMUm3w/hU/EYvE3v/L+dBA4q7syqmeT881HUko2BqOmiWZXteYrKYi+R3Z655eVa3kzFD1JGNqeHjUgGO7QHl92orftBMdtCf4RWFRL57lX4MZIuQIyeeK6P2e48sydxcDI5BscvjSg9oZSdPdr/AIRW39st+6AfQConCMv5KU5Nk/Hezs0bDThkJyG9PXFAXqyRnGgtttpGfypvwjtS8OFl+0U79NhT9b9Jxqt5UU/uuooWeoqGTx5J+PnaPk45dWEjOz/VpcnP7BwfwppwW1kRTi3kQnoVP8q6FMeJD7vdH2xUXfcS6xjPppxVPLja7iUZIqZEo3KuMf6p/lXkkkh8x7irI1zxIA6oz8FBoWea7wdSN/8Aj/lS2h4ZdPyJI3kx/TnWwV+in5Ua5mA3Bz7Y/hUclxIP2j7U7iPUhOv90/KlHaGA6QSCADucU8+tsQPEaHaQn7zEgee9NSSdicAPgsBCatBOqmiRt+5ihDNpICscVsLhj1b50203YlAJUsNu7PvWNnnoOM88UKs5OMFj86IKSMPCHxj1/X+dTaHqIeNAAFznUeQ6eW/tVcz9pjr/AJVZO0ELrIsbDBUZPp+sGquh+1HufxzVx5HIsdtxJoxjp70zsuJh+tVZLJ2kGrYEZzzqISywy8iQD5bFfT4VWvFhvTovM02BmlVxxIjkasdzwwmPPpVVvLJs4A3pF2DtxNs/e/Gj7O/bz/GlFlZM5ONIx1Izn15jahZrsxOUZACD95fCT1BxyqteCHOnRe7fiZYYYZrSZdjjkfzqr2PFzt1HnyPx/pT61utQ5VJXcrXEId5Pf81H9aUNH8iB+VWTiSfan1XPyz/MUm7vw+23y2oE0Lz61FRcifz+FCkVaMpKmeg1lZWUCOqXl3C+DC2QeeRy9KA7nng4qSKNQMAYqQYrX4o+jN5GQpDg5zn3rHhJ/aogAVm1Hxx9C+SXsG+rjzrRrcfvEexxRuBXmBR8cfQby9kCmQfdmkHxokX9yOU7fHetdqzUPOoeDG+8RrJL2Erxy9HKUH3FTJ2qvR+4aA1CvM+lQ+kxPwV80l5GY7Z3PWJD8a3btjJ/3Cn5UoYjyrXWPKo/CxjWeQ2Pa9v/AAy/IVG/bA/+GHyFKmb0qJrgeVL8KHtjWdjKTtYT/wBlX5Ch37VTfs2q/Kgmm9KhedulL8OPspZvoLPae76QKvwFaScavWBBZFHUDqKDe5atWuDTXTxXgbyX2FvEblmdixJIHMnqdv50kbYg0xnOWY+ZP4f50OsOoqPNgPmcfxqlwV3L5ZcJLIpwOQ2xRltwIlgCOuw/pT7h6AKBTbhqrqLH2H8aEaNA95aYQL6Ugk4WCatnEJARhdzSjBU71ZNFYuuEurbD4gUG/Ae8OWQHyyBtXQVjBrYW6jpSK7lSsOy6j7yj5Uwk4XGi7AA07kkx0pbdPmgKKJ2gQCYf3W/DSf4UiMfMerfn/WnvadvtV9m/I0mAyWP+sfzNQNi94+noR8gD+vel8i4Jps33vY/r9elLJVOaqJjJEVZW2BXtUTR0PFeio81mqug5SXFbCoQ9elvWgCbNe6qE73esklUAsTsBk/CgYXmvc0/j+jziRi73uogcZETTES454I0aA3pr+NCdnuyd3exGaBIwgYoRI5jcMuNQK6DggnHPmDU7IerFJx0rUSUzl7NXq3SWZt/tnUuvjHdmMc3Mg5AHAIxnJGxyKm7R9kLyzjEs6RGPUqlopC+hnIVdYZEOCSBkZ3I5UbINWKA1YWozs9wC5vGkS3EZMaqza3KbSFwMYU5+434VNxns1e2rwpNEo7+VYY2WTUhlkYAKxwGXmTnTyU+1FoKYpkc1F3nmMVauIdg+IwxtIYkcKCSI5dTYG5wrKuT6A5pf2b7M3V+rPbrH3SnHeSuY1ZsA4TSjFsAjJwBvzO+DZBqxIVPTlUMkDHlTx+y12t2tk0arO41L9p9myBXbUr6ckeBhgqDn3zRXG+xfELWJp5IkaNBqcxyayqjmxUqpIHM4ztRaDVlRkgYdKh0HNWgcHn+pC/Kp9XLaM6/Hnvu4zo04xq9eXyo/hvYO+uoVnhWHQ4JXVKVOxK7gIccvOk2hpM5vImx9z+IzUSrpAI5gg/EDP54q9cH+j29u0kaEQ4SVojrkIPeRkBsYQ5X1qPgf0e31zA0saw6Vd0OuUqdUbFW2CHbIIG9Y0b7DKHig7tWB2IyPjvWfXZApdTt5VXuyNpLdMlrEFLtlk1tpGkKXOSAfL8RVq4TwW7aO6zEg+qOyS5kwcous6PDuCpBB2zmlRs5oSSdpJY22Gr0zii37QNMAFU6jz2wB7nlTDgnY27vI/rEMUQifdDNI0bOB+0qrG+FPQnGfbBO/A+z9zNLPAkSLLblRKrvp0mQMVK4U6lIGQfIj2p0DyInsOI7YPOjGvhVeNjcmxPEhGBAuSQX+0wsndnw6ccwTz5UyvOzV8klvEwi1XBZY8SnGUjaU6jo2GF6Z3Io5Gpx9k0vEB50BcXuaD4zZTW0xgmChwqsdDaxhs43IG+xoDUc0F8NWhbx9syr8f90/zpYv3ST5sfxNG8QOZB7En5jFByjCD1/jvUEsXSHf41FIOe+amMecmhGj3wP0BQkQ3RC6gHFZWsjbmsqzOy7l28qwE1G2fKvEc9RXQcpLt5k15p9D86jaQ9AKxpsdaAN8egoiwP2sQxsZYxy85FoQzfGsiuSpDKMsjBxnkSpDAfMUmNHf5/8A55F/9BL/AMRb0p4BZd7YcUi70Q6728XvTsI8ykauY5e4rxe2fCmmTiJuSrrbtD3BQ9543SQjRjUWygGR4d+fWqrZdqrc8K4hFIxWe4luJFi0M3/TnWq6gunO+OeNjWVGtj7j/byytuJ2rGZZI0glhmkQhxGZXhZSdOcnMO4GSA2TQv0gW1xHZs9rLHLw+aTvZMAM6NNcCbWkgOGiMjeWVB68xUuwnaGKzvkmmyImjeJiAW0a2jYMVG+nMYBwNtVWrtH2k4fFYXVvbXP1mS6lkkAXxCMzya2ywGFVckgE5Jp1TFdo9+hJcT3v/lwf79zW/F7qCC34VYC7S6mS+tizKwc6RNnW+GbSMsFGTvSj6Le0VtaTXLXEndiRIQh0s2SjTlvuKcY1Lz86pnZ+6WJ7NnOkRy2zvsThUliZiQBnYAn4U2uRJ8H0Jct3U91OrGZhbxf6MmNY0NcEMAzAePUVHLPdHc8hzHhQ09klwf8ArV3HX/nFR+VWe17dcPF/cTGf7N7e3RW7uTBaOS7LD7nQSIf9qqf2E4zZScJ/sy8mNuQyuHIwGXvVuNmIwGDgqVO+OVSUX3tCB/bfDD17u5/CP+tb8bzBb8WlRvrLPqJhUjMP+jIhVgW8h3hAGSDsCedV4l23tZeM2swZvq1ukqmXQ+GeRGzpAXUVGEGrGCTTHifa7hkMV88E0ks10C2jupMd53IhUAmMBVwoyWPU+1MBTKoPZZR077H/AOyNPuGcPabgMESXf1Q7Ym1FcBZmOMh1PixjmOdIezPG+GPwiOxvZ2jOt2cKkmQRdPMhDBCP3T8aNh45waTh62M10wjV2xhZA2lJ2aMlu76jSeXWgQx+iK50cNkkY5xOxJyTnKxZbJJJJznOatXDoEhWa3XprnP/ANzNcSfgQa5XwvtNZwcK4jbJO3eNLc/VwUcs6HaJs6MZIA54qyWH0g2LXV47TYRooUjPdyHVpSVmxhOjSYpDKR9DyL9ftSAM923y7lq7FxawSOG/kT/ro2Z/76QGIn/Cij4GuIfRneR2t5byzsURUYMdLNgmIjcKCee1Xz/4g2ZTiUTzHxs/1b7OT7RZLdBpUac57wPz/eFNqhJ2GRj/AELs9/5lt/wMtMeGT6eP3cf/AHlpC/v3TlT8u8HzpNwHi9m9pYxXMrQS2BQ6SpxIYYnhBVsEMrK2fDuDtQVnx9Dxg37CRIHRoF+zct3YRGDuiqWUM8ZwCORXOOVIqix3XDQvBZbNfvtaTMq+Z3b/AHnX50P2wnI4zwdAdkMxP+3H3a/kaEuO2EH9rJJqf6oLRoi3cyY715Q+NOjVjTGN8Y8QFJe0fHoJ+LQTrLItvGsY7xY2BVgbhiVVkJO7Rg+EjegEmB/SK+eJ3HoI1+USt/7qrU0gApj2ouYpLueSKV5Vcqe8ddJYiKNTtoTYYxsOlJJMtyG1Q2dWP/qhfcNksfPwj+f40PONR9KIZRkfP3znAHwzWpFSKQDcDbApbNhfc9fIUzl/GkkxOoj13+FOJlJkZFZXhr2rIL2TUD6aDMp861LmtznJy3PesRl60OWrNVABonUdKz60PKhUlxWhbfIoAK71jWpc9TQ/eHzrzVQBK0lZrHrUYxW5K0hm2sVnfegqLXnpW5joAI+tDT11fhUa3LChtVEArjPP0oA1a5bzrBM3nUZavA9AEqr51MbXyNDGU1sHbBOf16UASCD1qWIBTzGKCzW7xEAN0PKmAd9bUedY1yhx4ckcjil1e0UCZcbPi5ddjv1HX/KjI781Ro2IOQSD6UdZ38wYnWWH7ux+W2azlE6YZuOSzyOTQsq14s/2iiUsqftY2I25bDPP0rJYLJzlndRpbY62OSsZUqQNiGZxuCMIPPJjg1cgGa4jHNgfQb/lQU15nOBt5n+QpxeR2LF2ViDoyqhWUd4AwIAA0gfcx0OXzjbGXENiurSWkOnYDWg1BZSAMqSAzLENzt3jeWyaFuIMjy3/ADrcRZ/pVhjsLLPhLv4nwMMCQGfQD4eRXu+WD97PTDROBRFXKLIMDw6g370gz93O6iNjt+0wG/JaNhsijy2+1I72z0uW6H866dxDs9GIidEjMEyQhO7YU4O22+rGOYG5Bqv9peFQxlRCdtJJyxYjxsFJ1DIOkKSPM7bYp6tEtplNW3AG4361lbSBsn+RrKVMkZeVaVlZXScplYaysoA9SvDWVlAHjV6lZWUDNhyrROle1lIEYK2zXlZQB6BXuK8rKAPa8rKygDK9WvKygDBWGsrKYHorZedZWUCJYedWXspGNbHAyORxuPasrKC4nnEt3BPX+dC3ArKysJdzs8AbCpoB+YrKyhdwL1wmJQqkAA+YGKe2o3Pw/KsrK7IGbMk+6fb+Fc/jiVg2pQdzzGfOsrKnL4EgKW1jyfAv+EVlZWVmI//Z)

Anyhow, back to the topic of **nightly builds**. Nightly builds can contain more extensive testing (regression, QA, and integration) and build coverage and can produce an image/installer/executable which can be used for deployment or further testing. When performing these builds, it may be a good idea to perform a clean build since some files may not be recompiled (for some unexplainable reason) or the generated files may be "corrupted".

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/firefox-nightly.png)

<small>An example of nightly builds that gets released to the public every single day</small>

**CI (Continuous Integrated) Builds** are builds that merge all work done by developers several times a day. The idea of CI builds is to build **frequently**. Although the frequency varies depending on company and project, CI builds can vary from a few times a day to every single code change that gets committed or merged.

**Example:** Open Source Project Docker Compose: [Overview of Docker Compose](https://docs.docker.com/compose/)

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/docker-compose-github.png)

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/docker-compose-ci.png)

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/docker-compose-jenkins.png)

The Docker team runs the CI pipeline before each PR gets merged. Though I could be wrong, you can take a look at their Jenkins server which is publically accessible:[Docker Compose Jenkins Link](https://ci-next.docker.com/public/job/compose/job/master/) and see for yourself (I didn't bother to take a close look).

## Findings From Microsoft About Build Teams

![](https://imgs.xkcd.com/comics/tools.png)

From the paper I linked at the start of the blog, I will like to present some findings the researchers found along with some minor commentary (I don't wish to disclose too many details from my experience as I am still employed and wouldn't want to risk being in odd terms):

### Role Ambiguity

Since Build members' roles are emerged and molded to fit the changing needs of their organization, the roles of the builders are hard to define. Each member's role can also differ from the other within the same team. The role of a builder can also differ from organizations and departments. One of the ambiguities stems from their tasks that overlap with other teams. An example the paper gives is the following:

> For example, coordinating code flow (i.e., source code integrations) between teams is a project management task; maintaining a build system a development task; and testing falls in the domain of quality assurance.
> 
> -Understanding and Improving Software Build Teams

Another thing that was noted in the paper was that builders were described as "generalist" or a jack of all trades. Therefore builders perform many different types of tasks but are **likely not to perform** as well as others who specialize in these tasks. **[input personal experience when permitted]**. 

Another finding from the paper notes that

> can be abused, especially on smaller teams” (P2), where builders will likely to do a variety of tasks outside of the build-space
> -Understanding and Improving Software Build Teams

This finding is interesting and I can see this being applicable in some forms to my workplace. Due to the ambiguity of the tasks between various teams and the fact that other teams may not want to deal with legacy stuff, they may be dumping tasks that could be shared or simply do not make much sense to dump the work to us. Though other teams also work on tasks that encroach our domain as well so it can be quite confusing.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/build-ms-survey.png)

### Job Satisfication

Due to the job ambiguity and other factors which I'll get to, it is found that job satisfaction in the Build team was found to be low at Microsoft. I am not too surprised by this finding. When things are ambiguous and never confident in your tasks, it could take a toll on your self-confidence and satisfaction. I definitely do not see myself working in the build team forever and will probably leave or transfer to do something new one day. This can be a particular problem where experienced builders leave which goes to the next point, the knowledge sharing within the Build Team.

### Intragroup Knowledge

Based on the findings, Microsoft faces similar issues found at the company I work at. There are great concerns about the speed at which knowledge is transferred. I've been worried about this particular problem for a while after working with a few new hires and interns who lost the benefit of in-person learning due to both the pandemic and the loss of a member. I notice there is a big knowledge gap between those who were previously interns at the team versus those who are new to the team even after they settled in the team for over a year. I think due to the nature and the breadth of tasks the job entails, it is extremely difficult to teach new hires the job in a short amount of time. Build systems can get very complex quickly and there is a lot of different tasks and solutions. Going through every single task will not be helpful to the team without first getting some experience with the build system and familiarize themselves with the ecosystem. However, the process of getting familiar with the ecosystem is a big task in itself. The reason why there is a big knowledge gap between former interns and new hires is the exposure and the differences in expectations and roles.

One thing I found particularly funny from the paper is the idea of **tribal knowledge**. The paper refers to **tribal knowledge** as the undocumented build experiences and is one of the most useful and frequently accessed sources of information. However, this causes issues because it means there will be an inherited knowledge gap between those who are experienced and those who are new to the team. Coupled with the usage of automation tools can cause the builder to be completely lost when senior builders are busy or leave the company. 

> “As awesome as automation is, it isolates the builder from the easy tasks that help them understand the build process...when the senior builder moves on and the difficult tasks break, the rookie is at a huge disadvantage while they try to gain tribal knowledge.”
> 
> -Understanding and Improving Build Teams

Knowledge sharing and the type of work the job entails makes it hard for new builders to start working within their first month or two. I've seen two views on how fast a developer can start contributing to the company. Some companies I was interviewed for were optimistic and expected developers to start contributing code within 2-4 weeks of joining the company while others view that it takes about 4 months for new hires to make any meaningful contribution. Although the expectations companies have between students and those who graduated from school differ a lot, most of my friends and I agree that you cannot really make much of an impact within 4 months of joining the company. Even my interview at Tim Hortons taught me that much. I was flatly rejected the job in the first minute of my interview upon learning that I was a student from a University over 400km away and just wanted a summer job. The interview was nonetheless enjoyable and I learned a lot from the interviewer on how much time, risks and costs the manager makes when hiring new employees. The same is true in the Build Team. It takes a long time to even get a builder started.

> new build team members need “about three months of experience before they can confidently manage the build process on their own.”
> 
> -Understanding and Improving Build Teams

One of the key points I read from various papers and books is the importance to avoid making the build process **a black box**. Automation is a blessing and a curse at the same time. Automation makes life easier and more productive but it abstracts a lot of details builders need to know. Changes to the build process by non-build gurus can result in complex and messy build configurations whereby bad dependencies can cause builds to fail or slow down compilation. While I never worked with changes to the build process itself, I worked with the infrastructure to have the builds be kicked off automatically to all the inter and intra processes that go on during builds outside of the domain of writing the rules of what components needs to be built or how they link together. It's hard to explain but there is a lot that goes on than simply running the makefile in a build system.

When the build system seems like a **black box**, it reduces confidence and increases time spent on debugging and finding information on how and what tools are being used to interact with a certain task and why the error came to be. I personally found it very useful listening to an advice a senior intern once told me which was to traverse and read various scripts that seems related to the build process and randomly spend time reading any documentation that may exist (if it does) on various means of source such as multiple sources of internal documentation (i.e. you may have more than one internal wiki and there may be internal websites people made that are long forgotten) and reading email and slack history. Although I do not understand most of the material I read, it does help me identify areas of where to look instead of being completely lost.

The paper suggests an approach to solving role ambiguity is to split the team into build operators and build engineers and split all the remaining tasks based on whether they primarily involve management or development duties. For context, **build operators** manage the build operations and team coordination. This means they are responsible for kicking off builds, monitoring the builds and communicate between teams of build breaks and working with the developers. Meanwhile, build engineers are responsible for creating and maintaining the build automation and tools. This suggestion is followed at the company I work in whereby the interns are the build operators and the full-timers are the build engineers. However, with a growing number of legacy systems and the restriction of resources, I find that both build engineers" and build operators are spending a lot of time resolving environment issues and trying to adapt legacy systems such that it meets security compliance.

In the topic of creating build tools, it is hard for "build engineers" to create and maintain automation tools without first having the experience of being a build operator. As a build operator, you are more exposed to the tools that exist and the limitations or the frustrations of the tool itself. Meanwhile, "build engineers" have little experience in utilizing the tools itself and would be unaware of all the tools that exists. 

The biggest difference between interns and full time employees is the mentorship experience. All interns learn from the previous interns for 4 months on how to perform their tasks by working with them side by side. There is an inherent difference in knowledge sharing between new interns and new members of the Build team at my company. There is no great solution to the problem because it is completely **unfeasible** to have full-time employees to be mentored constantly by a senior member.  Learning how to perform some tasks when the need for the knowledge isn't needed is a problem as well. While it gives some exposure, it is not likely for new hires to retain the information nor understand the task itself.

**Proposed Solution:** If we were to take a look at the common sources of information builders to utilize at Microsoft, we find that tribal knowledge was used very frequently and was seen as a very useful source of information. This is a great concern because it fosters the need to rely on senior builders to pass the information in a very slow and timely manner, it causes severe knowledge gap and would be very devastating if the senior builder were to leave the team or company. I think this is the issue at my company whereby all of the current members of the Build team were given some black box and we are trying to figure out how the system works. The senior builders have all left and we are not given the advantage of learning from the builders who wrote all the tools and infrastructure since they no longer work at the company.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/build-ms-info-src.png)

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/build-ms-experience.png)

One way to facilitate knowledge sharing is to hold monthly education session whereby various members of the team take turns as a group or as individuals to study various parts about the Build System within or even outside the company and share with the team. Furthermore, the need to write documentation should be emphasized more. The documentation can be in any form, video or written. But documentation is also ineffective if no one knows about it so there needs to be some consideration on how to consolidate and expose all the documentation that exists into categories so that it can be quick to find the documentation. Lastly, perhaps the team should work on a side project to make a build simulator. This will be extremely hard and time-consuming but if builders are able to create a simulator that is isolated from production environments, senior builders can guide through new builders on how to do the tasks and give new builders the opportunity to practice various scenarios and tasks they do not perform before or at a regular basis. The simulator should be designed to be simple (because the actual build system and project can be way too complex) and isolated such that builders can simulate various tools without having the tool fail on them because of a dependency issue or a flaw in the tool itself. The reason why I really like the idea of creating a simulator is that new builders can be exposed, practice, and understand conceptually various tasks that exist rather than being taught and to never use it till the situation arises and it would be lost in their memory.

---

# Side Note - Software Platforms

I mention it before, builders are responsible for the states of the builds on all supported platforms. Any change a developer makes cannot break any of the platforms whether it be a different operating system or different hardware. For instance, Counterstrike Global Offensive supports all three major operating systems: Linux, MacOS, and Windows.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/csgo.png) 

If we were to look at the game requirements, we find that there are different requirements depending on the Operating System. For instance, on Windows we can see Direct X library is required but on Linux you need OpenGL and OpenAL libraries instead. DirectX is a graphics and sound library commonly used by PC Games and only exists on Windows. Any code running DirectX on Linux without some sort of emulator or translator will break. The installer for DirectX or any executable on Windows is formatted differently from how executables are formatted on Linux (i.e. ELF Format). A Linux computer will not understand how to read Windows executable, nor know how to load the dynamic library nor understand system calls which are functions that interact with the kernel or the operating system. Therefore, Linux uses OpenGl library to handle the graphics and OpenAL is used to handle the sound. Both of these libraries are multi-platform libraries and even support Windows (OpenGL used to be supported on MacOS). You can find OpenGL being used by games that offically support all 3 major operating systems such as Minecraft Java Edition where it uses Java which is a very portable language along with its usage of multiplatform libraries.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/csgo-windows.png)

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/csgo-linux.png)

Another example is the Debian Kernel which is essentially the Linux Kernel version Debian uses. Debian supports many different architectures.

![Debian Arch Table](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/debian-arch-list.png)

---

Notice how each architecture may represent the data size of a pointer or a long double differently? This can cause programs to behave differently which is very bad. Even different operating systems may represent data types differently and some data types may not even exist in another operating system. This can cause builds to break. These are build issues that are not rare to see when working on projects that can support different platforms. Also, notice how there are two different types of endian each CPU architecture can support (with the exception of CPU with bi-endian support where you just need to set a bit to change endians). 

Below is an example of the difference between Windows and Linux in representing the data size of a long int. Windows represent long int with 4 Bytes causing any large value that would run on Linux perfectly fine to overflow and become a negative number. The compiler is smart enough to notice this and would give a warning but for demonstration purposes, I chose to ignore the warning.
![A gif showing the size difference of long int between Windows and Linux](https://raw.githubusercontent.com/zakuArbor/blog/1a36a44b96f88aa00b0fc17ece4c1b7e1b658bb8/assets/programming/builds/windows-linux-longint.gif)

---

### Random Note

**amd64** does refer to builds running on AMD chips despite the name. It refers to Intel's x86 Instruction set but the 64-bit version. AMD was the first to release the specifications for the 64 bit hence the name

---

### A Note about Endian

Endian refers to the order of bytes. Little Endian (LE) stores the least significant byte at the smallest address while Big endian does the opposite.

![](https://4.bp.blogspot.com/_IEmaCFe3y9g/SO3GGEF4UkI/AAAAAAAAAAc/z7waF2Lwg0s/s400/lb.GIF)

Why there are two different orders to represent bytes is a mystery to me. Perhaps there were several advantages of each architecture but I don't think endian affects performance now.

Big Endian is more natural to us since we read numbers from left to right in English. For instance, in the number 123, 1 represents the highest number (i.e. $1\cdot100$) and 3 represents the smallest digit in the number (i.e. $3\cdot1$). Therefore I like to see things in Big endian order. It's great to know that `xdd`, a hexdump tool, displays hex in big endian by default.

```shell
$ xxd /tmp/test.txt 
00000000: 7069 6b61 6368 750a                      pikachu.
$ #xxd represents in Big Endian by default
$ xxd -e -g 2 /tmp/test.txt
00000000: 6970 616b 6863 0a75                      pikachu.
```

You may have seen endian before when working on socket programming. Data being sent to the network is sent in big endian where the most significant byte is sent first. Little endian is probably more popular, at least among us consumers since x86 architecture is in little endian.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/endian-computerphile.png)

When working on forensics or in cybersecurity, sometimes you may see text in weird order such as "ehll oowlr". This is due to the difference in endian mode. If we take endian into account, the text should be more readable.

```shell
$ echo "0000 6568 6c6c 206f 6f77 6c72 0a64" | xxd -r
ehll oowlr

$ echo "0000 6865 6c6c 6f20 776f 726c 640a" | xxd -r
hello world
```

### Executing Programs on a Different Architecture

If you have ever programmed in assembly or taken a computer architecture, you'll recall that each architecture has its own Instruction set. This means that every single assembly program has to be ported to run on another architecture since the instruction sets are different. This gets very annoying but there are reasons for this. It's based on how the CPU is designed. When designing CPU, they are to follow certain instruction set architecture. Back in the days, there were a lot of chip manufacturers and their design philosophies were different. Therefore you had a lot of different architectures popping up since companies would not conform to a standard and following certain architectures may not be easily optimized for their certain use case at the time. Unlike Java where it can run anywhere or C which is fairly portable as long as it doesn't touch very low-level stuff, assembly programs cannot be run on a different architecture. They simply don't understand. Compilers were written to reflect the architecture it runs so that us high level programmers don't ever need to learn the hardware of the computers we run. We just need to have a higher-level understanding of how computers work and the operating system we are working on. Fullstack developers, Java programmers, and mobile app developers don't even need to understand the underlying operating system. It's been so abstracted that there's no real need to learn about them.

Below is an example of how different the assembly code is between ARM and x86. The CPU may speak in zeroes and ones but it needs to be in a format that the CPU understands. It's like Latin and English. They both use similar character sets but an English speaker would not be able to understand Latin.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/assembly-example.png)

Here's another example, trying to execute a program compiled on a Solaris machine on my laptop using an Intel chip. You'll get an error because the computer cannot understand the instructions. This reminds me of a time when my father came to me for help since his program would no longer execute on his company's server. Upon inspecting the binary, I soon realized the program was compiled from a Solaris workstation but the workstation he was trying to run on was running on PowerPC. Turned out the company moved the server from a Solaris workstation to a PowerPC workstation running Red Hat. My father didn't realize that he couldn't simply run a program running on a different CPU, so I had him just recompile the program since he did have the source code in hand. 

```shell
$ ls | grep hello
helloAMD64.o
helloSPARC.o
$ file helloAMD64.o
helloAMD64.o: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.4, BuildID[sha1]=939dce5a136c499f9d64124f5e7cf29b1dd647b2, with debug_info, not stripped
$ file helloSPARC.o 
helloSPARC.o: ELF 32-bit MSB executable, SPARC32PLUS, total store ordering, version 1 (Solaris), dynamically linked, interpreter /usr/lib/ld.so.1, with debug_info, not stripped
$ lscpu | grep Arch
Architecture:        x86_64
$ ./helloAMD64.o 
Hello World
$ ./helloSPARC.o 
bash: ./helloSPARC.o: cannot execute binary file: Exec format errors
```

To conclude talking about platforms, I just wanted to talk about them to understand why programs may not be portable and just because your changes compiled and run fine on your development machine may break on a supported platform. We often see breaks come in because the developer did not consider other platforms and would use code that is not platform-independent.

---

# DevOps

> Works in an agile, collaborative environment to build, deploy, configure, and
> maintain systems, which may include software installations, updates, and core services.
> 
> Extracted from [IBM DevOps Roles](https://w3.ibm.com/w3publisher/developer-profession/focus-areas/roles/devops)

or I like to refer it as

> Combining development and operations best practices to continuously integrate (**CI**) through building and testing frequently to continuously deliver **(CD)** a good artifact to be ready for deployment

There are a few definitions of what DevOps is but I like to look at the practical role of DevOps to the organization. I see it as the practice of joining development and operations to deliver software more quickly through the use of CI/CD pipelines. One of the benefits of DevOps is catching bugs and deploying changes faster by building more frequently. So when a bug or build break occurs, it's easier to catch early in the CI/CD pipeline when they are small and easier to manage. This also reduces idling because developers will no longer be waiting for the results of their changes and can work on a codebase that is up to date and more stable. It also means more releases since there are more builds.

The central idea of DevOps and CI/CD is that you want to automate the pipeline as much as possible and take a more shared responsibility approach between teams to increase response and understanding.

![](https://www.synopsys.com/blogs/software-security/wp-content/uploads/2018/03/differences-wp.jpg)

### CI - Continuous Integration

As mentioned previously, CI is the process of building and testing changes frequently. This allows you to catch bugs much faster rather than waiting for the end of the day or even at the end of a sprint to build and test the changes into the project which often has disastrous results.

A lot of sources I read on CI and DevOps like to emphasize on the use of a version control system to have a **single source** of truth. To elaborate, CI focuses on building changes frequently to quicken development and software deliveries while maintaining quality. The first step to enable this benefit is to ensure there is a centralized code branch that is being built frequently. Building and testing on different copies of the projects or branches can cause issues whereby it gets hard to know which version works and the branch or version developers are working on could be out of date, unstable, or diverge from the project's direction. You want to establish a centralized version where developers make changes based off stable, up-to date, and correct code base.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/ci-process.png)

Here's an overview of how a typical CI build process could work:

1. Developers push their changes to Github

2. An automation server would either be notified or notice a change has been pushed to Github and trigger a build via Jenkins

3. Jenkins would select a machine to run the builds

4. If the build is clean, it may either trigger another Jenkins job to run some basic build tests (or the build job may be part of a pipeline and the next stage is testing the build to ensure the build is not corrupted and passes all essential tests)

5. If the builds fail, the developers and manager would be notified of the failure and would be urged to take immediate action to resolve the issue

![](https://harness.io/wp-content/uploads/2021/03/032021-Harness-Blogpost-Diagram-1-1024x597.png)

#### Example - React CI BUILDS

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/react-ci-check.png)

Here's an example of where CI builds from React, a Javascript frontend framework, where builds are triggered when a PR is created. I assume all subsequent commits in the commit will trigger the CI builds as well. Anyhow, the reason why I want to highlight this is that the PR must go through extensive automated checks before the PR can be merged to master. This approach is great because it doesn't require any active management to go around and catch developers to fix their changes. It'll probably require an approval by the project maintainers but you can see how the project embraces Continuous integration.

#### Example - IBM Carbon

IBM Carbon is an open-source UX library for Javascript frameworks. It utilizes various tools to automate the builds, tests and has a bot to communicate with the developers when the builds fail.

![](https://raw.githubusercontent.com/zakuArbor/blog/master/assets/programming/builds/ibm-carbon.png)

### Continuous Delivery/Deployment

![Continuous Integration and Continuous Delivery](https://d1.awsstatic.com/product-marketing/DevOps/continuous_delivery.4f4cddb8556e2b1a0ca0872ace4d5fe2f68bbc58.png "Continuous Integration and Continuous Delivery")

**CD** refers to either continuous delivery or continuous deployment. The main difference between the two is whether you want explicit approval to deploy new changes automatically or not. Both delivery and deployment require creating artifacts (such as a website, app or an executable) that are in "ready state" (i.e. production-ready). Continuous deployment means you are automatically releasing the latest changes to production and this could be great if you want to reflect a change in the website as fast as possible. Perhaps you want to automatically deploy changes in a canary deployment fashion where you release the change to a small subset of servers or users. You often see this in social media where they roll out features incrementally to random selective users. This is a good way to have changes be tested in the real environment without facing huge consequences if the feature has severe issues or isn't appreciated by the users. You can simply rollback the change. There are other deployment techniques such as blue-green deployment but I won't talk about that in this post. 

What I want to emphasize is that depending on the sensitivity and type of product you are working on will affect whether you will define CD as delivery or deployment. I typically see microservices, apps, and websites use continuous deployment. But I don't think it's a great idea to use continuous deployment on products that are very critical and can have an extremely severe impact on the consumers and society such as the databases or applications that involve in bank and credit card transactions. Any code  changes that require a downtime to have the changes be reflected such as changing the database schema should not be deployed automatically.

![](https://wpblog.semaphoreci.com/wp-content/uploads/2019/03/cicd-pipeline-introduction-1024x422.png)

The picture below is a nice picture of tools that can be used in each stage of the CI/CD pipeline. Jenkins is an automation server that can schedule and kick-off jobs. For instance, Jenkins could be listening to any changes that get pushed to Github and if a change occurs, it'll kick off a build on a node. Once the build passes, it can kick off another job/stage to upload the artifact to Artifactory, a repository on the cloud that stores artifacts. In case you've been wondering what I've been referring an artifact as, I referred to it as the binary or executable file that has been produced from the builds. 

![](https://apifriends.com/wp-content/uploads/2019/05/DevOps-pipeline-An-assembly-line-analogy-pic-4.png)

## Conclusion

I hope you have more of an idea what a Builder does and their role in the organization. You may have notice my explanation of devOps isn't complete nor great. I'm still learning about devOps as I am not very knowledgeable in this field.

### More Resources

* [The Challenge of the Build Engineer | Gradle Enterprise](https://gradle.com/blog/build-engineer-challenges/)

* https://medium.com/linusplog/what-does-a-software-configuration-management-and-build-engineer-do-849e6ece9292

* 

## Image Sources - From the Ones I remember

[ARM Assembly Language](https://www.cs.uaf.edu/courses/cs301/2014-fall/notes/arm-asm/)

[SupportedArchitectures - Debian Wiki](https://wiki.debian.org/SupportedArchitectures)

[Metrics to Improve Continuous Integration Performance - Harness](https://harness.io/blog/continuous-integration/continuous-integration-performance-metrics/)

I am trying to put more credits to the images on my blogs, especially if I downloaded the images rather than linking them but it'll be a while till I get a hang of it.
