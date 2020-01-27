---
layout: post
title: Working through the  2019-nCoV reports
---

A team at Imperial College London working with the WHO (I think?) has put together a set of preliminary reports on the 2019 novel coronavirus that can be found [here](https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus/). Here, I will document some of the challenges I personally found while working my way through their analysis. I am not an epidemiologist or a statistician, so this was a great learning experience for me. Any comments I make here could very well be wrong though so let me know.

One reason why reports like this are important is because they allow us to predict how contagious an infectious disease is using a value called the basic reproductive number $R_0$. To predict this, the authors of the reports first generate an estimate of how many cases of the virus were in Wuhan. This analysis is described in [Report 2](https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/2019-nCoV-outbreak-report-22-01-2020.pdf), specifically in the Methods section at the end. They infer this by using the number of confirmed cases detected internationally and estimating the *probability of a particular disease case in Wuhan being detected internationally*. 

## Approximation of international detection probability

My first confusion with this analysis comes with the calculation of this probability. In the Methods section, they describe the probability as being calculated as such:

<p align="center">$p = \text{daily probability of international travel} \times \text{mean time to detection of a case}$</p>

or simply

<p align="center">$p = p_{\text{international travel}} \times \bar{t}_{\text{detection}}$</p>


That... doesn't really make sense as an equation. If the daily probability of travel were 10% (for the sake of discussion), and the mean time to detection was 10 days (the actual estimated time in the report), then you would have a 100% probability of detection oversease. If your daily probability were >10%, then $p$ would be >100%, which makes no sense. Of course the daily probability used in the report was very small (~0.0174%), so that wasn't an issue, but it frustrated me that I didn't understand how this simple equation made sense.

Fortunately, my friend Nancy, who is studying epidemiology, was able to clear it up for me. She explained to me that the equation was probably just approximating the probability of a overseases detection by observing that you were more likely to be detected *overseas* if the detection time was longer. The longer the detection time, the more likely you flew out of Wuhan before you theoretically would have been detected *within Wuhan*. She added that there *are* equations like this in epidemiology where approximations can be made assuming the probability of something (e.g. prevalence of a disease) is small.

And then I realized that we could directly calculate the probability that someone leaves the country within the detection timeframe, and it wasn't a complex calculation, especially since our estimated time to detection is in whole days. The probability can be expressed as the *opposite* of the probability that one never leaves Wuhan in the detection timeframe:


<p align="center">$p = 1-(1-p_{\text{international travel}})^{t_{\text{detection}}}$</p>

Of course when I used this equation, the probability I got was essentially the same as the approximation used. Interestingly, it looks like this equation can be expanded using the Binomial Theorem, and with a quick Google I realized that the authors of the report used [a well-known approximation for estimating binomial probabilities](https://www.johndcook.com/blog/2009/06/25/probability-approximation/). Fair enough, although it would probably have been a good idea to explain the approximation or something. The way it's presented in the report makes it look like a definitive calculation and at the very least caused me great confusion :sweat_smile:.

## Confidence Intervals

The second thing that really confused me concerns the calculation of 95% confidence intervals for the estimated number of cases in Wuhan. In the Methods page, the authors write:

>Confidence intervals can be calculated from the observation that the number of cases
detected overseas, X, is binomially distributed as Bin(p,N), where p = probability any one
case will be detected overseas, and N is the total number of cases. N is therefore a negative
binomially distributed function of X. The results in Table 1 are maximum likelihood estimates
obtained using this negative binomial likelihood function. We now report overall uncertainty
as the range spanned by the 95% confidence intervals of the first three scenarios in Table 1.

Just for personal reference, I'm pretty sure that since $N$ is being modelled by the negative binomial distribution, and we know $p$ from the above discussion and $X$ from news reports, then we *don't need to use a maximum likelihood estimate*. The estimate of $N$ would just be the expected value (mean) of the distribution, and the confidence interval can be built with the distribution quantiles. I may be wrong about this but I don't see any other explanation. [Some discussion (in Chinese) here](https://2049bbs.xyz/t/2545).

Also mostly for my own reference, here's some R code to calculate the mean and CI.

    lower <- qnbinom(0.025, size=7, prob=prob)
	mean <- n*(1-prob)/prob
	upper <- qnbinom(0.975, size=7, prob=prob)

which gives me an estimate of 4022 95% CI [1615, 7507]. This is close to the values in the report ([1700, 7800]), but just off enough that I'm still not sure what's going on. 

My last note is that for calculating the mean of the negative binomial distribution, the equation is $n(1-p)/p$ (Wolfram Alpha) and not $np/(1-p)$ (Wikipedia) simply because the distribution is [defined by Wikipedia as the number of successes before a specified number of failures occur](https://en.wikipedia.org/wiki/Negative_binomial_distribution), and not [the other way around as it is in R](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/NegBinomial.html). 

Hopefully that clears up some parts of Report 2. Again, as of the time of writing this analysis is important because it leads to an expert prediction of $R_0$, which is a big factor to consider when assessing infectious diseases.