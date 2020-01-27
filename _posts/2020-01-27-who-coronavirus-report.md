---
layout: post
title: Working through the  2019-nCoV reports
---

A team at Imperial College London working with the WHO (I think?) has put together a set of preliminary reports on the 2019 novel coronavirus that can be found [here](https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus/). Here, I will document some of the challenges I personally found while working my way through their analysis. I am not an epidemiologist or a statistician, so this was a great learning experience for me. Any comments I make here could very well be wrong though so let me know.

One reason why reports like this are important is because they allow us to predict how contagious an infectious disease is using a value called the basic reproductive number $R_0$. To predict this, the authors of the reports first generate an estimate of how many cases of the virus were in Wuhan. This analysis is described in [Report 2](https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/2019-nCoV-outbreak-report-22-01-2020.pdf), specifically in the Methods section at the end. They infer this by using the number of confirmed cases detected internationally and estimating the *probability of a particular disease case in Wuhan being detected internationally*. 

My first confusion with this analysis comes with the calculation of this probability. In the Methods section, they describe the probability as being calculated as such:

<p align="center">$p = \text{daily probability of international travel} \times \text{mean time to detection of a case}$</p>

or simply

<p align="center">$p = p_{\text{international travel}} \times \bar{t}_{\text{detection}}$</p>


That... doesn't really make sense as an equation. If the daily probability of travel were 10% (for the sake of discussion), and the mean time to detection was 10 days (the actual estimated time in the report), then you would have a 100% probability of detection oversease. If your daily probability were >10%, then $p$ would be >100%, which makes no sense. Of course the daily probability used in the report was very small (~0.0174%), so that wasn't an issue, but it frustrated me that I didn't understand how this simple equation made sense.

Fortunately, my friend Nancy, who is studying epidemiology, was able to clear it up for me. She explained to me that the equation was probably just approximating the probability of a overseases detection by observing that you were more likely to be detected *overseas* if the detection time was longer. The longer the detection time, the more likely you flew out of Wuhan before you theoretically would have been detected *within Wuhan*. She added that there *are* equations like this in epidemiology where approximations can be made assuming the probability of something (e.g. prevalence of a disease) is small.

And then I realized that we could directly calculate the probability that someone leaves the country within the detection timeframe, and it wasn't a complex calculation, especially since our estimated time to detection is in whole days.


<p align="center">$p = 1-(1-p_{\text{international travel})^t_{\text{detection}}$</p>


    qnbinom
