---
title: Jekyll archives without plugins
tags:
    - code
    - jekyll
images:
    -
     image: 2015-09-01-artwork.jpg
     set: artwork
    -
      image: 2015-09-01-archive-folders.png
      set: folders
---
I recently made the switch to [Jekyll](http://jekyllrb.com) as my publishing tool for this website. I love it, not least as it lets me serve content directly from Github. Updating the site is as simple as pushing into my repository. I have no servers to maintain and no extra monthly costs. For a low traffic site it seems, for now at least, like the perfect solution.

{% include figure.html set="artwork" class="pull--both" %}

To me, one of the most interesting things about writing a blog is the ability to look back, to make old posts new again with an easily navigable archive section. A key part of that is the 'archives for year ...' page. However, hosting with Github pages means that I can't use plugins for Jekyll that you'd normally need to achieve this. Jekyll doesn't really offer much in the way of core functionality for archives, but with a bit of hacking you can create an archive page for every year in a way that doesn't suck.

We can use the power of [Jekyll collections](http://jekyllrb.com/docs/collections/) to _somewhat_ automatically generate an archive page for each year your site has posts. There's three main parts to the setup:

1. Configure a collection for archives.
2. Create a post for each year for which you want an archive page.
3. Create a layout for processing each archive post into <abbr title="Hyper Text Markup Language">HTML</abbr>.

---

##Configure the archives collection
First, we need to tell Jekyll about our new collection. In my site configuration file, (usually `_config.yml`) I added the following:

{% highlight yaml linenos %}
collections:
  archives:
    output: true
    permalink: /archives/:path/
{% endhighlight %}

This tells Jekyll that we want a collection called **archives**, that we want it to output an `index.html` for each item in the collection, and we want it to do so under the `/archives` url. 

---

##Create a post per year
Our new archives collection will read any markdown files in a folder named `_archives`, so we'll have to create a post for each year your site has posts in this folder. This is why I say that this method is only _somewhat_ automatic, however we'll only every have to worry about updating this once per year.

For example, if we want an archive page for 2015 at `archives/2015` we'd create the post `_archives/2015.md`. The only thing that's really required here is YML front matter, here's a simplified version of my `2015.md`:

{% highlight yaml linenos %}
---
title: Archives for 2015
year: "2015"
layout: archive-year
---
{% endhighlight %}

Don't forget the quotation marks, the reason for them will shortly become apparent. 

{% include figure.html set="folders" class="u-boxout push--left" image_size="small" %}

Here's a simplified view of my local folder setup showing all the markdown files for each year in the `_archives` collection. 

The `archives` folder contains the `index.html` file for the root of my archives section.

---

##Archive page layout
Now we need to define a layout that Jekyll will use to output each archive page. I did this in a layout  `_layouts/archive-year.html`. Here's a simplified version of my file:

{% highlight html linenos %}{% raw %}
---
layout: default
---
<h1>{{ page.title }}</h1>
<ul>
{% for post in site.posts %}
    {% capture post_year %}{{ post.date | date: '%Y' }}{% endcapture %}
    {% if post_year == page.year %}
            <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>       
    {% endif %}
{% endfor %}
</ul>
{% endraw %}{% endhighlight %}

Its all pretty simple really. We're looping though all the posts on the site, and only displaying them if they match the target year. By the way, those quotation marks from earlier are required for matching the  `post_year` with `page.year`, which both have to be strings

And that's it. A _sort-of_ automatic way to generate an archive page-per-year. 