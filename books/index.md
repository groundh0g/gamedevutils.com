---
layout: page
---

# Books Hosted on This Site

This is a description of the collection.

<hr/>

{% for file in site.pages | sort: "path" %}
    {% if file.path contains "books/" and file.path contains "/summary.md" %}
<img src='{{ file.path | replace: "/summary.md", "/cover.png" | replace: "books/", "./" }}' style="float:right; width:170px; margin:0 20px;" />
{{ file.content | markdownify }}<a href='{{ site.baseurl }}/{{ file.path | replace: "/summary.md", "/" }}'>Show Me &raquo;</a>
<div style="clear:both"></div>
<hr/>
    {% endif %}
{% endfor %}
