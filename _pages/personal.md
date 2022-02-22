---
layout: page
permalink: /personal/
title: Personal
---
A random blog about me discussing on various topics that I randomly felt writing. Most of the blogs will probably be slabs of sloppy work.

## Course Reviews

---

<ul>
{% for post in site.posts %}                                                  
{% if post.categories contains 'reviews' and post.categories contains 'university' and page.title != post.title %}
<!--<li><a href = "..{{ post.url }}">{{ post.title }}</a></li>                  -->
<li><a href = '..{{post.url}}'>{{ post.title }}</a></li>
{% endif %}                                                                 
{% endfor %}  
</ul>


## University

---
* [Different Options after HighSchool](../different-options-after-highschool)
* [My Personal Journey in Choosing What to do After High School](../my-personal-journey-in-choosing-what-to-do-after-high-school)
* [First Year of University – Entering a new Environment](../departure-entering-a-new-environment)
* [What is the Best University to Attend](../what-is-the-best-university-to-attend)
* [Going Back to School - Another Undergrad](../going-back-to-school-1)
* [Going Back to School - Why Would Anyone Go Back?](../going-back-to-school-2)
* [Going Back to School - Why I Choose to Study Math and Physics](../going-back-to-school-3)
* [Going Back to School - Expectations and Hopes](../going-back-to-school-4)


## Book Reviews

---

* [5 Centimeter Per Second: One More Side Impression](../5-centimeter-per-second-one-more-side)
* [I Want to Eat Your pancreas: A Heart Breaking Yet Heart Warming Story](../i-want-to-eat-your-pancreas-a-heart-breaking-yet-heart-warming-story)


## Others

---

* [A Reflection of My Internship as a Software Build Intern](../internship-reflection)
* [Using Fedora GNOME VPN Feature](../fedora-vpn-gnome)
* [My 2021 Reading List](../books-i-read-2021)
* [What is Phoenix](../what-is-phoenix)
* [Disturbing Facts about Phoenix: Implementation Part 1](../disturbing-facts-about-phoenix-implementation-part-1)
* [Killing time during Commute by Reading Books](../kill-time-by-reading-during-commute)
* [Ducky One 2 Mini - Replace Caps Lock as Function Key](../duckyone-mini-keyboard)

