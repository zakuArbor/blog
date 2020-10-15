---
layout: post
title: "A look at Input Buffer and scanf"
categories: [programming, c]
---
Today I learned something new that should have been obvious but it was something I never took time to think about. In Linux, we have three standard streams: `stdin`, `stdout`, and `stderr`. If you are familiar with programming in C, you should know that `stdin` is the input channel that handles data from an input device such as your keyboard.  `scanf` is a `function that scans input according to format` (definition from `SCANF(3) - Linux Programmer's Manual`). But how does `scanf` actually scan the input?

Today I was reviewing some lectures from [a Udemy Embedded C Programming course](https://www.udemy.com/course/microcontroller-embedded-c-programming/) and there was a section on how `scanf` works. It didn't occur to me that the input buffer would contain the newline character after you feed some input from your keyboard. I obviously should have known because when dealing with networks, there would always be `\r\n`(CRLF) in my input. However, my brain didn't make that connection. I always assumed `\n` in my input was just acting like an `EOF` and was not stored into the input buffer. Or that the buffer would be cleared after each `scanf`. For those of you not familiar with what a buffer is, an input buffer is a storage where it temporarily holds data from an input stream until it gets flushed or cleared. Buffer exists because it is not feasible to constantly process data as soon as we read it or write to it. For instance, if we are trying to write to a file on a word processor such as Microsoft Word, you will obviously notice your changes are not automatically saved so you will lose all your progress if the power goes off (though these days, text editors would often keep a temporary file once in a while to prevent total data loss in the event of a power loss). Your changes to the file aren't written to the disk (though it may seem so since your screen shows the changes), till you save the file. This is done to make the program not computationally expensive and slow. Reading and writing to memory is slow, especially writing to a spinning disk.


```c
int i;
printf("Enter a number: ");
scanf("%d", &i);
printf("read integer %d\n", i);
```
**Figure 1:** A simple C program that reads an integer from stdin and outputs to the console what it read
Let's see how the code above behaves in various different output:

**Input:** `"5"`		=>;	**Output:**	`read integer 5`

**Input:** `"    5"`	=>	**Output:**	`read integer 5`

Notice how even after we added space characters or a tab character before the number 5, scanf correctly reads the input, always reading the number 5. scanf ignores whitespaces which is very convenient because we do not need to implement a function to strip the whitespace characters. But what is the data in the input buffer after each string? Let’s modify the code (**figure 1**) to see what is in the input buffer after scanf reads the input 5:

```c
int i;
char c;
scanf("%d", &i);
printf("read: %d\n", i);

printf("Let's check what is in the input buffer:");
while (scanf("%c", &c) == 1) {
    printf("\nread from input buf: %d\n", c);
}
```
**Figure 2:** A simple program to check the next character after reading an integer in the input stream

Let's try running **figure 2** with various inputs and see how the program behaves:

```
$ echo -e "5" | ./a.out
read integer: 5
Let's check what is in the input buffer:
read from input buf: 10
```

Weird, why would `scanf` read 10 from the input `"5"` from `echo`? Recall that `echo` adds a newline character at the end of the output. Just like how we enter numbers if we were to run the program normally. The input `10` is the ASCII code for `LF` (line feed) which corresponds to the character `\n` on Linux.

The input buffer does not get cleared after executing `scanf` as we have seen in the example above. To make this point more clear, here's another example with the input **5A**

```
$ echo -e "5A" | ./a.out
read integer: 5
Let's check what is in the input buffer:
read from input buf: 65

read from input buf: 10
```

As you can see, the next `scanf` read 65 which corresponds to the letter **'A'** in ASCII. I found this fact so obvious but mind-blowing because I have been programming in C but never realized this obvious fact. Does `scanf` mutate the input buffer, popping out scanned characters in the buffer? What happens to the characters in the input buffer before the first occurrence of an integer?

```
$ echo -e "A5" | ./a.out
read integer: 0
Let's check what is in the input buffer:
read from input buf: 65

read from input buf: 53

read from input buf: 10
```

If we try the input **A5**, `scanf("%d", &i)` would fail to scan for an integer because the first non-whitespace character is not an integer but a character instead. The buffer remains unmodified so we read the character **A** (ASCII Code: 65), **5** (ASCII Code: 53), and **\n** (ASCII Code: 10). So `scanf` does not modify the input buffer at all if it never succeeds satisfying the values specified in the format string (i.e. the pointer in the buffer never gets incremented). No matter how many `scanf("%d", &amp;i)` we stack, it'll always read the first non-space character if the first non-space character is not an integer.

## So why does this matter?

Frankly it does not. There's no significant importance for the average programmer. It was just interesting to see because I always thought the buffer would always reset after each `scanf` (i.e. I always thought there was a pointer in the buffer that would be incremented after each character was examined by `scanf`). However, you may notice if you are programming on Windows that your program window would just terminate right after you execute before you get time to visualize the result and process it. Hence why you may see guides telling you to add one or two `getchar()` after your program (you will need two calls to `getchar()` because newline would be counted as a character).
