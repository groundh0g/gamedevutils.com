---
layout: post
category : news
tagline: 
tags : [ welcome ]
---

I rethought my approach to the bitmap fonts tool. I was self-hosting 2,000+ public domain fonts from various sources, scripting a JSON descriptor to tie things together, and loading the TTFs as data urls. I've moved to the [Google Fonts](https://fonts.google.com/) API. That drops the collection to around 800+ font families (with 1,700+ veriants), but it's a cleaner interface that doesn't use gigs and gigs of storage on my side of things.

The work-in-progress is [live now](http://gamedevutils.com/webapps/fonts/).

Feel free to kick the tires, then [offer feedback](https://github.com/groundh0g/gamedevutils.com/issues) if you think of a better direction or approach. Just remember that this is a sneak peek, and that means that functionality is flaky while the tool is in development. Don't expect to be able to save your work.

Thanks for taking the time to check out my little pet project. Feedback appreciated.

&mdash; [@groundh0g](https://twitter.com/groundh0g)