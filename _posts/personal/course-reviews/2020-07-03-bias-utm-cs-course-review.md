---
layout: review
title: Bias UTM CS Course Review
categories: [university, school, computer science, UTM, reviews]
---


**DISCLAIMER:** The following content is a biased review based on my own experience and does not reflect the overall experience of others. Please excuse my poor writing, it’s still a skill that I am working on. This review is subjected to changes as I continue to reflect on my time at UTM.

<br/>

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

  .line {
    border: 1px dashed;
  }
</style>

---

# INTRODUCTION

---

Now that I am finished with University (unless somehow I fail my electives), I thought I would briefly review all the Computer Science (CS) courses I have taken at the University of Toronto (Mississauga and St. George campus). I have taken 11.5 credits (23 CS courses), I thought it would be nice to reflect on my experiences with them on a sunny Canada Day. Hopefully, this would be of some use to others but please do take note this is my bias experience.

Before I start talking about the various courses I took, there may be some bias reviews with courses taught by my favorite professors: Larry Yulei Zhang, Vincent Maccio, Arnold Rosenbloom, Ilir Dema, and Simon Bogdan and perhaps also Furkan Alaca (it’s unfortunate I was not able to take a regular course with him so I cannot judge his teaching. I have a feeling he would have been one of my favorites if I had taken a regular course with him). Spoilers: I never had a terrible professor. Anyways, this is not only a review of courses I took but will also include a reflection on my progress in University along with some personal side stories.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/collage1920x1080.jpg" alt = "my personal wallpaper with all my favorite professors" class = "center"/>
<p class = "excerpt">My desktop wallpaper with all my professors</p>

---

# FIRST YEAR – 2 COURSES

---

First year computer science courses are not difficult at all. If you are new to programming, then you will need to invest more time than those who already know programming beforehand. Programming can be weird at first but you just need practice. I have helped a lot of students in CSC108 and CSC148 and I notice that a lot of students don’t think like a computer scientist. You need to be able to understand what the problem is, how to break it down, and be familiar with concepts taught in class. This does not simply come from just reading lecture notes but to get your hands dirty and make a bunch of small programs. Make a lot of simple programs that are less than 50 lines of codes to get a hang on with Python and how to think like a computer scientist.

A lot of students are lost on how to start and often tell me they don’t know where to start on their assignment or that those little projects are stupid and meaningless. You need to start somewhere and starting simple is probably the best idea. When I first tried to learn programming a long time ago, I made very simple programs that would just take in inputs from the user and add them together, a random number guessing game, or just simply spamming different functions with different inputs to see how they would behave. It may seem stupid to others but it’s quite fascinating in my own opinion. To be able to tell the computer what to do and theorize how programs work was interesting.

First-year is probably going to be stressful and competitive because of POST requirements where you need to do very well in first-year to get into Computer Science POST unlike other Universities such as uOttawa, CarletonU, Ryerson, and YorkU where you are admitted directly to the Computer Science program after High School. UTM does things differently by evaluating your high school marks to enter the University but not to the program itself. To enter into the Computer Science program, they evaluate your performance in first-year. Nowadays, you will probably be competing to be the top 250 students or so out of 1000 or more first-year students who also wish to study Computer Science at the University.

<br/>

<hr class = "line"/>

# CSC108: INTRODUCTION TO PROGRAMMING 1

<hr class = "line"/>                                                            

**Professor:** Ilir Dema

**Coordinator:** Arnold Rosenbloom

**Description:** In this course, you will go through the basics of programming using Python such as string and list manipulation, control statements (if, while loop, for loop, switch statements), big O notation, and functions. Unit tests are also taught and you are required to write some for any assignments assigned to you.

**TLDR:**
* Beginner friendly, no previous experience needed
* Difficulty varies depending on your level of experience but overall it's not hard for those with no background if you practice
* Practice Practice Practice, especially if you are new to programming
* take advantage of your TA and office hours. Ask for help if you are stuck

**Review:** Ilir Dema is a very nice and intelligent professor. I absolutely loved his lecture which I recall very well being on Monday from 6pm-9pm. The course assignments are very straight forward and the course overall is not difficult at all. However, if you are new to programming and lack how to break down problems, this course will be quite difficult for you at the start. It's normal to struggle in the beginning if you are new to programming. This course equips you with the fundamentals that all programmers need to know. When I took it, the coordinator was trying to force all of us to use a virtual machine but that wasn't necessary at all. You can use whatever Operating System you wish and whatever IDE you prefer including vim.

The assignments were well thought and were designed to be fun, especially the last assignment where we had to make a text-based adventure game. This allowed us to use our creativity and work in pairs. I mostly did the assignment myself but it helps to have a partner to discuss your code and ideas with. This is important to have experience with since you will be working with pairs or in groups a lot in future courses and the workplace as well. Almost all programming assignments in Computer Science have starter code so you will need to get used to reading the starter code before you start the assignment to understand what functions you need to work with.

Labs are an essential part of your learning in computer science. Attend your labs and feel free to ask questions. Just don't ask for the answer, be specific. Look over the lab tasks before you head to the lab (perhaps start working on them beforehand so you know what questions to ask and be able to complete your lab by the due date).

Feel free to ask questions with your TAs, professors, and classmates. Interacting with others and working on problems together helps you learn. However, you must not commit academic plagiarism. CSC108 along with CSC148 is plagued with students copying each other. There's nothing wrong with asking for help and discussing possible approaches to solving a problem but you must write the code yourself and be able to derive the solution when asked by your professor and TA.

<br/>
<hr class = "line"/>                                                            
# CSC148: Introduction to Programming 2
<hr class = "line"/>                                                            

**Professor:** Tiffany Tong

**Coordinator:** Dan Zingaro

**Description:** A follow up to CSC108 where you learn about Object Oriented Programming and some basic data structures such as Binary Trees, Stacks, Queues, and Linked List.

**TLDR:**
* A lot more work and covers much harder concepts than CSC108
* Assignments will take much longer to complete compared to CSC108
* Spend time reading the starter code, assignment handout, and what others are asking in the discussion board


**Review:** CSC148 is definitely harder than CSC108 but it is not a difficult course either. Put in the time to learn the concepts from class and try to implement them yourself. Practice leads to perfection. Programming is simply just practice. You cannot be good at programming without practice. Be very familiar with the principles of Object-Oriented Programming and the data structures taught in class. These are essential for any programmer who wants to be a software developer. The tests are what you would expect, just different variations of concepts you have learned in class such as writing some data structure that behaves a bit differently compared to those taught in class. I cannot remember exactly what was on those tests but I didn't find them hard at all.

