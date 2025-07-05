---
layout: post
title: "The Issue With Default in Switch Statements with Enums"
description: Default suppresses warnings that may not be desirable
categories: [programming, c/c++]
---

Reading the coding standards at a company I recently joined revealed to me the issue with default label within the switch statement and why it's prohibitted when its being 
used to enumerate through an `enum`. `default` label is convenient to handle any edge cases and it's often used to handle errors. However, when working with enums, it is often 
the case that the prpogrammer intends to handle all possible values in the enum. To catch this mishap, programmers would enable `-Wswitch` or `-Werror=switch` to their compiler.
For instance, let's suppose I have an enum named **Suit** to represent the different suits in a deck of cards. 

```c
enum Suit {
  Diamonds,
  Hearts,
  Clubs,
  Spades
};
```

Let's suppose I forget to enumerate through `Spades`:
```c
switch(suit) {
  case Diamonds:
    printf("Diamonds\n");
    break;
  case Hearts:
    printf("Hearts\n");
    break;
  case Clubs:
    printf("Clubs\n");
    break;
}
```

Then I'll get the following warning:

```
$ LC_MESSAGES=C gcc -Wswitch /tmp/test.c
/tmp/test.c: In function ‘main’:
/tmp/test.c:12:3: warning: enumeration value ‘Spades’ not handled in switch [-Wswitch]
   12 |   switch(suit) {
      |   ^~~~~~
```

**Note:** `LC_MESSAGES=C` is just to instruct GCC to default to traditional C English language behavior since my system is in French

Based on GCC Documentation on [Warning Options](https://gcc.gnu.org/onlinedocs/gcc-4.3.2/gcc/Warning-Options.html):

```
-Wswitch
  Warn whenever a switch statement has an index of enumerated type and lacks a 
  case for one or more of the named codes of that enumeration. 
  (The presence of a default label prevents this warning.) 
  case labels outside the enumeration range also provoke warnings when this 
  option is used. This warning is enabled by -Wall. 
```

Based on the documentation, we should no longer see the warning anymore if we add a `default` label:

```c
switch(suit) {
    case Diamonds:
      printf("Diamonds\n");
      break;
    case Hearts:
      printf("Hearts\n");
      break;
    case Clubs:
      printf("Clubs\n");
      break;
    default:
}
```

And as expected, we see no warnings:

```
$ LC_MESSAGES=C gcc  -Wswitch /tmp/test.c
$
```

However, I notice a similar warning option in the documentation which will catch this misbehavior even with the `default` label:

```
-Wswitch-enum
    Warn whenever a switch statement has an index of enumerated type and lacks 
    a case for one or more of the named codes of that enumeration. case labels 
    outside the enumeration range also provoke warnings when this option is used. 
```

So regardless if we have a `default` label or not:

```
$ LC_MESSAGES=C gcc  -Wswitch-enum /tmp/test.c
/tmp/test.c: In function ‘main’:
/tmp/test.c:12:3: warning: enumeration value ‘Spades’ not handled in switch [-Wswitch-enum]
   12 |   switch(suit) {
      |   ^~~~~~
```

On a side note, `-Wall` will not catch this misbehavior if a `default` is present:
```
$ LC_MESSAGES=C gcc  -Wall /tmp/test.c
$ 
```

This is because `-Wall` enables most warnings but not all warnings. Based on the documentation, we see that `-Wall` enables `-Wswitch` instead of `Wswitch-enum`.
