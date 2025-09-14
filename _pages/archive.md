---
layout: page
permalink: /archive/
title: Archives
---

**Site has been moved to [https://zakuarbor.codeberg.page/blog/](https://zakuarbor.codeberg.page/blog/)**

<div id="archives">
Check out <a href = "../categories" alt = "Cateogries page">Categories</a> to list by categories
  <section id="archive">
     <h2 style="text-align:left;">Most Recent Posts</h2>
      {%for post in site.posts %}
      {% unless post.next %}
          {% else %}
          {% capture month %}{{ post.date | date: '%B %Y' }}{% endcapture %}
          {% capture nmonth %}{{ post.next.date | date: '%B %Y' }}{% endcapture %}
          {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
          {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
          {% if year != nyear %}
      <h2 style="text-align:left;">{{ post.date | date: '%Y' }}</h2>
          {% endif %}
          {% endunless %}
          <p><b><a href="{{ site.baseurl }}{{ post.url }}">{% if post.title and post.title != "" %}{{post.title}}{% else %}{{post.excerpt |strip_html}}{%endif%}</a></b> - {% if post.date and post.date != "" %}{{ post.date | date: "%e %B %Y" }}{%endif%}</p>
          {% endfor %}
  </section>
</div>
