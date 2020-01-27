---
layout: post
title: Working through the  2019-nCoV reports
---

A team at Imperial College London working with the WHO (I think?) has put together a set of preliminary reports on the 2019 novel coronavirus that can be found [here](https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus/). Here, I will document some of the challenges I personally found while working my way through their analysis. I am not an epidemiologist or a statistician, so this was a great learning experience for me. Any comments I make here could very well be wrong though so let me know.

One reason why reports like this are important is because they allow us to predict how contagious an infectious disease is using a value called the basic reproductive number $R_0$. To predict this, the authors of the reports first generate an estimate of how many cases of the virus were in Wuhan. This analysis is described in [Report 2](https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/2019-nCoV-outbreak-report-22-01-2020.pdf), specifically in the Methods section at the end. They infer this by using the number of confirmed cases detected internationally and estimating the probability of a particular disease case in Wuhan being detected internationally. The authors take into account the mean time to detection from disease infection and the probability of a given person in Wuhan flying internationally.

My first confusion with this analysis comes with the calculation of this probability. In the Methods section, they describe the probability as being calculated as such:

<p align="center">$p = \text{daily probability of international travel} \times \text{mean time to detection of a case}$</p>
 

    tar xzvf git-1.8.4.2.tar.bz2
    cd git-1.8.4.2
    ./configure --prefix=$HOME/local
    make
    make install
    alias git='$HOME/local/bin/git'
