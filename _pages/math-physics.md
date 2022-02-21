---
layout: page
permalink: /math-physics/
title: Math & Physics
---
Random posts relating to Math and Physics I found to be interesting during my 
exploration of the subject. I'm a total noob in Math and Physics so a lot of 
the content may be obvious.

<ul>
{% for post in site.posts %}
{% unless post.categories contains 'reviews' %}
{% if post.categories contains 'math' or post.categories contains 'physics' %}
<li><a href = '../{{post.url}}'>{{ post.title }}</a></li>
{% endif %}
{% endunless %}
{% endfor %}
</ul>

---

## Course Reviews                                                               
                                                                                
---                                                                             
                                                                                
<ul>                                                                            
{% for post in site.posts %}                                                    
{% if post.categories contains 'reviews' and post.categories contains 'university' and post.categories contains 'math' or post.categories contains 'physics' %}
<li><a href = '..{{post.url}}'>{{ post.title }}</a></li>                        
{% endif %}                                                                     
{% endfor %}                                                                    
</ul>       
