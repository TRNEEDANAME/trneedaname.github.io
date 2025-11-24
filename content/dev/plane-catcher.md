+++
title = "Plane catcher"
author = ["TRNEEDANAME"]
date = 2025-11-13
layout = "page"
tags = ["dev"]
draft = true
+++

## A plane catcher written in C {#a-plane-catcher-written-in-c}

The idea is pretty simple, an app that prioritise a parameter when choosing a plane (or multiple) for going from point A to point B.

It can prioritise speed or cost (maybe more later...)

It can also search for multiple planes.

Example, you go from A to B but if you do

> [!CODE] goat
>  ```goat
>  A --> C --> B
> ```

it's cheaper, then it will provide this as an option
