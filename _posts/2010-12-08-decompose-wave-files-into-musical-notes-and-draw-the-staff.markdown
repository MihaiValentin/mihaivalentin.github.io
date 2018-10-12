---
layout: post
title: Decompose wave files into musical notes and draw the staff
categories:
- work
tags: []
meta:
  year: '2007'
  dev: MatLab, C++, GD graphical library
---
3rd year in college. Digital Signal Processing. One of the most interesting course (and lab).

I chose to do a project consisting in decomposing a wave into musical notes and drawing the staff for it. Of course, I am talking about mono-phonic sounds.

<img title="portativ-sample" src="/wp-content/uploads/2010/12/portativ-sample.gif" alt="" width="580" height="243" />

##This project consists of:
* the MatLab program (which processes the wave file, detects the musical notes (through Fourier analysis), the durations, the volume and the pauses, and writes these information to an intermediary file)
* the C program takes the intermediary file and draws the staff as a GIF file (using GD library).

##Example
Here is a sample input file:

<audio controls>
  <source src="/wp-content/uploads/2010/12/mars_turc.mp3" type="audio/mpeg">
  Download <a href="/wp-content/uploads/2010/12/mars_turc.mp3" target="_blank">mp3 file</a>
</audio>

Here is the output file (click it to open the large version):

<a href="/wp-content/uploads/2010/12/portativ.gif" target="_blank"><img title="portativ-sample" src="/wp-content/uploads/2010/12/portativ-sample.gif" alt="" width="209" height="88" /></a>

##Legend
<img title="musical-staff" src="/wp-content/uploads/2010/12/musical-staff.gif" alt="" width="442" height="187" />
