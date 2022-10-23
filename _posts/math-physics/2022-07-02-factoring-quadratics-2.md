---
layout: post-math                                                                   
title: Revisiting Factoring Quadratics Into a Product of Binomials (Part 2)
description: Revisiting quadratic factoring but this time with a constant on the highest term
categories: [math]                                                
---

[Previously](../factoring-quadratics) I introduced how to factor a quadratic formula of the form: $x^2 + Bx + C$ but I omitted 
the constant in $x^2$ term (the highest order). That is what we'll be exploring today.

The thought occurred to me while reading [Math Girls](https://www.goodreads.com/book/show/13100316-math-girls) that I did not 
discussed how to factor when there is a constant in the highest order. The thought occurred to me when the book talked about it 
when discussing about the Fundamental Theorem of Algebra which I honestly don't understand. In my previous post, I purposely omitted 
talking about when there is a constant on $x^2$ aside from 1 because I didn't want to think in my head how to derive it (I did remember the rule though). 
Upon reading further into the novel, I got lost when they were factoring some expression that I decided to write it out.

Previously we had the following:

$$
\begin{align*}
x^2 + bx + c &= (x - \alpha)(x - \beta) \\
x^2 + bx + c &= x^2 - x(\alpha + \beta) + \alpha \beta 
\end{align*}
$$

If I want to add 


$$
\begin{align*}
(x + \alpha)(x + \beta) &= 0 \\
x^2 + \alpha x + \beta x + \alpha \beta &= 0 \\
\end{align*}
$$

Then we can collect the like terms:

$$
\begin{align*}
x^2 + (\alpha + \beta)x + \alpha \beta &= 0
\end{align*}
$$

Overlaying the standard quadratic equation (called "additive form" in the novel) with the rearranged equation above, we have the following:

![An image of overlaying the standard quadratic equation with the rearranged equation to show the pattern between B=\alpha+\bravo and C=\alpha \beta](../assets/math-physics/factoring-quadratic.png)

Which is exactly the "ac method" where $B = \alpha+\beta$ and $C = \alpha \beta$.
