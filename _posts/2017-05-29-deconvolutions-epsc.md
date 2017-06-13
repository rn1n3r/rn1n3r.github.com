---
published: true
title: Deconvolutions and EPSCs
tags: neuroscience
---

So at the research lab I'm working in this summer, the field of study is in neuroscience. And while that's relatively new and unknown territory for me, I have tried my best to learn and to bring my own experiences and skills to the new problems I face.

##  EPSCs

Part of what I'm doing involves investigating electrical properties of neurons in the spinal cord. Neurons communicate with each other at junctions called chemical synapses. At these junctions, neurotransmitters are released from one neuron (the presynaptic neuron), which causes a change in the receptors on the postsynaptic neuron, causing a flow of ions into the cell. In this way, a neuron receives inputs from many other neurons.

To look at these inputs, the [voltage clamp](https://en.wikipedia.org/wiki/Voltage_clamp) technique is used to hold the membrane potential at a constant level. The current required to keep the constant potential is measured, and the different inputs are represented by spikes, the excitatory postsysnaptic currents (EPSCs). By analyzing the characteristics of these EPSCs (such as the shape of these spikes and their frequencies), we can start to understand the functions of different neurons.

![EPSC]({{site.url}}/public/epsc.png){: .center-image }
*Simulated voltage clamp data*

## Deconvolutions

However, manual detection and analysis of these EPSCs is tedious and subject to observer bias. In [this paper](http://www.cell.com/biophysj/fulltext/S0006-3495(12)00935-6) by Pernía-Andrade *et al*, a method of detecting EPSCs is proposed using *deconvolutions*.

Now, if you don't know what a deconvolution is (or a convolution, for that matter), don't worry (I'm looking at you, future Edward :smirk:). I'll try and break it down here, but I can't promise I'll do a good job. First, we'll start with a description of **linear time-invariant systems (LTI)**. An LTI is a system that is *linear*: meaning that the output of the system is a linear map (where *addition* and *scalar multiplication* are conserved). So if I have an input $x_1(t)$ with an output $y_1(t)$, and an input $x_2(t) \to y_2(t)$, then $3x_1(t) \to 3y_1(t)$, and $x_1(t) + x_2(t) \to y_1(t) + y_2(t)$.  

The second property is *time-invariance*. This is much easier to describe intuitively: it simply means that the output of a given input does not vary with time. Formally, if $x(t) \to y(t)$, then $x(t - t_0) \to y(t - t_0)$.

So let's model our neuron (as described above) as an LTI. Our input signal would be a release of neurotransmitters into the synapse. Our output, or *impulse response*, is the change electrical potential in the cell. Mathematically, we can model these inputs as *delta functions*. Since in voltage clamp, we are holding the membrane potential, then a negative current would be detected to counteract the influx of ions. In short, this is the EPSC. Let's assume we can model this with an exponential function.

Now, given that cells receive many signals over time, how can we get the full electrical activity of the cell? You can imagine that this repeated signalling would be a series of delta functions.

![dirac]({{site.url}}/public/deltafunctions.png){: .center-image }
*Delta function impulses*

We know that each delta function has an impulse response modelled with a exponential function. In the case where these signals are spaced out enough, the overall output signal would just be a series of exponentials corresponding to each impulse (see what I did there?).

![output]({{site.url}}/public/simple-output.png){: .center-image }
*Output function with exponential impulse response*

Easy. But what if these impulses were closer to each other? Then the decay of the exponential response would overlap with the rise of the next response, and the resulting signal would not be as easy to find.

This is where **convolutions** come in. We can get the resulting signal simply by *convolving* the input signal with the impulse response function. Conversely, by *deconvolving* an output signal (such as our voltage clamp trace) with the impulse response function, we can get the input signal!

## Tying it all together

Pernía-Andrade *et al* basically did what we just walked through: he modelled the electrical activity of the neuron as an LTI, and found the input signal (the series of EPSCs) by deconvolving the output (the voltage clamp trace) by the impulse response function (he used a biexponential function). This works out pretty well because in reality, the system is pretty much an LTI:
- It's *linear*, meaning that the EPSC grows linearly with the amount of neurotransmitters released (at least up to a certain threshold that wouldn't normally be reached in the cell),

- It's time-invariant, as the EPSC generated due to an input is the same regardless of when the input is received. It can be argued that experimentally, the cell could start to die during the recording, compromising the activity of the neurotransmitters at the synapse, but for most cases I think the LTI model is accurate.
