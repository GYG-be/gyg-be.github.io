---
layout: post
title:  "Increase Experimentation with DISPOSABILITY"
date:   2024-10-01 4:30:00
categories: template
---


## The whole point of WSL is experimentation

Disposability matters when you want to have multiple environments on your machine ... to be able to try and compare multiple wild and crazy environments ... and then DISPOSE of those environments ... thus WSL is about radically increasing the amount of experimentation in a personal workflow ... it's best to try several things, compare, settle on what works and then experiment with something new.

This is what WSL is for ... trying lots of environments simultaneously ... seeing which works better.  

It's not for people who are inflexible and want their workflow to be ***JUST SO*** ... it's for people who embrace the discipline to continously improve with experimentation.

You are probably not going to fall in love with any of these environments or operating systems ... but you might be more interested in *trying on* different beta environments or packages not yet released to see how everything fits ... OR ... you might need to examine old environments [that people are still using] to re-create a problem or develop for some sort of legacy situation.

## The whole point of WSL is rapid and efficient DISPOSABILITY 

WSL dev enviroments are made to be installed ... then unregistered and deleted ... and possibly re-installed per your installation script or upgraded to your own latest and greatest ***requirements.txt*** file from the `pip freeze --l > requirements.txt` **bash** command. 

Trying on and disposing of different WSL2 distributions can help you think about developing your own [automated] best practices for container upgrading and optimization.

## An example install of using Fedora38 as an example.

(0) As a general rule you will probably find that **working with released container images will be your best** ***starting point***

:rotating_light: :rotating_light: :rotating_light: 

*After you have done several of these, you might want to try with other container images, other layers, other versions of your own container concoctions using [Docker buildkit](https://docs.docker.com/build/buildkit/) or [fedora buildah](https://docs.fedoraproject.org/en-US/iot/buildah/)*

(1) Make a rootfs of an applicable downloaded container image.

For example, let's say Fedora 37 is the latest supported release ... but that you are interested in the beta level [Fedora 38](https://docs.fedoraproject.org/en-US/releases/f38/) ... for a x86_64 system, you would start by downloading the ***.tar.gz** image from [Fedora-Cloud / Docker-Brew-Fedora GitHub repository](https://github.com/fedora-cloud/docker-brew-fedora/blob/38/x86_64/fedora-38-x86_64.tar.xz) ... probably putting it into your Downloads folder ... then you would use something like [7-zip](https://www.7-zip.org/download.html) to extract that downloaded **fedora-38-x86_64.tar.xz** file right into the same Downloads folder.

Rename the extracted **fedora-38-x86_64.tar** file **fedora-38-rootfs.tar** 

(2) In **Powershell**, create a new folder for Fedora38 ... with the command ... `mkdir $HOME\wsl\fedora38`

(3) Also in **Powershell**, you will name the new distro **fedora38** ... with the following **Powershell** command ... `wsl --import fedora38 $HOME\wsl\fedora38 $HOME\Downloads\fedora-38-rootfs.tar`

(4) Check to see that the import happened with the following **Powershell** command ... `wsl -l -v`

(5) Confirm that your new **fedora38** distribution is operational with the following **Powershell** command ... `wsl -d fedora38` ... you will need a new instance of **Powershell** for the dropdown menu for shells to be repopulated with the fedora38 **bash** entry point.

(6) After you into the new distribution with a **root** `#` prompt ... look around in that system and try a few things to test whether everything is as you expect ... for example, we can get a >>> shell/prompt and then use the `help('modules')` command to see the built-in packages that came with Python3.11 inital configuration that was part of the new **fedora38** image.

(7) You will probably want to install basic things like **git** ... `sudo dnf install git` ... then **pip** ... `sudo dnf install pip` ... then for the larger overall system ...

* don't forget to configure **git** with ... `git config --global user.name "Your Name"` ... and ... `git config --global user.email "youremail@yourdomain.com"`
* while pip alone is sufficient to install from pre-built binary archives, up to date copies of the setuptools and wheel projects are useful to ensure you can also install from source archives ... use the command `python3 -m pip install --upgrade pip setuptools wheel` first ... THEN run the `pip list --outdated` command to ensure you can start adding packages 

(8) Use `cd /` to ensure that you are in the `/` directory ... then set up the structure of your distribution with several different [Python environments](0_7_PythonVirtualEnvironmentsPIP.md) ... the form of the command `python3 -m venv cpf38` in which ***cpf38*** would be changed for each virtual environment name, eg, ***cpf38, then cpf38_original, cpf38-1, cpf38-2, cpf38-3***  ... configure each of these different environments with pip after activating the environment, but you probably want to leave TWO, ie both ***cpf38*** as original and ***cpf38_original*** as a backup REFERENCE of the *original* state in case the original ***cpf38*** gets *monkeyed with* ... different environments allow for experimental design in your own development process -- for example, you could add just the **jupyterlab** package to cpf38-1, just **numpy** to cpf38-2, and both the **jupyterlab** and **numpy** packages to cpf38-3.

(9) Start ***using*** the system for what you intend to do, eg development ...test, probing, tracing, debugging the environments as issues arise ... your choice of a trusted toolchain including the IDE, extensions and git tools for WSL2 is strictly a personal matter ... but you probably want do something that tests *everything's sorta normal*, eg that VS Code can clone a repository into a WSL2 distribution OR that you can get an .ipynb test notebook to run, ie that things like the Jupyter kernel / server and packages like the NumPy libraries are at least working ... such that you can save a file and commit your saved edit to a remote repo.

(10) As soon as you have the environments as you want them ... use `pip freeze --local > <*ENV-SPECIFIC*>requirements.txt` ... in which <*ENV-SPECIFIC*> is your identifier to match your env naming scheme.