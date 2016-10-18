---
layout: post
title:  "Design for Maintainability"
date:   2016-10-18 8:30:00
categories: DFSS, Dfx, Design for Maintainability
---
THE reason that I am interested in open source is flexibility and extensibility [to a degree] but mostly my interest is about MAINTAINABILITY.  

Maintainability does not just spontaneously happen.  Not all that long ago, **it used to be** [and in some cases still is] true that much, if not most, of the Javascript code hacked together by *developers* worldwide is pretty much unmaintainable ***junk.js*** ... this is not a critique of Javascript or ECMAscript language itself; it is a critique of the sloppy practices that are possible.  Javascript [and simply trusting the Javascript of others or enabling Javascript in the *sandbox* represented the web browser] makes lots of crappy, error-prone, spammy and even downright malevolent code possible ... but the *beauty* [and its potential for sheer evil] of Javascript lies in the combination of ubiquity and expedience.  

Now, it might *just work* but maintenance of the code tends to be a matter of the original developer(s) *keeping their heads in the game* and staying engaged to remember how the thing was supposed to work and where the technical debt *anti-treasure* or where the treasure troves of dangerous anti-patterns and [intentionally-bad] virus-enabling *easter eggs* are buried ... in other words, unmaintainable code might expediently *get the job done*, but it cannot serve as a foundation.  It definitely should not be something that is built upon, replicated, cloned, widely-distributed ... ESPECIALLY when the code includes *easter eggs* exploitable weaknesses.

Fortunately the strength of the open source ecosystem is that community includes plenty of really solid computer scientist who understand the reason for producing automate-able tools that serve as antidotes to the creation of new bad Javascript ... these professionals in the open source community have recognized that Javascript's weaknesses are not just a matter of style [as is the case with written documents] but the pervasiveness of bad code replicates even sloppier code -- so better practices must be STRONGLY encouraged with tools that do the heavy lifting.  There are [AWESOME transpilers, linters, build tools, pattern repositories for Javascript](https://github.com/sorrycc/awesome-javascript) and more are constantly being developed, improved and enhanced in the [not always so informal] competition to improve the code of developers around you ... but there's still no substitute for humans who constantly think about maintainability and OTHER USERS ... just as there is no substitute for being skeptical of the *MAGIC* of the *candy* that is distributed based on an intensely widely-used language like Javascript.

---

Maintainability is important because maintainability means thinking about the capabilities of OTHER people and maintaining their ability to be independent and free to protect themselves and advance their cause [without hurting other people]. Taking away the independence of others is one of the most immoral things that anyone can do.  Open source code and data are part of this -- so are distributed information, defense and security.

*"There is much more to be hoped for in an excess of information or of weapons than in the restriction of information or arms control."* — Jean Baudrillard ... from the ***epigraph*** of Cody Wilson's book [Come and Take It: The Gun Printer's Guide to Thinking Free](https://www.amazon.com/Come-Take-Printers-Guide-Thinking-ebook/dp/B01CO34MBI/)
