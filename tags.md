---
layout: page
title: Tags
permalink: /tags/
---

<section>
  <div class="row">
    <h2>All Tags</h2>
    <div class="tag-cloud">
      {% for tag in site.tags %}
        <a href="/tags/{{ tag | first | slugify }}/">{{ tag | first }}</a>
      {% endfor %}
    </div>
  </div>
</section>
