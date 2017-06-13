---
published: true
title: Deconvolutions and EPSCs
tags: neuroscience
---

So at the research lab I'm working in this summer, the field of study is in neuroscience. And while that's relatively new and unknown territory for me, I have tried my best to learn and to bring my own experiences and skills to the new problems I face.

##  EPSCs

Part of what I'm doing involves investigating electrical properties of neurons in the spinal cord. Neurons communicate with each other at junctions called chemical synapses. At these junctions, neurotransmitters are released from one neuron (the presynaptic neuron), which causes a change in the receptors on the postsynaptic neuron, causing a flow of ions into the cell. In this way,  a neuron receives inputs from many other neurons.

To look at these inputs, the [voltage clamp](https://en.wikipedia.org/wiki/Voltage_clamp) technique is used to hold the membrane potential at a constant level. The current required to keep the constant potential is measured, and the different inputs are represented by spikes, the excitatory postsysnaptic currents (EPSCs). By analyzing the characteristics of these EPSCs (such as the shape of these spikes and their frequencies), we can start to understand the functions of different neurons.

![EPSC]({{site.url}}/public/epsc.png){: .center-image }
*Simulated voltage clamp data*

## Deconvolutions

However, manual detection and analysis of these EPSCs is tedious and subject to observer bias. In [this paper](http://www.cell.com/biophysj/fulltext/S0006-3495(12)00935-6) by Pernía-Andrade *et al*, a method of detecting EPSCs is proposed using *deconvolutions*.

Now, if you don't know what a deconvolution is (or a convolution, for that matter), don't worry (I'm looking at you, future Edward :smirk:). I'll try and break it down here, but I can't promise I'll do a good job. First, we'll start with a description of **linear time-invariant systems (LTI)**. An LTI is a system that is *linear*: meaning that the output of the system is a linear map (meaning that *addition* and *scalar multiplication* are conserved). So if I have an input $x_1$ with an output $y_1$, and an input $x_2 \to y_2$, then $3x_1 \to 3y_1$, and $x_1 + x_2 \to y_1 + y_2$.  




$$a^2 + b^2 = c^2$$
