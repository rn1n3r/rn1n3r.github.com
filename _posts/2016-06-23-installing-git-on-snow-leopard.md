---
layout: post
title: Installing git on OS X 10.6.8
---

Today, I set out to install git on my work computer; I figured that it would be helpful, in addition to providing version control, to have my work easily accessible on my laptop. I asked someone with admin privileges to just let me install git 2.7.1 using the Mac OS X installer, but it turns out that Snow Leopard is just too old, and not supported (for anyone who might have the <strong>Illegal instruction</strong> error). As someone who primarily uses Windows, I really have no feel for the different versions of OS X and how old everything is, so that didn't help.

I didn't want to bother my coworker, so I set out to just build git from source. The version that works is [git 1.8.4.2] (https://www.kernel.org/pub/software/scm/git/git-1.8.4.2.tar.bz2), according to the Internet. Maybe a newer version works, too, but I've already spent too much time on this. On my first attempt, I actually installed 1.6.4.2, following the instructions [here] (http://hivelogic.com/articles/compiling-git-on-snow-leopard/).

Anyhow, one thing that really messed me up was that I kept forgetting to run the configure script. I thought that all the 'configuration' was done in the make file, but I guess I was wrong. In any case, you can install git locally (no admin privileges :cry:) like this:

    tar xzvf git-1.8.4.2.tar.bz2
    cd git-1.8.4.2
    ./configure --prefix=$HOME/local
    make
    make install
    alias git='$HOME/local/bin/git'
