---
layout: page
title: Categories
permalink: /categories/
---

<section>
  <div class="row">
    <h2>All Categories</h2>
    <div class="category-list">
      {% for category in site.categories %}
        <a href="/categories/{{ category | first | slugify }}/" class="category-item">
          <span class="name">{{ category | first }}</span>
          <span class="count">{{ category | last | size }}</span>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

