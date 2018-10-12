---
layout: post
title: Trace objects on the screen using your webcam
categories:
- work
tags: []
meta:
  year: '2003'
  dev: Visual Basic 5, Video for Windows API
---
7 years ago, after seeing a Discovery movie about robots, I became interested in how robots can perceive the surrounding environment. As I was 17 back then, I had no idea about image processing, artificial intelligence, computer graphics, sophisticated analysis algorithms, etc.

Instead, I just made a program (in Visual Basic 5) that was able to trace a given color on the screen, in real time, with live input from the webcam, under a given precision.

This project took the special mention (4th place) in the E-Idea Software Contest in Romania, 2003.

Below is a screen shot showing how this application works:

<img title="webcam" src="/wp-content/uploads/2010/12/webcam.jpg" alt="" width="580" height="450" />

You pick a color from the leftmost image (here you see yourself on the webcam) and start tracking.
An area of red circles surrounded by a white rectangle will appear over the area in the picture which matches the picked color. As you move the colored object, you will notice that this application will keep track of it (in real time).

You can also use it as a mouse for your computer. Moving the colored object will move the cursor and bringing the object closer to the camera means "click".