Although I said those tests were not hard, I didn't do well in this course. I was overconfident because I found the assignments and tests easy that I did not study for the exam and often assumed I knew what the questions were asking without reading the questions at all by quickly glancing at the behaviors and the provided code. I ended up dropping probably around 20% from the exam because I didn't answer the questions the way they wanted it such as using recursion instead of loops, and etc (you'll get a 0 if you answer something using loops and not recursion if the question asks you to answer it using recursion).

Assignments were quite interesting and can be a bit time-consuming. The hardest part of the assignments I found was reading the assignment handout and trying to understand what the professor is asking for. Once you read the discussion board and read over the handout a few times and look at the starter code, it's not bad. The last assignment I had in CSC148 was very interesting and fun. This was somewhat of a challenge for me and took me a few days to finish it. The assignment consisted of a few puzzles (grid peg solitaire, word puzzle, sudoku and etc) where you had to write an algorithm that would solve all of them under a time limit. The search algorithm involved was BFS and DFS and you were not supposed to make it specific to any puzzle. The search algorithm takes in each puzzle object had a win and a set of possible moves to make. So you do need to know how to play each game to finish the assignment. The difficult part of this assignment was to make a very efficient program that can solve the puzzles very fast. My first implementation took an hour to pass the test cases. So after each iteration, my program became faster and faster. Reflecting on this assignment, I really could have just googled BFS and DFS and think of conditions to prune entire sets of moves that were not needed to be considered. But that's part of learning, you go through the hardship of trying to optimize your code and derive the answers yourself.

<br/>

<hr class = "line"/>                                                            
# Reflection
<hr class = "line"/>                                                            

I do have regrets not studying much in my first-year but not like I can change the past. However, I have bigger regrets about CSC108 and CSC148 than my performance. My biggest regret was perhaps helping certain individuals too much in the course. They have become too reliant on me and others to succeed in the course (some of them never even passed the course even after a few attempts). There needs to be a balance on how much you can help and know when to stop so that they can have the time to themselves to explore the concepts without being relying on you.

I have helped many students and most of them became quite successful and some who I am proud of even if they no longer are in the University due to their poor academic performance. I have met various students at different levels and I enjoyed teaching students who took the time to study and tell me various approaches on how they would tackle a particular problem. However, teaching unmotivated and unenthusiastic students is mentally draining and makes me wonder if I am suitable to teach and help students. I would often spend so many hours (over 40-60 hours throughout the semester trying to teach some students)  and guide them on concepts and problems without much success and never had the students be enthusiastic about the courses I helped them in. I fear that I may start to form anger issues from these experiences and decided I will probably stop teaching students in their courses.

Note: I was never a TA (always failed to be a CSC209 TA to my regrets) and I am not a paid tutor. I help students out of my free time and often lose hours of my studying time to help them out. 

<br/>

---

# Second Year - 6 Courses

---

<hr class = "line"/>                                                            
# CSC207: Software Design
<hr class = "line"/>                                                            

**Professor:** Sadia Sharmin

**Coordinator:** Arnold Rosenbloom

**Description:** In this course, you will get introduced to agile development and best software development practices using Java. You will be taught version control for the first time using Git and learn various design patterns such as Singleton, Factory, Manipulator Design patterns. In addition, you will also learn JUnit Testing, IEEE floating-point notation, and finite state machines. It's also the first time a student will be taught how to make a GUI program using Swing. Students will be required to work in groups of 4 for one of the assignments to have a feel of how agile development works along with the difficulty of working with a group. Students will also learn UML diagrams.

**TLDR:**
* Arnold is a great professor but his coordination is very questionable
* Working in a group is hard. Find a good group or else your experience in the course will be terrible
* A lot more time commitment required for the assignments
* DO NOT MERGE everyone's changes at the last minute. You should be merging changes throughout the entire duration of the project.

**Review:** CSC207 was an interesting course and very useful. Not only do you learn design patterns and agile development cycle, but you also learn how floats are formatted and some intricacies of what bad code is. To illustrate, a part of my first assignment was to find and create a list of primes through various methods and observe how fast or slow each method was. You learn how you access and insert elements to an array can affect the performance of the program along with the time complexity of the algorithm.

The group work is a major pain if you do not have a great group. I was fortunate to work with 2 students who were cooperative and so my experience was not at all bad. I did have difficulty contacting one member of the group who never responded to any of my emails till the day the project was due but I don't hold a grudge at all because the team was able to complete the project. Note: You do get to choose your own group. You can also pair up with students from other sections. I did not have any friends that were close enough to work with me.

Since the course is trying to teach students agile development, you will be required to frequently work and give updates on every sprint day, indicating your progress in the project. This allows you to be on top of things and avoid the assignment from not being completed. However, this also means that this course will often have you change your work schedule a lot.

The course is not hard but it does require a lot of time commitment. You need to be responsive to emails and texts from various team members and communicate any issues you have to the team. The tests were not at all difficult but not easy at all. Working with a team is also quite interesting because your changes can cause a conflict with another member's code so you learn how to deal with merge conflicts. In case you are wondering, the project we usually make in CSC207 is a Paint Program that can save and load files utilizing various design patterns.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc207_paint.png" alt = "an example of a CSC207 Paint Project" class = "center"/>
<p class = "excerpt">An example of a CSC207 Paint Project</p>

When working with a group, you need to ensure that each member merges their change after each user story and then perform a regression test on the program to ensure nothing gets broken. DO NOT MERGE ALL YOUR CHANGES ON THE LAST MINUTE. You will likely encounter merge conflicts and have a very very very difficult time fixing the merge conflict and find out which changes causes the program to break or behave differently. This is terrible software development practice. I've seen a group do this and all I can say is that they were not able to fix their merge conflict by the deadline and therefore did poorly in the course.

Sadia Sharmin is a young professor (or lecturer depending when you had her) who often seems like a student. She often gets confused as a fellow student or a TA. Although I never talked to her, she often hangs out with students (including many of my friends) and plays games with them. She is a great lecturer and is able to teach the course content in an easily digestible manner.

The course organization is questionable. A lot of students in the past few years have been very unsatisfied with the coordination of the course because Arnold Rosenbloom, a great professor (and is one of my favorite professors), is very disorganized. He is notorious for the chaos he causes due to his organization skills. Marks for this course will usually come out during the 2nd semester (which is many weeks late) and in some cases, you will never know the course average. However, he is trying his best and is always popping by the lab to see how students are doing and is very responsive. He tries to make students appreciate Computer Science and have them be very knowledgeable. I cannot name a professor who spends as much time as him to bring reforms and changes to the student's learning experience to produce great programmers and computer scientists. A lot of students dislike him because of this but I never met a student who said they did not learn anything from the course. Every student I asked from different years all agreed that despite the lack of organization skills he has and the heavy workload he gives us, we all learn a lot from his courses. I have no doubt that Arnold has increased the abilities of countless students in the field of Computer Science and is a great asset to the University.

<br/>

<hr class = "line"/>                                                            
# CSC236: Introduction to Theory of Computation
<hr class = "line"/>                                                            

**Professor:** Larry Yulei Zhang

**Coordinator:** Larry Yulei Zhang

**Description:** In this course, you will be taught how to prove program correctness such as proving the correctness of iterative and recursive algorithms, divide and conquer, and master theorem. You will also be taught automata such as DFA and NFA and a bit about formal languages. More time complexity notations will be taught such as Big Omega and theta notations.

**TLDR:**
* Easiest Computer Science theory course you will take in University (easier than MAT102)
* Not too difficult but you need to make sure you keep yourself up to date and be familiar with induction and strong induction
* If you find yourself better at Math, you will find this course much easier than CSC207
* cheat sheets exist for the exam and tests

**Review:** This course is extremely important in Computer Science. This course is the successor to MAT102 (Introduction to Mathematical Proofs) and so you should remember how to do induction and strong induction before you take the course. CSC236 is probably the easiest theory course you will take at the university (it's also easier than MAT102 in case you were wondering). Anyone who wants to call themselves a computer scientist must know the content taught in this course as it is fundamental in Computer Science. Work is to be done on Latex (a way to write documents that makes writing math easy). The assignments can be quite challenging so I suggest you start early to give you time to think and perhaps work in pairs (for some odd reason I worked solo when you could work in pairs or in groups of 3). The course was interesting and Larry is a great lecturer. He makes the course content interesting and funny. People love his slides as well as it is filled with memes. Cheat sheets are allowed for the tests and exam and are very helpful if you have a poor memory like me.

<img src = "../assets/utm/fsm.jpg" alt = "a manga talking about finite state machines" class = "center"/>
<p class = "excerpt">Excerpt from a professor's Instagram account. Apparently this was on someone's cheat sheet</p>

<br/>

<hr class = "line"/>                                                            
# CSC209: Systems Programming and Software Tools
<hr class = "line"/>                                                            

**Professor:** Ritu Chaturvedi (1st Attempt), Alan J Rosenthal (St. George), Furkan Alaca (my observation)

**Coordinator:** Andrew Petersen (1st Attempt), Alan J Rosenthal (St. George), Furkan Alaca (my observation)

**TLDR:**
* C is hard. You need a lot of practice.
* Know how to deal with memory properly or else it'll bite you
* Reverse style classroom
    * Complete your PCRS before lectures
    * Start on your lab early so you can go to the lab and ask your TA for help
* A lot of work. It's a time-consuming course
* If you like programming, you'll find CSC209 much easier than CSC263
* St. George CSC209 is usually a lot easier than UTM CSC209
* Segfaults are the nightmare of every C programmer


**Description:** In this course, you will be working with C to understand the basics of how Unix/Linux works such as how process and program execute, the memory model, system calls, interprocess communications (pipes and signals), and sockets. You will also learn various Unix tools and how to use the terminal. You probably will learn Bash (or Shell Bourne) as well.

**Review:** The course is very essential and is quite saddening to know you can graduate with a Computer Science major without taking this course (I have a lot of issues with the lack of requirements for a Computer Science major at UofT). The course is very interesting and is the first course you can take to learn about systems programming which I find very fascinating.

Unfortunately, like many others in my year, we did not have a great experience with the course and the organization was very poor that I am considering to rank this course organization to be worse than Arnold's organization. However, there were reasons for this disorganization so I shall omit most of my experience at UTM and talk about what I have observed over the years and based on my own experience as well at St. George.

The course is difficult for most students and the assignments are very time consuming and often trip a lot of students. C is a difficult language to get used to as you need to take into consideration a lot of things that we take for granted in high-level languages such as in Python. Dealing with memory properly is actually quite difficult and is often a source of program crashes, unexpected behaviors, and exploits. Hence why C is seen as a dangerous language to work with and why Rust is gaining popularity from my understanding. You'll come to love or hate C. It is almost impossible to never encounter a segfault and will often spend many hours tracking down where the bug is. Memory leaks are also a huge pain to track and close down.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/pointer_joke.png" alt = "a comic making a pointer joke" class = "center"/>
<p class = "excerpt">Excerpt from the official CSC209 2020 Meme Thread. Probably from xkcd comic</p>

Lectures are taught in reverse style where students are to learn the concepts from PCRS, an online programming exercise software, where students are to complete weekly challenges and watch the videos to understand the concepts before lectures. This has mixed results from my observation. Despite what studies show, I see reverse style classrooms only effective if the students take the time to learn which most students I've seen do not. Reverse style classrooms are very time consuming because you would often spend countless hours trying to understand what is wrong with your code or understanding a concept which could simply be taught in 5 mins in lecture. However, I have no doubts that those who put in the effort to participate in reverse classroom benefit more than traditional lectures. Going through all those struggles to solve problems yourself and learning the material beforehand allows students to gain a deeper understanding of the concepts. It also gives you enough time to ask any questions during class that they could not understand in their self-studies which makes better use of lecture time. 

You need to be on top of things and review materials before the lab and lecture. Weekly labs should be started before you enter the lab to maximize your time with the TA to ask questions. It also allows you to be ready for the lecture and not be lost because the professor assumes you already spent the time learning the material and will go in-depth on the concepts, work on problems with the class and answer any questions you may have.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/pcrs_meme.jpeg" alt = "a meme joking about the consequences of not completing your weekly pcrs excercise" class = "center"/>
<p class = "excerpt">Excerpt from the official 2020 CSC209 Meme Thread</p>

The lectures are great and I heard very positive reviews about Andrew Petersen and Furkan Alaca. I had Ritu and Alan as my professor and both were great. Ritu met my expectation but I can see why a lot of students did not attend her lecture. To put it into perspective, there were only 14 students or less who attended the lecture I was assigned to meanwhile Petersen had a full class with over 100-200 students. Ritu is a very funny professor and I like my talks with her during her office hours. I felt that people just judged her unfairly. It was interesting to see someone open Wordpad and notepad to write programs during class. Alan was a great professor who teaches very effectively. I enjoyed his lectures a lot and was glad to learn shell bourne from him.

I did not find the assignments difficult but I definitely know a lot of students did and I often came to the labs to help out. However, I dropped the course at UTM because I did not like the way the course was structure, the automarker which I heard later on was very broken (there's a rumor that a student who dropped the course got over 50% on the assignment with just starter code), and the fact that we didn't get a lot of our marks till an hour before the drop date. This experience was very helpful to the professors because I never saw this mistake ever repeated. From my observations, the course is taught very well these days.

## Differences between St. George and UTM
Despite people looking down on UTM when comparing to St. George, I found St. George courses to be much easier than UTM. The assignments are not only intuitive and not hard, the tests were easier than UTM. When I took CSC209 at UTM, Bash was optional (not anymore though) and so I was glad to drop CSC209 at UTM. Although it taints my transcript with an LWD which employers ask about, learning Shell Bourne and various things about Unix helped me a lot in my academic career and at my internship. Alan likes to focus on Bash or Shell Bourne a lot before learning C. I know quite a few students who took CSC209 at St. George just because it was easier. I can tell you that when I retook CSC209 at St. George, 1/3 - 2/3 of the class were from UTM (a lot of people dropped CSC209 in my year).

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/bash_kill.jpeg" alt = "a joke on the terminal about kill" class = "center"/>
<p class = "excerpt">Excerpt from the official 2020 CSC209 Meme Thread</p>

## Differences between Now and when I took CSC209 at UTM

When I took CSC209 at UTM, we barely learned gdb and never covered topics such as Valgrind and Bash. These days, I see labs cover gdb, Valgrind, bash, and use Address Sanitizer. There is much more emphasis on memory leaks. The assignments are quite interesting in 209 at UTM. I've talked to various CSC209 students over the years and helped students as well. Unfortunately, I never got a TA position which I would have loved to get. Some cool assignments I've seen in CSC209 are: manipulating sound files to give effects such as fade in and fade out, rsync imitation, a chat server that can send emojis, and implementing a primitive filesystem (this will help a lot for CSC369 - Operating System's assignment 3 which is implementing copy, delete, recover, rename, and creating files for EXT3). I like going on the CSC209 course website to see what they are learning and talking to students and TA for CSC209 (my friends) which made me be aware of the existence of Valgrind, address sanitizer and some neat details of various topics taught in the course.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/goose_chat.png" alt = "an example of a chat server made by students in CSC209" class = "center"/>
<p class = "excerpt">An example of the emote chat server students made in CSC209 in 2020. An excerpt from the official CSC209 2020 Meme Thread. Credits to Emily Wu</p>

<hr class = "line"/>                                                            
# CSC258 - Computer Organization
<hr class = "line"/>                                                            

**Professor:** Larry Yulei Zhang

**Coordinator:** Larry Yulei Zhang

**Description:** In this course, you will learn about logic gates, combinational and sequential circuits such as latches and flip flops. In addition, you will learn about a typical computer architecture such as the control unit and data path, instruction set architectures, and assembly programming on MIPS.

**TLDR (not much to say....):**
* Very fun course
* Easiest CS course in 2nd year

**Review:** Larry is an excellent professor and made the course quite enjoyable. The lab has two components, a prelab where you submit your circuit design and the lab where you program the FPGA using Altera. There's also a weekly quiz that tests you on the recent topics covered in class to ensure you keep up with the materials and a midterm and exam. The class was not difficult and probably is the easiest out of the 2nd semester CS courses in 2nd year (CSC209 and CSC263). Although we only briefly touched assembly, it was fun making recursion calls. The course I would imagine changed drastically so my knowledge of the course is very outdated. I loved the labs and made me understand more in-depth on how computers work. I have a confession to make, I never understood how flip flops worked even though it wasn't hard. It was only after 2 years from when I took the course that I understood how flipflop works. I read an excellent manga, [The Manga Guide to Microprocessors](https://www.amazon.ca/Manga-Guide-Microprocessors-Michio-Shibuya/dp/1593278179) and a book [Code: The Hidden Language of Computer Hardware and Software](https://www.amazon.ca/Code-Language-Computer-Hardware-Software/dp/0735611319) that I understood all the concepts taught in the course. I was always ashamed of how I got a good mark despite not understanding how flip flops work so I decided to study CSC258 again with those books which I highly recommend.

<center>
<div style = "display: inline-block;" class = "multiple_img_div center" >
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc258_manga.jpg" alt = "The cover of the Manga Guide to Microprocessors" style = "float:left;" class = "half-img"/>
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc258_book.jpg" alt = "The cover of the book Code" style = "float:right;"  class = "half-img"/>
</div>
</center>

<br/>

<hr class = "line"/>                                                            
# CSC263 - Data Structures and Analysis
<hr class = "line"/>                                                            

**Professor:** Larry Yulei Zhang (UTM), Fatemeh Panahi (St. George)

**Coordinator:** Larry Yulei Zhang & Daniel Zingaro (UTM), Fatemeh Panahi (St. George)

**Description:** In this course, students will be taught various data structures and their time and space complexities. Such data structures include hash tables, dynamic arrays, priority heaps, and AVL trees. Students will be introduced to average-case complexity and how to analyze data structures to come up with the average case and amortized costs.

**TLDR:**
* Very theoretical course
* useful for interviews
* If you are terrible at Math and theory, you'll struggle a lot in CSC263
* Beware of Daniel Zingaro (at least that's the meme)

**Review:** This course is extremely crucial for job interviews as it covers many topics that can be found in interviews. It is the most important and practical theory course you can take in your undergraduate. I found this course to be very difficult and challenging because I am not very great at theory. My partner for the assignment and I struggled a lot going through each problem set and ended up deciding to drop the course. We did very well on those problem sets (often with 90%+) but the number of hours we put into the course and our poor performance on the midterm made us reconsider taking the course. I contemplated dropping out of Computer Science entirely because I felt that if I could not pass CSC263, then how am I able to do upper-year theory courses. Luckily or unfortunately, I retook CSC263 in the summer at St. George and found it to be very easy compared to UTM. Even after I dropped CSC263 at UTM, I continued to attend Larry's and Zingaro's lectures (though I often find myself daydreaming after I dropped the course). 

Perhaps because this was my second attempt and the fact that UTM problem sets and tests were on a different scale (extremely hard) compared to St. George, I found CSC263 to be quite easy. I didn't put much effort in my second attempt and would often finish the problem set in a few hours, it made me wonder why students at downtown were struggling. I didn't do as well as I should have but considering the lack of studying I did in the course, it was decent enough.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/min-heap-joke.jpeg" alt = "a joke about min-heap" class = "center"/>
<p class = "excerpt">An excerpt from Larry's CSC263 Educational Meme website. Contributed by David Zolnieryk</p>


**Note:** Daniel Zingaro is releasing a new book called Algorithmic Thinking: A Problem-Based Introduction on October 20 2020. As the name implies, it's a book tackling how to solve problems. However what makes different is that it removes all the heavy math notations and tries to explain problems in a more easier manner for the average student. I recall Zingaro once saying over a Residence Dinner event that he was very bad at algorithms and did poorly in University. But he is now teaching the subject and is an expert so I think this book would be quite appealing. I have not yet read the book (as it is not out yet) but I am excited to read it when it comes out. This book looks much more promising than his previous book Invariants (which I have not gone past the first chapter) as it aims to be more targeted to the average student who is looking for a book to help them tackle problems in a clear and concise way.

You can preorder the book on [Amazon](https://www.amazon.ca/Algorithmic-Thinking-Problem-Based-Daniel-Zingaro/dp/1718500807/ref=sr_1_1?dchild=1&;keywords=algorithmic+thinking&;qid=1593637784&;s=books&;sr=1-1)
or at [No Scratch Press](https://nostarch.com/algorithmic-thinking)

Preordering at No Scratch Press gives you a much better deal with the coupon `PREORDER` for 25% off. Not only do you get a physical copy, you also get the early release digital copy as well. I have preordered from both sellers since I wanted to give one book as a gift to a friend.


<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/dan_book.jpg" alt = "The cover of Algorithmic Thinking" class = "center"/>
<p class = "excerpt">An excerpt from No Scratch Press. Daniel Zingaro's newest book which is coming out in November 2020</p>

<hr class = "line"/>                                                            
# CSC290 - Communication Skills for Computer Scientists
<hr class = "line"/>                                                            

**Professor:** Nia McCash

**Coordinator:** Nia McCash

**Description:** In this course, you will learn how to effectively communicate written and orally. You will learn about interpersonal communication and how to deescalate situations and avoid workplace communication issues. In addition, students will learn how to effectively write code comments and documentation. UML diagrams and case diagrams are taught in much greater depth than in 207. 

**Review:** This is a standard communication course for computer science students but I heard this course may be removed in the near future. Instead, students may have to take some writing course designed in collaboration with the writing department or just any set of writing courses the department approves of. Students will be writing weekly blogs or pieces of work (at least when I took it - this blog originally was for this course) and work in groups to present and write a project proposal (I cannot recall what that was about). The test was very interesting because there was two components to the test. The first component is just a normal test but in the second component, you discuss the answers about the test you just wrote not long ago with the group. You can see all my blogs from the course over [here](https://zakuarbor.github.io/blog/csc290). It includes my view of the course whether or not it is useful and how I felt about the two stage test format.

<hr class = "line"/>                                                            
## Reflection
<hr class = "line"/>                                                            

For those doing a CS major or minor and wondering which courses are easier, it all depends on what you are good at. Are you better at programming or theory? If you find theory much easier, you will like CSC263 over CSC209. CSC258 is the easiest out of CSC209, CSC258, and CSC263 for the average student. However, CSC263 is quite an important course which allows you to take courses such as CSC343. It is also very useful to know for interviews and to program better. So you should plan ahead on what courses you want to take in 3rd year instead of choosing what is easier. I suggest you to take all three of them. You don't have to take all three in 2nd year but you should plan to eventually complete all of them as they open a lot of courses to you.

Similarly to first year, I really wished I studied much harder in my second year. I didn't necessarily slacked off but I sure didn't study hard enough. I ended up dropping CSC209 and CSC263 which changed my views about St. George as they were very easy over there. This will probably be the last year I regret not studying hard enough but not the last for dropping out of University (though my reason to consider dropping out of University changed because of financial reasons). Entering in my 3rd year with a weak foundation did hurt me a lot because third year was very tough for me.

<br/>

---

# Third Year (300-level courses) - 13 Courses

---

Here are some of my views of courses I've taken in my 3rd and 4th year.

**My favorite Courses:** CSC358, CSC367, CSC369, CSC363

**Courses I think are important to take:** CSC309, CSC343, CSC347, CSC373

**Courses I think can be omitted in your education (varies depending on your interests):** CSC301, CSC333, CSC376, CSC384

<br/>

<hr class = "line"/>                                                            
# CSC301 - Introduction to Software Engineering
<hr class = "line"/>                                                            

**Professor:** Ilir Dema

**Coordinator:** Ilir Dema

**tldr:**
* Work on a project for the entire semester with a group of 4-7 students
* Project does not have a theme, you can work on whatever you want using whatever language, framework, and tools you wish to use
* work with a group of active and committed students to have a good experience. Else you may hate your time in this course.
* most of your marks are based on filling out the paperwork and documents about your project and your project status over the semester

**Description:** CSC301 as the name applies is about software engineering. You will go over UML, Design Patterns, different software developments approaches such as agile and test driven development, testing suites, and other software development topics the professor decides is important for students to know in the current industry.

**Review:** This course is an opportunity to work on a big project you have been holding off for a long time. This is the first course where the average student gets the opportunity to work on a big project with a big team (groups of 4-7 students) over an entire semester. You learn about how to work with a group, how to effectively use your team meetings to get issues resolved and plan ahead of what to do in the next sprint and other software development practices. Most of your grades are determined by all the documents you make during the project such as your project design plan, spring logs and reflections, and etc.

The topics taught in the course are interesting for those who are interested to becoming a manager or work on a startup where things are fast pace. However, I found myself daydreaming during lecture and so would often need to review the lecture slides outside of class. There is a midterm for the course but there is not always an exam. When I took it, the course had an exam but in 2020, the course did not have an exam.

You need to have a great group to have a great experience. I worked with a group of 7 students, a large group, and it was extremely hard to manage and work with each other. I didn't have a great experience but my group was not bad at all. I just expected a lot from the group and some members just didn't meet my expectations and others were going through a lot so the project didn't have great progress. Regardless how your project progresses, the course is easy marks relative to other Computer Science course as long as you don't slack off and work on the documents required for the sprint. There's also assignments in this course which can be quite difficult to understand but as long as you put in the effort and ask for help from the TAs and the professor, you should be able to do it.

Here's an example of a great project I saw from this year's CSC301.

<iframe src="https://www.youtube-nocookie.com/embed/bPAOhb8r5Co" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class = "center" allowfullscreen></iframe>

You can view an example of what sorts of documents are expected in the course over at their github page: [https://github.com/collabcloud/project-collabcloud](https://github.com/collabcloud/project-collabcloud)

Here's another example of another CSC301 project I found online that some of my friends worked on: [https://www.memeorable.xyz](https://www.memeorable.xyz)

<br/>

<hr class = "line"/>                                                            
# CSC309 - Computing on the Web
<hr class = "line"/>                                                            

**Professor:** Arnold Rosenbloom

**Coordinator:** Arnold Rosenbloom

**Description:** In this course, you will go through a lot of languages and technologies that after the end of the course, you are ready to apply to any entry level full stack developer job. Some langauges and technologies taught in the course areHTML, CSS, Javascript, PHP, Node.js, MongoDB, SQL, Websockets, HTML5 Canvas, and React.

**tldr:**
* very fast pace course, covers a lot of languages and frameworks
* requires a huge amount of time commitment
* prepare for sleepless nights
* have a good assignment partner
* exams are held on the lab machines

**Review:** This course demands a lot of attention and commitment. It's a fast pace course and the projects are massive. Arnold will grind you through everything you need to know to become a full stack developer in less than 3 months and so be prepared to have sleepless nights if you are taking a heavy course load. Ensure you have a great team member because it makes a huge difference. The first project is a PHP application that interacts with the database and must follow the MVC model. The second project is a game using Node.js as your backend. The last project is usually an extension to the second project where you allow multiplayer using websockets and add a lot of neat features.

My experience with CSC309 was not great because of my partners but the lectures were interesting and I learnt a lot despite already knowing most of the content beforehand. Other than my first project who was great, the others I worked with were not responsive and ended up contributing 0 lines of code to the project. I was told they would do half of the project only to tell me the day before the assignment was due that they couldn't finish their part of the project and would leave me scrambling to finish their half of the project in one day. I understand things happen in life but they sure didn't leave me with a great impression.

The exam was very interesting because it was the first programming exam that was not on paper (though not the first exam I had on the computer). Often times your exams would be on paper and it may seem odd to some students that we have to write code on paper. Arnold decided to be a rebel and change how we test students to be more practical. The exam was done through a VM which had very limited internet access and all the documentation for the langauges and tools were downloaded for our reference. Cheat sheets were allowed as well. 


<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/paper-exam.png" alt = "A student questioning why her friend held a programming test on paper" class = "center"/>
<p class = "excerpt">Excerpt from <i>Tonikaku Kawaii</i></p>

When I took the course back in 2018, the lab machines were not powerful as they are now and so I had problems with lags that could have me wait for a minute or two before I could resume the exam. I ended up not finishing the exam but most students didn't either. Computer exams can be stressful because you must get the right syntax and find all the stupid mistakes you make. You often will be stumped on your bugs and end up being too focus on them and end up doing poorly on your exam. My tip is to spend no longer than 10mins on the bugs for each question and just get going. It's not the end of the world. From my guess, Arnold has the TAs to go over the bugs and resolve them to see how your program works.

The last CSC309 Projects in 2019 and in 2020 was to make an io game which a lot of students refer to it as Fortnite on the web because it's a shooter based game. The project I had was much easier as we didn't need to draw graphics using HTML5 and think of how to effectively scale your game to handle many users along with the game mechanics being much simpler. The game we worked on was called Warehouse wars where you push boxes through a grid to surround the monster with boxes to kill it off (like surrounding a single enemy piece in Go/Baduk). The game mechanics were so simple that I didn't need to code more complex collision detection, have smart enemy bots nor have different types of weapons and hideouts.

<center>
<div class = "multiple_img_div">
<img src = "../assets/utm/ww_reg.jpg" alt = "An example of my Warehouse War login screen" style = "float:left;" class = "img_50"/>
<img src = "../assets/utm/ww_game.jpg" alt = "An example of my Warehouse War gameplay" style = "float:right;" class = "img_50"/>
</div>
</center>
<p class = "excerpt">An example of a CSC309 A2 project back in 2017</p>

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/fortnite.png" alt = "An example of the fortnite game students made in CSC309" class = "center"/>
<p class = "excerpt">A CSC309 2D Shooter game I found online</p>

<br/>

<hr class = "line"/>                                                            
# CSC324 - Principles of Programming Languages
<hr class = "line"/>                                                            

**Professor:** Ilir Dema

**Coordinator:** Ilir Dema

**Description:** In this course, you will learn mainly functional programming through Racket and Haskell and a bit on logic programming through prolog. The course is supposed to make you think of different ways to write and approach solving problems and a slight glance at language construction

**Review:** The course was an eye-opener to a totally different programming paradigm I am used to. I initially struggled a lot in this course because I was so deeply rooted in either procedural or OOP programming and could not get my head to wrap around functional programming. The course is very interesting and made me ponder how one would implement x feature in x language. This course introduced me to many functions that exist in functional programming languages such as map, filter, and lambda calculus. It was weird to not be able to mutate states and made me much stronger in using recursion to solve problems. It was weird to use recursion to iterate instead of loops and how you can pass functions to higher-order functions for function composition. It really felt like a Math course due to its roots and also the fact that Ilir just loves Math and tries to relate any concept with Mathematics. The course does have weekly problem sets that aim to test students on their understanding of the concepts taught in class, a midterm, 3 assignments, and an exam.

One criticism of Ilir is that he loves Math way too much and often tries to relate Math to anything he teaches. A lot of Computer Science concepts have roots or relation with Mathematics but a lot of students in Computer Science are not exactly very Mathematically inclined nor interested in Mathematics. However, that's also why I love about Ilir. His monotone voice could make you go to sleep but he's a great lecturer and fun to talk with. Ilir is very open to help you succeed in the course so don't be shy to come to his office hours and ask for help or just go for a chat. Hence why he's also one of my favorite professors at the University. Some students may complain about his accent but his English is very clear to me so I don't understand how they have difficulties understanding him.

The first assignment of the course was very interesting because we were to implement RQL (Racket Query Language) which is the primitive Racket version of SQL. However, I struggled to wrap my mind with functional programming in the first month and ended up writing a program that takes in so much memory and ended up crashing the testing server. My grade from this assignment made me very discouraged (I ended up getting around a 40% which was the first time I ever did badly in a programming assignment) but I had fun in the course trying to understand various concepts with my friends who inspired me to do well in University.

<br/>

<hr class = "line"/>                                                            
# CSC333 - Forensic Computing
<hr class = "line"/>                                                            

**Professor:** Ryan Duquette

**Coordinator:** Ryan Duquette

**Description:** In this course, you will be taught tools and techniques used by digital forensics such as OSINT and Axiom. The course focuses on computer forensics and does not touch network forensics. The course goes through the proper procedures digital forensics investigators must follow during their investigation and the consequences of not following such procedures. The course will teach you how to find evidence on mobile phones and on computers, the Canadian Law, and various obfuscation techniques that exist to make detecting evidence much harder.

**TLDR:**
* the birdiest course you can ever take at the University
* Very fun and interesting
* No longer offered till UTM finds a new replacement
* Ryan left to focus on his career and hinted he may come back after a few years if he feels like it

**Review:** Ryan Duquette is an amazing professor who has a lot of experience in the field. The course was interesting, enjoyable, and you learn a lot from this course. My only comment is that this course should not be a Computer Science course, at least not in the 300 level because the course was literally the easiest course I have ever taken at the University. If you are wondering, the course average was an A. It used to be a 4th-year level course but got demoted to be a third-year level course. We have weekly labs, a few discussion assignments, and one big paper. The paper is probably the biggest paper I have ever written in University other than my capstone paper. The topic I chose was talking about the laws pertaining to the collection of digital evidence. It was a paper I dreaded to write but I ended up writing a paper that I was proud of and was very well received. 

Ryan will often bring over guests from the field such as lawyers, cybersecurity analysts and hackers, and developers from Magnet Forensics. These guests are very insightful and give you a good idea of the industry itself.

The exam was broken into two components: a practical and a theoretical component. The theoretical exam was just a mix of multiple choice and short answers done on Quercus (online) and was conducted during class under the supervision of the professor and the TA. The practical component of the exam was really fun and makes you realize how much you learned from the course. The practical exam was finding evidence on a person's phone if I recalled correctly to see if the person was in possession and manufacturing drugs.

<br/>

<hr class = "line"/>                                                            
# CSC343 - Introduction to Databases
<hr class = "line"/>                                                            

**Professor:** Ilir Dema

**Coordinator:** Ilir Dema

**Description:** As the name implies you learn about databases. The first topic covered in the course will be relational algebra which is just some "mathematical" way to manipulate and gather data. Essentially, think of it as SQL but presented in mathematical notation. Once you learn relational algebra, you learn SQL (Structured Query Language) where you learn all the basic commands to fetch, update, and delete data. You'll learn various types of joins, cursors, SQL Procedures, and triggers. You will also learn how to design databases effectively and what trade-offs you will have to make to avoid redundancy on various normalization techniques. You will also briefly learn about concurrency such as the ACID model, transactions, and locks. The database used in this course is Postgres and does not teach you about NoSQL. This course solely focuses on structure relational databases.

**Review:** This course is essential for any software developer who wants to work on programs that communicate with the database. If you want to work on web development or data science, you must take this course. I found this course not to be difficult at all but I was overconfident and arrogant as I already knew the basics of SQL in grade 11 because it's very simple and had an idea of how to structure data. My arrogance costed me to not get a 4.0 but I still did relatively well. I don't have much to say other than it was interesting to learn there was a way to model and query data in a Mathematical way. In addition, I found the concurrency and normalization lecture very interesting. I also never knew about procedural SQL and found it to be useful. Ilir is a great choice to teach the course especially the relational algebra component of the course. It really seemed like he had fun teaching it. Michael Liut, the prof who now teaches CSC343 is very knowledgeable in the subject and you can clearly see his passion for what he teaches.

<br/>

<hr class = "line"/>                                                            
# CSC347 - Introduction to Information Security
<hr class = "line"/>                                                            

**Professor:** Arnold Rosenbloom

**Coordinator:** Arnold Rosenbloom

**Description:** In this course, you will learn the basics of information security such as buffer overflow, web security (OWASP Top 10), Firewalls, and various tools used in grey hat hacking such as Wireshark, Nmap, SQLMap, and Metasploit that is provided in Kali Linux. Students will learn how to identify possible vulnerabilities in applications, exploit them, and write a patch for the vulnerability.

**TLDR:** 
* You learn a lot
* Very fast-paced course
* Assignments are very time consuming but very practical and useful
* software is not as secure as you think it is
* Exams are held on the lab machines if you have Arnold

**Review:** 

This course is very fun, cool, and interesting. This is one of those courses where you learn how to exploit programs in ways you may have never expected and makes you realize how weak security is in a lot of applications. Taking this course not only teaches you how to exploit programs to gain control of the system or sensitive information but also how to prevent such attacks. Therefore taking this course not only is essential for those who want to go into security but also for developers to be aware and able to identify possible weak points in their projects to prevent data leaks and control of their systems. I highly recommend all students to take this course if you plan to be a developer or enter cybersecurity fields.

I took the course with Arnold Rosenbloom who mainly focused on the application of the course content rather than the theoretical component of cybersecurity. Furkan Alaca, who unfortunately left the University after Winter 2020 to teach at Queen's University, taught the course with a different focus and approach which is equally as great in my own opinion (Note that I never have taken CSC347 with Furkan Alaca so this is all speculation). Both professors are highly knowledgeable about the subject and are great lecturers. Though I never took a regular course with Furkan Alaca, Furkan has taught me a lot during my capstone project giving suggestions and supervising our projects focusing on security.

Arnold pushes students to their limits to be very knowledgeable in the subject and the assignments were very interesting. All the assignments were very practical and I learned a lot from them. At times I wanted to quit working on the assignment but my partner and Arnold gave me the motivation to persevere through the course. The course difficulty and workload is mainly what you would expect in a typical upper-year course. I love the times when Arnold would bring donuts and food to lecture and lab and feed us.

The exam for this course was interesting. This was my first exam on the computer. Arnold wanted to change how we assess students so the exam felt more practical where we are given a series of challenges and questions. The exam was quite enjoyable minus the constant worries that someone would accidentally touch your power cord lightly and have your desktop shut down on you (the power cords were sometimes placed in very inconvenient areas). Furkan Alaca's CSC347 exam was on paper from my knowledge. I suspect Arnold will be teaching CSC347 again now that Furkan Alaca left.


<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/q3_techpanda.org_.png" alt = "An example as to why you should never make an account nor log into any non-SSL encrypted website" class = "center"/>
<p class = "excerpt">A simple lab showing how insecure non-SSL encrypted websites through wireshark. From the image, you can see the password in plain text that the attacker intercepted from the network. <b>NEVER EVER MAKE AN ACCOUNT THROUGH A NON-SSL ENCRYPTED WEBSITE</b></p>

<br/>

<hr class = "line"/>                                                            
# CSC358 - Computer Networks
<hr class = "line"/>                                                            

**Professor:** Michael Liut and Larry Yulei Zhang

**Coordinator:** Larry Yulei Zhang

**Description:** In this course, you will learn the fundamentals of computer networks such as routing, addressing, congestion control, data transfer, and the different layers in networks.

**Review:** This course was very fun and interesting. I learned a lot and loved how the course was structured. Both the TAs and the professors were open and helpful. I attended both Liut and Larry's section because I loved the subject a lot. Larry and Liut have different teaching styles and so it was interesting to see how they teach the same subject in their own style. I preferred Larry's lectures more but I could just be biased because I took a lot of courses with Larry and so was more familiar with his teaching style than Liut. Larry makes his lectures very fun and added Kahoot to his course to test the students their knowledge of the course in a very fun manner. Larry loves using Kahoot and will award stickers to students who win the Kahoot quizzes and also to those who do well on the midterm. Liut on the other hand loves to make connections to the topics covered in the lecture. You can definitely tell Liut knows the subject very well and would often diverge from the lecture to talk about real-life applications and sometimes would need to rush the last few slides to finish covering the lecture or at least that's how it seemed to me. Liut was nice enough to treat us to donuts during the midterm.

Computer Networks is very essential for anyone interested in working on applications that interact with other computers via a network such as the internet. Although the course may not be necessary for web developers, it does gives web developers an understanding of how data is packaged and transported through the network. The course is definitely a lot different from how Joe Lim taught the course. The course under Larry's coordination is much more interactive and enjoyable.

The first assignment was to make a proxy server in Python and was very interesting and fun. Though it could be stressful because a lot of us spent so much time trying to get `select` to work. But it was very fun to learn how proxies work. The second assignment was also very interesting and fun. Although the assignment was less appealing compared to creating a software program where you can interact with, I found the assignment to be more enjoyable. The second assignment was to write a stop and wait (SAW) and a go back n (GBN) data protocol which tests you on your knowledge of the topic. This assignment was so practical from lectures that students did not need to study SAW and GBN for the midterm after completing the assignment. This was the only C assignment in the course so some students disliked the assignment. Since C was my favorite language, I had a blast. In the first assignment, I had struggles recalling the correct syntaxes for Python (it's been a very long time since I last touched Python) and be annoyed with Python's tabbing rule. However, that wasn't an obstacle since Python syntax is very simple and it's just a matter of knowing what functions exist and how to use them so you can avoid writing a lot of unnecessary code.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/proxy_server.png" alt = "An example of a webpage cached by the proxy server created from A1" class = "center"/>
<p class = "excerpt">An example of a proxy server from Assignment 1. The image above shows a cached webpage of Larry's website</p>

The exam was very challenging but fair. Due to Covid-19, the exam was held on Quercus (an online application) and was open book because there's no effective way to prevent students from reading their notes during the exam. All the professors asked us were to not collaborate with each other which I believe most of us complied with. The questions on the exam surprised me and my friends a lot as we were not expecting "open-ended" questions. The professor gave us a long bank of questions that would be helpful for reviewing the course materials. It covered everything we should know for the exam. Since the exam was online, the professor has decided to give a practice exam on Quercus for students to interact with the website to get a feel what the exam would be like along with playing around with their wifi to see how Quercus would respond. For instance, students could try cutting off their internet in the middle of the practice exam and see if their answers remained on the webpage when they reload the page. This was very helpful to alleviate student's fear of encountering IT issues. However, we were all not prepared for the exam format to be quite open-ended where there was not necessarily a right answer but only wrong answers. The questions on the exam had many possible answers or were questions the students needed to have a deeper understanding than usual. Although this should have been expected as the exam was online and open book, a lot of us imagined the exam to be similar to all those practice questions the prof provided us and to the practice exam. 

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/ilir-udp.jpeg" alt = "A Network joke about how handshakes have been switched to UDP due to Covid-19"/>
<p class = "excerpt">An excerpt from CSC209 2020 Official Meme Thread. Posted by Ilir Dema.</p>

<br/>

<hr class = "line"/>                                                            
# CSC363 - Computational Complexity and Computability
<hr class = "line"/>                                                            

**Professor:** Vincent Maccio

**Coordinator:** Vincent Maccio

**Description:** This course covers whether a particular problem is computable in polynomial time or not. Some topics covered in the course were pushdown automata, Turing Machines, Church's thesis,  and complexity theory such as P, NP, NP-Hard, NP-Complete, polynomial time, and reducibility.

**Review:** Vincent is such an awesome professor. I have never taken a theoretical computer science course where I really enjoyed being in class and looked forward to the next class. Vincent teaches theory very well and explains them in a very straightforward way. He also loves to make the class interactive and often gives us time during class to work on problems and then would take up the problems, which is more effective than just telling us the answer. It's such a shame the University did not extend his contract. This course gave me a deep appreciation of MAT102 - Introduction to Mathematical Proofs. A lot of concepts we learned in MAT102 was never used in our academic career with the exception of induction and strong induction and also theorems such as Fermat's theorem and divisibility where we used them in CSC236 or in security courses such as CSC347 and CSC427 when learning about RSA. A lot of concepts we learned from MAT102 were applied in the course such as contour diagonalization. This course is also when I coincidentally found a manga that mentions a few topics from the course: [Rikei ga Koi ni Ochita no de Shoumei shitemita](https://myanimelist.net/manga/99528/Rikei_ga_Koi_ni_Ochita_no_de_Shoumei_shitemita). The manga is about two graduate students trying to prove their love with each other using concepts from STEM. I loved this manga as it brings some concepts from CSC363.

<div class = "double_img center" style = "height: 500px;">
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/363-1.png" alt = "A professor relating dating sims to NP-Hard to motivate his research student" style = "float:left;" class = "img_40"/>
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/363-2.png" alt = "A turing machine that determines whether a person loves each other or not" style = "float:right;" class = " img_60"/>	
</div>
<p class = "excerpt">Excerpt from Rikei ga Koi ni Ochita no de Shoumei shitemita</p>

<div style = "margin-top: 15px; margin-bottom: 15px; margin-left: 15px;">This course is probably the most useless theoretical computer science course you can take at the university but I found it to be the most interesting. The idea of being about to reduce problems from other problems to determine the class of the problem was very fascinating. In addition, it was interesting to know that there are some problems that cannot be solved in polynomial time and how we know which problems are in P, NP, NP-Hard, or NP-Complete.</div>

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/363-3.jpg" alt = "A student questioning why they are learning about computing theory when all they want to learn is how to program a video game" class = "center"/>

The assignments were quite difficult for me to solve but luckily Vincent allowed us to cooperate with anyone as long as we mention that we worked with them. This allowed us to gather in big groups to debate and discuss the problem to eventually come up with the solutions. Since the assignments could be worked with others, the assignments are not worth much and so most of your marks are from your midterm and exam. Since I performed so poorly on the midterm, I was going to into the exam with 55% which was a huge yikes despite loving the course. This was probably the first time I spent an entire week to study for a course (I was lucky to have my exam schedule to be placed nicely to have the time to study). It was fun reviewing every single concept taught in the course during exam week and oddly enough I didn’t feel much pressure. Of course, if I failed the course, I would be at risk of delaying my graduation (I still could retake it in my final year). The exam turned out to be not difficult as I would have expected it to be and I did prepare myself a lot. I ended with 73% at the end of the course, rising 18% from the exam, the biggest jump I ever had in a course. I usually drop 10%-20% from exams (in my first and second year) and so this was quite a nice change.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/363-4.png" alt = "A senior teasing her friend that he would need to repeat a year if he fails his computation theory course" class = "center"/>
<p class = "excerpt">Excerpt from Rikei ga Koi ni Ochita no de Shoumei shitemita</p>

One of my fondest memory in the course was when Vincent joked at us for losing the opportunity to take CSC463 at St. George under Stephen Cook, who has major contributions to the fields of complexity theory and proof complexity and even has a theorem named after him, Cook-Levin theorem. Vincent purposely did not mention this till after the course enrollment deadline and it was a bit of a shame to not be taught by a world-renown Computer Scientist in the field as it was his last semester of teaching undergraduate courses. However, I have no regrets because Vincent is such an awesome professor. A lot of theory courses were often just jargon and a lot of textbooks just complicated a lot of concepts. It is thanks to my professors: Zingaro, Larry, and Vincent who made me appreciate theory even though I am very weak at them.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/363-5.png" alt = "A student being frustrated how textbooks and papers use difficult and abstract explanations in theory courses" class = "center"/>
<p class = "excerpt">Excerpt from Rikei ga Koi ni Ochita no de Shoumei shitemita</p>

<br/>

<hr class = "line"/>                                                            
# CSC369 - Operating Systems
<hr class = "line"/>                                                            

**Professor:** Larry Yulei Zhang

**Coordinator:** Larry Yulei Zhang

**Description:** In this course, you will learn the principles of operating systems such as how it allocates memory and access memory, create and schedule processes, and how filesystems work. Students will also learn about concurrency.

**Review:** I recommend all students take this course to have a deeper understanding of how your program interacts with the operating system. Courses such as CSC369, CSC209, and CSC258 (and also CSC367) are great courses to give students an understanding of how the computer they use everyday works. This course when I took it was taught by Larry who is a great professor and his lectures are very fun. Larry likes to make his test questions very funny and tries to make the course fun such as having Kahoot quizzes where the winner gets a sticker. I had a lot of fun in this course and it's easily one of my favorite courses. 

I do have a confession to make, I did not really do the first two assignments which I still have regrets to this day. I was struggling a lot in trying to grasp functional programming for some odd reason and often left my partner hanging to the last day or two to work on the assignment. My partner was very great and understanding as I gave him prior warnings and he would often see me in the labs from morning to night every day including the weekends working on my assignments or studying for other courses. Though when I brought up my uselessness in the first two assignments up with him more than 2 years later, my partner could not seem to recall it but I can assure you that I did less than 10% of the work in each assignment. I mostly read over his code on the submission date to see what he did and see if I could find any flaws in his implementation. It was right after we received our marks for A2, I decided to ask him to find another partner because I was doing a great disservice to him. We ended up getting almost 100% except for the part I worked on had some flaws which ended up costing us to lose about 5% or more and I felt bad. I worked on a very small part of the assignment on the last day and so was likely to have some flaws. I think this was when I also decided that I would never try to let down my partner like this ever again. I hated a lot of my group partners who did this to me and yet here I was doing the same thing as them (hate is a strong word. I still get along with all my former partners no problem. I just will not work with them but I won't mind hanging out with them). It was not a pleasant feeling. The final assignment was implementing various file operations such as delete, create, recover, renaming, and moving files around a filesystem formatted in EXT3. This assignment was considered the hardest but I found it to be the most easiest and fun assignment in the course. However, that is perhaps it was the only assignment I did more than 10% of the work (I ended up writing most of the code in the assignment with the aid of my new partner who was my rubber ducky, being there constantly to give his input and feedback). The assignment was just more intuitive since all you needed to do was read the entire EXT3 documentation to understand where to read and where to write. But the assignment did take a few days to write and I had to consult with my new partner a lot. I am grateful to my new (and old partner) for being there with me the entire time I was writing the assignment. I often would consult with my partner on what I was writing and he would give his thoughts on my process which helped us complete the assignment in a timely manner.

<hr class = "line"/>                                                            
# CSC367 - Parallel Computing
<hr class = "line"/>                                                            

**Professor:** Simon Bogdan

**Coordinator:** Simon Bogdan

 Introduction to aspects of parallel programming. Topics include computer instruction execution, instruction-level parallelism, memory system performance, task and data parallelism, parallel models (shared memory, message passing), synchronization, scalability, and Amdahl's law, Flynn taxonomy, vector processing, and parallel computing architectures. [24L, 12P]

**Description:** In this course, students will learn various aspects of parallel programming. Topics include computer instruction execution, instruction-level parallelism, memory system performance, task and data parallelism, parallel models (shared memory, message passing), synchronization, scalability and Amdahl's law, and Flynn taxonomy. Various frameworks for parallel computing were covered in the course such as POSIX Threads, OMP, MPI, and CUDA programming (programming Nvidia's GPU). Students will learn various profiling tools to figure out where the code is bottlenecking using perf, gprof, and Valgrind.

**Review:** This course is absolutely amazing. Those interested in systems programming and working with systems that need speed, this is the course for you. Every student I talked with who took this course has no regrets and has only positive things to say about the course. I highly recommend students to take this course if they are interested in the subject or just love programming in C. The course covers a lot and is extremely interesting. I was so happy to hear this course being offered at UTM after I came back from PEY and is one of my most favorite courses I have taken at the University. The course covers more into creating programs that take advantage or considerations of the hardware which is unlike any course I have taken before. Some concepts do overlap from CSC369 - Operating System such as synchronization. Bogdan is an amazing professor and I am so grateful to him for bringing the course to UTM and for being an awesome professor.

If you are worried about this course because you know nothing about hardware, do not worry. I didn't know much about hardware either when I first took the course. As it may come as a shock to some people, I didn't even know what a GPU was other than it stands for Graphical Processing Unit. The labs were a lot of fun and the assignments were very interesting other than the first assignment which was very frustrating. This course is unlike any other with the exception of perhaps Operating Systems with Bogdan, there are reports we have to write for every assignment. I never had to write reports for any programming assignment unless it was one of those projects you work on with a team over a few months. In each report, students have to collect data, generate graphs, and report their findings explaining why some methods took longer than others by taking into consideration of the hardware. If you need to remember one thing from the course, memory access is very expensive.


<div class = "multiple_img_div center">
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/367-sample1.png" alt = "A screenshot of a CSC367 Report with graphs" style = "float:left;" class = "img_40"/>
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/367-sample2.png" alt = "A screenshot of a CSC356 Report" style = "float:right;" class = "img_60"/>
</div>
<p class = "excerpt">Some samples extracted from a CSC367 report</p>

The first assignment was investigating the benefits of caches and we were tasked to write a program that measures the throughput of different caches which was very difficult to write. Luckily my partner was able to come up with a program that could measure the throughput and latency of each cache. The second component of the assignment was to profile a given program using gprof and figure out where in the code optimization was needed. The second assignment was applying filters on images using different numbers of threads and methods such as row sharding, row, column-major, and distributing tasks using a work queueing system. The goals were to understand the properties of each method such as why a particular method was slow or why a particular method would perform well on certain types of image dimensions. This assignment was loads of fun and I am very proud of how I wrote the code. I spent a lot of time structuring my code to be beautiful and it's probably the best piece of work I ever have written. The third assignment was working with different parallel computing platforms such as OMP and MPI on a data set, trying out different join techniques. This was neat as you can visualize from the gathered data on how scalable the program was using different numbers of processors and different numbers of computing nodes (using different number of computers). The final assignment was similar to assignment 2 where we apply different methods of partitioning and decomposing data except this time we are using GPUs to perform these tasks. I struggled a lot trying to wrap my head around CUDA programming and therefore was my lowest performing assignment (which was still relatively very good). But it was interesting to see and understand how useful GPUs are in computation.

<div class = "multiple_img_div center">
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/zaku.jpg" alt = "Raw image of a zaku before applying Laplacian filter over it" style = "float:left;" class = "img_50"/>
<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/zaku_filter.jpg" alt = "Image of a zaku after applying a Laplacian filter over it" style = "float:right;" class = " img_50"/>
</div>
<center>Detecting edges using a 9x9 Laplacian of Gaussian filter. A sample what the program in A2 and A4 does</center>

<hr class = "line"/>                                                            
# CSC373 - Algorithm Design
<hr class = "line"/>                                                            

**Professor:** Vincent Maccio

**Coordinator:** Vincent Maccio

**Description:** There are four main topics discussed in the course. At the beginning of the course, greedy algorithms will be discussed followed by dynamic programming and then flow networks. At the end of the course, approximation and randomization would be discussed. P and NP problems will be briefly introduced but not in-depth.

**Review:** This course is another course that is great for interview preparation as it covers topics that one may find in interviews. This course was taught by Vincent Maccio upon being hired, replacing Daniel Zingaro. However, now that Maccio left, Sushant will be replacing Maccio. As usual, Vincent makes the course very interesting and interactive. I don't have much to say other than Vincent is a great professor and it's such a shame the University did not renew his contract despite all the good reviews he has. Vincent is currently working on a video series on this very course, so any student interested in learning what is covered in CSC373 or self-study CSC373 rather than taking the course can watch the videos over at his youtube channel [Professor Vincent Maccio
](https://www.youtube.com/channel/UCKpGnRhm920yZYlf5-nSBuw). I look forward to his videos to refresh the content.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc373.png" alt = "Professor Maccio's youtube channel which hosts video lectures of CSC373" class = "center"/>
<p class = "excerpt">A clip from Professor Maccio's youtube channel</p>

<br/>


<hr class = "line"/>                                                            
# CSC376 - Fundamentals of Robotics
<hr class = "line"/>                                                            

**Professor:** Jessica Burgner-Kahrs

**Coordinator:** Jessica Burgner-Kahrs

**Description:** In this course, students will cover the math and computer science aspect of serial arm robots. At the end of the course, students will be able to identify a robot's design and analyze its kinematic structure, use mathematical representations of rigid body motion, establish and implement the forward, velocity, and inverse kinematic model for serial robot arms. In addition, students will utilize robot simulation V-Rep to have the serial arm find a path to move a ball around an obstacle.

**Review:** This was UTM's first robotics course along with mobile robotics (CSC477). This course started off with about 30-40 students (I will assume 30 because that's the class size currently is for Fall 2020) with a few students on the waitlist but ended with only 17 students. However, this was no fault of the professor and the TAs at all. Read below what I interpreted from the course as to why a lot of people dropped the course.

CSC376 is very math-heavy and so the first month can be quite stressful. A lot of us were really rusty with linear algebra (it's been 2-3 years since a lot of us even taken linear algebra). It really did felt like a math course but the professor and TAs were very nice and helpful. They tried their best to review all the math we were required to know for the course in the first two weeks.


Take note that this was the first time Jessica ever taught the course in Canada (also her first course at UTM) and she normally teaches engineering students back at a German University. Therefore, the experience we have will differ greatly as she has taken a lot of inputs from us and always improved the course as the semester went along. Jessica tried to make us all do a midterm evaluation of the course to see what she can improve and is always open for suggestions. Jessica was not very familiar with what math we have learned or how strong the typical computer science student math ability was.

When I took the course, there were no midterm but rather 3 assignments and one exam. The first assignment was pure math and has gotten a lot of negative feedback. The professor hinted she would change the assignment to be a bit more interactive with robots (it will probably still be math heavy but more interesting and clear cut on the relation with robotics). The other two assignments will still have math but you apply the math learned from class to the robotic arm simulator and was very interesting. The assignments do take a long time and the concepts were not as intuitive for those who have a poor math background. You don't need to be an expert in Linear algebra but you do need to be quite familiar with it by the end to do well in the course. Just practice and you should do fine which I am sure not many in the class did including myself. The prof was smart to put in a quiz after each unit to ensure we were not falling too behind in the course. These quizzes forced me to review the material which helped me with the assignments.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/376_sim.png" alt = "An image of a simulator trying to place a ball through different spots around its surroundings" class = "center"/>
<p class = "excerpt">An image of a simulator trying to place a ball through different spots around its surroundings</p>

Despite the complaints we had, the course average before the exam was in the high 80s (to the surprise of the professor as well). However, the exam did destroy us because we were quite weak in math and only did well on the assignments because of all the hours we put into them along with the fact we had the TA, course notes, and textbook to refer to. The course average was a C and I didn’t do too well on the course either. I CR the course because I had 3 CS exams back to back along with the fact that I had a lot of assignments up to 2 days before my first exam. In my bias opinion, the students were just complaining too much about the Math (including myself) and were too busy to keep up with the material and hence why we did poorly on the exam. I studied only 2-3 hours for the exam (i.e. I was writing my cheat sheet) 8-9 hours before the exam and got the class average. CSC376 was not my priority so I didn’t put enough effort as I should have in the course and most students in the class were taking 4-5 CS courses so it was obvious that no one had the time to take the time to do well in the course. In addition, I didn’t have much interest in the course content compared to my other courses such as parallel computing and so I didn’t put as much effort into this course than I should have. I do know Jessica was not very happy to hear this in the anonymous feedback because we could just take any other elective and be happy instead of just feeling miserable in her class. Jessica wanted to make us excited about the material and I give her credit for it. She did put in a lot of effort to try to make the course enjoyable.

Is the course load heavy? It's about the same as any other CS courses but could potentially take longer because of poor Math background. Almost all CS courses are time-consuming (some more than others like any of Arnold's courses). You will need to realize that taking 4-5 CS courses will mean there will be some sacrifices to make and a lot of sleepless nights as a lot of CS courses tend to have assignments due around the same time.

However, if you really want to take a robotics course, CSC375 sounds more interesting and the 4th year mobile robotics was much better received. A lot of students who took both CSC376 and mobile robotics ended up dropping CSC376 because mobile robotics was much more interesting. I did not take mobile robotics but I do wish I did. To put things into perspective, mobile robotics started with 17 students I believe, and stayed that way at the end. CSC376 had a full class (40 students I believe) with a waitlist but soon became 17-18 students at the end. I am not saying the professor did a bad job, on the contrary, she did an excellent job. Mobile robotics is just so much more interesting than serial arm robotics and the focus was just different.

According to course evaluations, the course has fairly good reviews. We also had an anonymous midterm evaluation which was very interesting. The comment she hated the most was mine and the comment she loved the most was also mine.

## Questions to Consider Before Taking The Course

Anyways, would I recommend this course? It depends and here are some things to consider:

1. Do you mind doing Math that has applications to something you can visualize and interact with? If yes then take it

2. Do you want to be a roboticist or is the field you are interested in something such as systems or web development? Perhaps take it after looking at what other CS courses have to offer that would be useful to your focus or for career

3. Is this course useful for my career? It isn't if you are not going into robotics that deals with serial arms.

4. Are you great at Math? If yes, then take it.

5. Are you sick of doing Math after multivariable calculus or some other math course? Don't take it

6. Am I taking more than 3 CS, Math, and Stats course? If yes, take caution that you will be losing sleep and be stressed. I recommend not taking more than 3 CS courses/semester but you could do more than 3 CS/semester, it's doable but can be hard at times.

7. I am interested in robotics. Then consider taking other robotics courses before CSC376 such as mobile robotics (CSC477). CSC376 was not a bad experience but I think other robotic courses are potentially more interesting. Moving a robotic arm isn't all that exciting compared to a moving car or a more programming heavy robotics course (I would assume. However, I can attest Jessica is a great professor and the TAs are great. So I do suggest you take all the robotics courses if you plan on going into robotics which is very premature right now as it's very new to the school.

<br/>

<hr class = "line"/>                                                            
# CSC384 - Artificial Intelligence
<hr class = "line"/>                                                            

**Professor:** Sonya Allin & Alex Poole (St. George), Ilir Dema (UTM)

**Coordinator:** Sonya Allin (St. George), Ilir Dema (UTM)

**Description:** In this course, you will go through concepts from classical AI. This course does not cover machine learning and is often referred by students as AI up to the 1990s. Core topics covered in the course are search methods, game tree search, knowledge representation, reasoning under uncertainty, bayesian network.

**Review:** Unfortunately, I deleted all my files related to this course without backing them up so I will have to go with my memory which I have mostly been doing anyway for this review. I have taken this course twice, once during my internship and the other in my final year. This course was quite interesting for the first half before we talked about the Bayesian network. I was never interested in statistics and AI so I did not put enough effort compared to what I should have. The reason why I took this course twice was that on my first attempt, I found myself running away from reality too much by overworking at my internship to avoid thinking about the course. I loved going to lectures but I did not want to start the assignment. I eventually did the assignment and got a really good mark but decided for my mental health, I should drop the course because I was overworking to not think about the assignments. I enjoyed the lectures when I first took the course and would always review the course content every week during the weekends. Sonya and Alex are amazing professors and makes the lectures very engaging. I found myself loving their lectures that I would attend them even after I dropped out of the course for another month (I did something similar for MAT334 after St.George decided to remove me from the course).

Although the course may be titled Artificial Intelligence, it's not what you would think. It doesn't teach computers how to learn, it just uses heuristics to make decisions or Bayesian network to infer it's surroundings (I think, I honestly stopped caring about the course once we started to touch statistics). As I wrote in the course description, it's often called the AI till the fall of the Soviet Union (which was in 1991). I found search algorithms, game tree search, and CSPs very interesting because I would imagine what I could do with them on classical games I love to play such as sudoku or even in Pacman. 

At UTM, the assignments are traditionally based on Berkley's AI course and so there was rampant cheating in the course over the years apparently. At St. George, the game was different so I was surprised UTM never changed their assignments earlier. When I took the course in 2020 with Ilir, he decided to revamp all the assignments and make them unique. He even told us he would be surprised if we could find the solution online because all of the assignments were remade.

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc384-a2.gif" alt = "A sample of Assignment 2: Sokoban. The AI is avoiding the enemy while also trying to collect all the items on the map" class = "center"/>
<p class = "excerpt">An image of a simulator trying to place a ball through different spots around its surroundings</p>

On my second attempt, I found myself struggling on the assignments (though I manage to do them all in one or two days so perhaps I am just exaggerating). I found myself that I have to think very differently from what I usually think and often found using my experience and concepts I learned from CSC324 - Functional Programming very useful. It helped me finish the assignments in a timely manner and did very well in them. I guess I was feeling very odd with the assignments because it forced me to think differently. Although I did well on the assignments, I got a 0% on the final assignment because I never bothered to work on it. I found myself having a hard time focusing on lectures once Ilir started to teach about statistics and the Bayesian network because I was not interested in the topics (this is where I stopped attending lectures during my first attempt the year before). I did review all the slides until he taught Markov Chain before considering whether or not to start on the assignment. Since I decided to CR this course a long time ago and was doing quite decently in the course, I decided it was fine to forgo the last assignment and focus on writing a 25+ page paper for my capstone which I decided to write alone. I did not CR the course because of Covid-19 as I CR this course way before March 13. I was just more interested in investing more time in other courses.

Due to Covid-19, Ilir decided to remove the 40% rule, and thank goodness he did. Since I CR CSC384 and didn't feel like studying, I ended up studying for 4-6 hours for the exam only. Instead of studying for CSC384, I decided to read Linus Torvalds, the creator of Linux and Git, thesis paper for his Masters. It's titled ["Linux: a Portable Operating System"](https://www.cs.helsinki.fi/u/kutvonen/index_files/linus.pdf) and it was a fun read (though I only read half of it). Anyways, enough of diverging from the topic. The exam was a lot more difficult than I expected and this is not due to the exam being harder than usual. It's due to my lack of studying and preparedness. I ended up failing the exam with less than 40% on the exam. However, I soon found out that the course exam average was less than 40% as well. Yikes ... Not sure if it's because everyone decided to not study for the exam or the exam was truly much harder. According to the TA, the exam was all fair game and is the same difficulty as any year. Ilir was very shocked by the result but decided to not bell curve the class because the exam was very fair in his eyes in which I would probably agree. Ilir if you are reading this, I have to apologize for being a bad student.

If you are wondering which campus I liked more for CSC384, I would have to say I prefer Alex and Sonya's lectures much more than Ilir. Ilir is a great man but Alex and Sonya are just much better at teaching and makes the course very interesting. Despite calling myself Ilir's Fan on Discord (my group's CSC301 name was Ilir's Fanclub from my memory), I don't think Ilir is the best lecturer. I love Ilir for being fun to talk with during office hours, his kindness, and easy to approach for help. His love for Mathematics made me rethink how I should approach Math since I always disliked Math. On a random thought, the only time I ever paid attention to Ilir's lecture in CSC384 after CSPs were taught was when Ilir was reviewing concepts from STA256, a probability and statistics course we all have to take in 2nd year. There was a slide talking about finding what could have caused this person to turn into a squirrel and we needed to have the probability of what the human ate to turn into a squirrel. The reason why I paid attention to this slide was that this was the same example he introduced in my first computing course at University, CSC108 - Introduction to Computer Science. For some odd reason, Ilir decided to bring up probability in the class and spent an entire hour on writing a program in which I assume was Ilir trying to make us have an interest in Math and Statistics. I recall trying to understand what he was saying and writing notes while being fascinated and clueless about his program. It just brought nostalgia. Although I deleted all my notes and assignments for this course, I did find a screenshot of the Squirrel example which I will repost without permission. Please contact me Ilir if you want this image to be taken down (all my images on this blogpost are posted up without permission).

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/csc384-2.png" alt = "A lecture slide trying to figure out why Jacques transforms into a squrriel" class = "center"/>
<p class = "excerpt">A slide that brings back nostalgia from CSC108. Excerpt from Ilir’s CSC384 lecture slides taken without permission.</p>

<br/>

<hr class = "line"/>                                                            
# Reflection of my 3rd year
<hr class = "line"/>                                                            

My third year was very rough for me. I was under a lot of stress trying to do well in University and find an internship at the same time because I was running out of money to continue my education. I could have asked for money from my parents (who earned enough money and could easily fund my education) but I felt that if I wasn't able to find an internship and not do well in University, I was just wasting their money. My parents paid over 70k in tuition and for my living costs yet I was not doing well in University. Sure I was getting over a 3.0 but I was not studying much in my first two years and ended up needing to retake CSC209 and CSC263 because I dropped them in the winter. I wasn't even taking a full course load in second year which felt very bad. Therefore I considered applying to the military as my younger brother did under their Regular Officer Training Plan (ROTP) where the military would pay for your undergraduate in return of serving the military for quite some time. Although my brother joined the military because he wanted to be independent and help my parents save up for retirement, I just applied because I felt like a failure. Fortunately, I got an offer in January so I never entered the military.

My AGPA in 3rd year went up a lot going over 3.5 (which may not seem much to some but my AGPA has always been around a 3.0 or a tiny bit over) due to all the studying I did. My foundation in Computer Science was weak due to the lack of studying I did in my first two years so I had to study a lot. In addition, I am a bit of a slow learner compared to the average human from my observation. I studied on average 60 hours/week or more going to school in the morning till midnight (12 am) every night. I would be at school everyday including Saturday and Sunday. Those were very stressful years but I was able to preserve due to my friend being there with me. I had it so much better than my friend who took 5 CS courses/semester and stayed at school much more than me by coming to school an hour or two before me. I have no clue how my friend did it but it inspired me and I credit my academic success to him. I wasn't even taking a full course load and took only 4 CS courses in the fall and 3 CS courses in the winter (+FSL106 - Functional French-Advanced Beginner and GGR217 - Fundamental to Hydrology). I will forever be grateful to my friend who has made me value my education.

Despite 3rd year being very stressful for me, I enjoyed my classes. 3rd year was very interesting and it made me very interested in Computer Science. I always was debating whether I should major in something else (I wanted to study a real science such as Physics or study Engineering since grade 12 and never thought I would study Computer Science ... i.e. I never applied to Computer Science in High School).

<br/>

<hr>

# Fourth Year (400 Level Courses) - 2 Courses

---

<hr class = "line"/>                                                            
# CSC427 - Computer Security
<hr class = "line"/>                                                            

**Professor:** Arnold Rosenbloom

**Coordinator:** Arnold Rosenbloom

**Description:** In this course, students will present to the class various topics in Computer Security of their choice and hold a tutorial on their topic along with assigning students in the class assignments. This is a seminar-based course where the students teach the class and Arnold would only teach if there isn't anyone presenting.

**Review:** As stated in the course description, this course is a seminar course where various topics are presented by students. Some topics include Nmap, blockchain, buffer overflow, burp suite, iptables, Metasploit, ransomware, RSA, shellshock, snort, social engineering, spectre & meltdown, sqlmap, stegosploit, tls, wifi ,and wireshark.

In this course, most of your grades are based on the lecture you give to the class. Every student will grade your lecture and give feedback. But your grade is based on Arnold's evaluation of your lecture. In previous years, there would be a midterm but for the class of 2020, Arnold decided to assign students 6 assignments which were a collection of topics that Arnold and the students covered. This was to help students prep for the final exam which was to be done on the lab machines (due to Covid-19, the exam had to be heavily modified and just became a take-home exam). In addition to holding a lecture, students needed to hold a tutorial and create an assignment based on their topic as mentioned earlier. For participation marks, we had to give a summary of an episode of the Sans Internet Storm Center, a cybersecurity podcast. On a side note, when I took the course, there were 2 different tutorial sections. Attending both sections was mandatory (of course if you had a time conflict, you needed to tell Arnold so he is aware of it).

When working on a lecture to teach the class, students are to consult with Anthony Tam, the TA, to ensure the quality of the lecture and tutorial was good.

Due to Covid-19, the content and delivery of the exam were very hectic. Arnold could not give us an answer on how the exam was going to be because he had to wait for the registrar to approve his plans. There were lots of concerns, especially from me because Arnold wanted to give us an image and have us break into it. I mainly relied on using the lab machines for my assignments because my laptop is very weak. Although my current laptop was much more stable than the laptop I used in my 3rd year which would frequently die on me whenever I worked on my assignments. It was still not strong enough to handle the workload I would need for the course. My laptop had died on me before when I was doing the labs for this course because I could not enter the labs due to Covid-19. I was concerned that others may be in the same situation so I was really against an exam that required us to use a virtual machine unless the exam didn't require us to use any computational heavy tools. Though I deemed my laptop to be powerful and stable enough to do the exam, I warned the professor that others may not be able to do the exam (along with the fact that some students didn't even install VMPlayer on their machine for some very odd reasons that I don't know why. I guess they weren't doing the labs). I am sure Arnold was equally or more stressed about how he was going to deliver the exam.

I did CR this course, taking advantage of Covid-19 where the University allowed us to CR any number of our courses. However, I ended up doing very well and almost got a 4.0 in the course.

<img src = "../assets/utm/unrealircd-exploit.jpg" alt = "An image of metasplot exploting a server" class = "center"/><!-- image source: I no longer remember but I do not think it's owned by me-->
<p class = "excerpt">An example of what a typical lab metasploit lab would be in the course. Excerpted from a random <a href = "https://cyberarms.wordpress.com/2012/08/08/metasploitable-2-0-tutorial-part-3-gaining-root-from-a-vulnerable-service/">here</a></p>

<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/427-steg.png" alt = "An image of metasplot exploting a server" class = "center"/>
<p class = "excerpt">Code embedded within the image of Ilir I found online. This was part of the assignment I assigned to the class. The hidden code is just a makefile I wrote for my capstone</p>

Here are some links to my presentation, tutorial, and assignment I gave in CSC427 to get an idea what the course is about:

[Presentation](https://docs.google.com/presentation/d/1ds_zIVyXujQgrqvXlgynuJ9Kty_fJerZHJjHCN8QvaE/edit?usp=sharing)

[Click here for the tutorial](https://docs.google.com/document/d/1uTYLFG0eYiK4HAN4R3wSJdpXl4f3-XpMkIbxeQCpNgo/edit?usp=sharing)

[Click here for the assignment](https://docs.google.com/document/d/1u-82tvRmDRIvTzdI0OZMdwuuBMb-IpCvgkMFRi3FybQ/edit?usp=sharing)

<br/>

<hr class = "line"/>                                                            
# CSC490 - Capstone Design Courses
<hr class = "line"/>                                                            

**Professor:** Furkan Alaca

**Coordinator:** Furkan Alaca

**Description:** In this course, students are to create a project with the focus on being cybersecurity. This course is just a project implementation course and no you don't work with companies nor have any sponsorship.

**Review:** This course is a project implementation course with the focus being in Cyber Security. Most students tackled the inherit weakness of password-based authentication by providing alternatives to passwords. Not all groups worked on authentication such as DeerCoin, a group focused on creating their own cryptocurrency named after our UTM Deers and the Computer Science building - Deerfield Hall.

At the start of the course, students are to explore various research papers relating to the project they wish to explore. I mainly looked into kernel programming, Linux Security Modules (LSM), and Trusted Platform Module as I was very interested in working with low-level security systems for the course. However, there were not many who were interested in the subject and so I never ended up working on them. However, the group I joined suggested they would work on making computer login easy by using our phones to authenticate the desktop with zero interaction. This involved needing to work with Linux Linux Pluggable Authentication Modules (PAM) which needed to be written in C. So I worked on the project which we named ProxyAuth for Proximity Based Authentication which would allow users to authenticate their laptops if they are by their laptop and auto-lock their laptop if they are not nearby. This involved learning how to program Bluetooth and program an Android app (which we chose Kotlin over Java). The course consists of having a weekly meeting with the professor and TA to talk about your progress and any issues you have. The professor and TA help refine your project and often can guide you through your issues. Every 2 weeks, every group is required to demonstrate what they have so far to the class. It was often interesting to see how other groups progress and ask questions about their project. At the end of the course, not only do you have to demonstrate the project to the entire class, but you also need to write a 20-page report on your project. Normally this would be done together by the entire team but I got fed up with the team and was going through some stressful time that I requested the professor if I could just write my report separate from the team and was granted permission.

<div class = "multiple_img_div center">
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/proxy-1.png" alt = "Title page of my paper" class = "img_33"/>
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/proxy-2.png" alt = "Table of Contents of my paper" class = "img_33"/>
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/proxy-3.png" alt = "The first page of my paper" class = "img_33"/>
</div>
<p class = "excerpt">An example of what my final capstone paper looks like in CSC490. A lot of work to write one alone. Reports are usually written together with the team. Tex is great :D</p>

<div class = "multiple_img_div center">
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/vesta-1.png" alt = "Title page of my paper" class = "img_33"/>
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/vesta-2.png" alt = "Table of Contents of my paper" class = "img_33"/>
	<img src = "https://raw.githubusercontent.com/zakuArbor/blog/master/assets/utm/vesta-3.png" alt = "The first page of my paper" class = "img_33"/>
</div>
<p class = "excerpt">Another example of a capstone project final report looks like. Taken without permission from the internet</p>

Working on a big project for a semester with a group of students teaches you a lot. Most students don’t have the opportunity nor work on a big project in their undergrad (I recently heard that CS minors may need to take capstone, limiting them to 2 upper-year CS courses instead of 3 of their choice). Capstone gives you all the freedom to work on a project for an entire semester with no assignments, no exams, and tests. However, you are constraint to the theme of the professor’s choice. Some topics I recall being focused on the course over the years were video games and security. When you work on a big project such as the ones in the capstone course, you are required to do a lot of research and often need to learn about new frameworks, languages, and tools. I learned a lot from the project. Before working on the project, I did not know what Linux PAM was, the difference between dynamic linking, how to program Bluetooth in both C and Android, Kotlin, and d-bus. It was satisfying to learn all of these technologies and the project does look good on my resume.

One of the important things you need to learn at University is the importance to find a good group (which I rarely found). It was very hard to manage my group and have them contribute something to the project. The team had different motivations, expertise, and experience so you need to know how to work with a diverse group (which I failed to). I was not very happy with some of the team’s knowledge and progress and often found myself doing a lot of the work. I mainly focus on programming the desktop component of the project which was the Linux PAM and a de-authentication program that would continually check if the mobile phone was nearby. I also had to work on the Android app as the team was falling way behind on schedule. I learned that my team and I need to improve our leadership, teamwork, and communication skills if we want to work together without much friction and delays. I probably will explore some training on teamwork and communication sometime near the end of 2020 to avoid repeating these mistakes.

You can view my final capstone report over [here to have an idea how a typical capstone report looks like.](https://raw.githubusercontent.com/zakuArbor/proxyAuth/f9b11b29a38da0ecaa10ab914d230f2432c98656/kim_proxyauth_paper.pdf)

<br/>

---

# Conclusion

---
I hope my bias review was not too boring for you. Thanks for checking out my blog and I hope you have a great time in your studies. Computer Science is very broad which gives you the flexibility to focus on what you want (though if you are in CS Specialist, you are forced to take courses you may not want to take)

It is a shame that I will be graduating soon yet I could not take all the courses I wish to take. There are lot of fascinating courses at UofT that are offered at both campuses. Some courses I would love to take are:
* CSC320 - Introduction to Visual Computing 
* CSC375 - Programming Mechatronic Systems
* CSC469 - Operating Systems Design and Implementation
* CSC488 - Compilers and Interpreters

Another shame is the fact that I never was able to become a TA for any courses (particularly CSC209). I'll probably keep on trying to become a CSC209 TA even after I graduate. Perhaps I'll see you guys in any of the courses I wish to take in the future if I get permission from my employer.

---

# Credits

---

I thank all the professors, TAs, and friends I have met at the University for giving me an overall positive time at UTM. I have learned a lot and am still continually learning to improve my skills and knowledge. Particular thanks to those at the White Van Discord group (a Cool and Vibing community of Math, Stats, and Computer Science students) for providing some of the images in this blog and also for their feedback. You can join the community over here: [http://www.white-van.xyz/](http://www.white-van.xyz/)

Thanks to [Skelzore](https://www.reddit.com/user/Skelzore/) for suggesting to upload this blog on r/UTM and to others who have read parts of my bias review.
