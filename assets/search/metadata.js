---
layout: null
---
var search_metadata = [
  {% for post in site.posts %}
    {
      "title": {{ post.title | jsonify }},
      "url": {{ post.url | relative_url | jsonify }},
      "date": {{ post.date | date: "%B %d, %Y" | jsonify }},
      "body": {{ post.content | strip_html | strip_newlines | jsonify }}
    }
    {% unless forloop.last %},{% endunless %}
  {% endfor %}
];
