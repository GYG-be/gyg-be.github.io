---
layout: post
title:  "Containers, Virtual Environments and More Containers"
date:   2024-12-01 4:30:00
categories: template
---


# Python Virtual Environments / PIP / Conda Best Practices Checklist

*TL;DR version* ... the best practice is to experiment with virtual environments and start developing your own best practices checklist.

Containers, immutable operating systems, and WSL2 environments embrace the sandbox ... using ephemeral, disposable for environments for security AND to encouage experimentation rather *having everything JUST SO*. Exploit what ephemerality offers ... install ONLY what you need in container; use different environments within that container ... work toward developing your own automatable development environment set-up process using package managers and your scripts for that package installation process ... instead of conda, trying instead to get your minimalist development environments perfect for your specific needs for that environment ... this means curating YOUR OWN environments with commands such as `pip freeze --local > <*ENV-SPECIFIC*>requirements.txt` and then re-using what works ... even if you don't reuse your pip freeze, you DEFINITELY *should* want to have some awareness of [WTF is installed](0_8_InvestigateInstalledPackages.MD) in your environment with the `pip list` command.

## Understand what conda, venv and pip are ... and the differences ... these things can possibly play well together, but they are not subsitutes and there can be conflicts if they are misused.

* You might think that you can do everything with **pip** and your own well-curated scripts ... *and you can, when you know what you're doing* ... but you should understand the validity of need for conda and why the business model works for serving customers, particularly those using a multi-language environment

* The topic of virtual environments can be confusingAF for beginners ... and, it's not especially clear for even those who think they understand the topic ... but you will want ***carefully read*** [documentation on creating a virtual environment](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment) ... and then you will find, that maybe things have changed or even when you thought you understood it, you will often need to refer back to* some part of [that virtual environment documentation](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment). 

* [venv](https://docs.python.org/3/library/venv.html) (new in version Python 3.3) allow you to manage separate package installations for different projects. When [venv](https://docs.python.org/3/library/venv.html) is used from ***within*** a virtual environment, common installation tools such as pip will install Python packages into a virtual environment without needing to be told to do so explicitly.

* [virtualenv](https://virtualenv.pypa.io/en/stable/index.html) can be thought of as the *old-but-hasn't-exactly-gone-away-former-venv* ... virtualenv was integrated into the [venv module](https://docs.python.org/3/library/venv.html) ***but not until AFTER 3.3*** ... so it has not gone away and you still have to use the *longer-named* [virtualenv](https://virtualenv.pypa.io/en/stable/index.html) for everything in Python 2 and Python 3 that came before 3.3. *virtualenv can be thought of as being sort of like Cobol or Fortran, ie eventually these things will die out, but not until long after you do.* {NOTE: This sort of quasi-but-not-quite-deprecation and half-wise-backward-compatibility is typical in the realm of software engineering ... and it might be getting even more typical. *Get used to it ... but TRY to simplify rather than f-up, ie feature-up, your code.*}

* [pip](https://pypi.org/project/pip/) is the [*recommended* package installation manager for PURELY Python environments](https://packaging.python.org/en/latest/guides/tool-recommendations/).  You can use pip to install packages from the [Python Package Index](https://pypi.org/) and a bajillion other indexes [which you maybe shouldn't use]. It is common in the Python community to refer to a distribution using the term “package” ... which is just plain WRONG. Obviously, the term “distribution” can easily be confused with a Linux distribution, or another larger software distribution like Python itself. {NOTE: This sort of abuse of human language is typical of the realm of software engineering ... in which software engineers are ONLY aware of their particular *environment* and their particular, isolated version of expertise ... and evidently, the abuse of human language is getting even more typical and software engineers get more careless and seem to assume that AI will discern context, so devs can be careless about language and jargon. ***Get used to the pollution of human language with software engineering idioms*** ... but TRY to simplify and be more particular about terminology ... rather than pollute or f-up or feature-up or jargon-up your use of language.}

* Depending on how [pip](https://pypi.org/project/pip/) is installed, you may need to also install [wheel](https://wheel.readthedocs.io/en/latest/) to use the [wheel binary package format](https://peps.python.org/pep-0427/) and get the benefit of the wheel [caching](https://pip.pypa.io/en/stable/topics/caching/). As of pip version 6.0 and thereafter, pip provides an **on-by-default caching** which is designed to reduce the amount of time spent on duplicate downloads and builds, so pip attempts to use wheels from its local wheel cache whenever possible. In cases in which pip’s caching behavior cause undesirable issues, the recommended approach is to directly install from a source distribution instead of letting pip auto-discover the package when it is trying to install. Installing directly from a source distribution will make pip build a wheel, regardless of whether there is a matching cached wheel. As of pip version 20.0, pip caches wheels built from an immutable Git reference (i.e. a commit hash).

* [conda](https://conda.io/en/latest/index.html) is both a package and environment manager and is **language agnostic** ... for ANY language, Python, R, Ruby, Lua, Scala, Java, JavaScript, C/ C++, Fortran, [Go](https://anaconda.org/conda-forge/go), [Rust](https://anaconda.org/conda-forge/rust), [SQLite](https://anaconda.org/conda-forge/sqlite), [PostgreSQL](https://anaconda.org/conda-forge/postgresql), [MongoDB](https://anaconda.org/conda-forge/mongodb) ... *and more* ... thus, Conda is sort the ***recommended*** package installation manager for complicated development environments that probably will not always be purely about only Python, ie practical real-world environments rather than environments only for training people how to use Python.


#### In COMPLICATED mult-language environments ... it might well be most time-efficient to use conda environments FIRST, then use pip only after conda ... your mileage will vary; do not use conda because you are lazy. Know what it's for.

* OF COURSE ... conda recommends that you install as many requirements as possible with conda, then use pip ... YOUR MILEAGE WILL VARY
* pip should be run with --upgrade-strategy only-if-needed (the default)
* Do not use pip with the --user argument, avoid all “users” installs

## create a conda environment to isolate any changes pip makes

* environments take up very little space thanks to hard links
* care should be taken to avoid running pip in the “root” environment
* recreate the environment if changes are needed

## once pip has been used conda will be unaware of the changes

* it is best to recreate the environment entirely in order to install additional conda packages 
* store conda and pip requirements in text files

## know the arguments, eg package requirements can be passed to conda via the --file argument
* pip accepts a list of Python packages with -r or --requirements
* conda env will export or create environments based on a file with conda and pip requirements