---
layout: post                                                                    
title: Solving Repeating Integration by Parts through Isolation
description: A technique to solve repeating integration by parts by isolation.
categories: [math]                                                
---

Currently, I am enrolled in a Calculus course named Calculus and Introductory Analysis II this semester where I get to revisit
various concepts of Calculus such as integrations. While I have done calculus many years ago, I never appreciated the subject 
nor was proficient in the subject.

There is a concept called Integration by Parts which is derived from the product rule that was taught in Calculus I. 
What piqued my interest was a technique of isolating the integral when a repeating pattern occurs whereby the integral 
of $u^\prime v$ (i.e. $\int u^\prime (x)v(x)dx$) is the same as the original question. This may seem like you are stuck in a loop. But 
this is actually a step closer to the final solution. Similar to solving for x in a normal math expression where x is 
the unknown, you can treat the original integration question as a variable such as **I** and solve for **I** to find 
the integral of the function.

For instance, let's consider the following problem:

$$
\begin{equation*}
\int \sin(x)\cos(x)dx
\end{equation*}
$$

Using integration by parts involves picking one term as u and the other product as v' (the derivative of v).
In this simple example above, it does not matter whether you pick **sin** or **cos** as u. I will arbitrarily 
choose u to be sin(x) and v' be cos(x). That would mean **u' = cos(x)** and **v = sin(x)**. So the next step 
is to plug those terms into the integration by parts formula as shown below:

$$
\begin{align*}
\int \sin(x)\cos(x)dx &= uv - \int u'vdx \\
&= \sin(x)\sin(x) - \int \cos(x)\sin(x)dx 
\end{align*}
$$ 

Now we are stuck because the term under the integral is the exact question (i.e. the same function) we 
are trying to solve for. If we were to continue, we would find ourselves in a loop. This is where 
setting the function we are trying to integrate for as a variable (just for simplicity but you could 
just leave it as is) which I will say is **I** (i.e. $I = \int \sin(x)\cos(x)dx$) and solve for the variable as seen below:

$$
\begin{align*}
\int \sin(x)\cos(x)dx &= \sin^2(x) - \int \sin(x)\cos(x)dx \\
I &= \sin^2(x) - I \\
2I &= \sin^2(x) \\
I &= \frac{1}{2}\sin^2(x)
\end{align*}
$$

<center><b>Note:</b> You need to add the constant <b>C</b> since it's an indefinite integral so the final result looks like the following:</center>

$$
\begin{align*}
\int \sin(x)\cos(x)dx &= \boxed{\frac{\sin^2(x)}{2} +C} & 
\end{align*}
$$


