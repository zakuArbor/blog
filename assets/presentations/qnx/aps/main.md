---
title: "Adaptive Partitioning System"
subtitle: "Restricting CPU Resources to Groups of Processes"
date: April 19 2021
description: "Restricting CPU Resources to Groups of Processes"
output: powerpoint_presentation
---

## Restricting Process

* resources are limited - more so with embedded targets
* rlimit is typically used to restrict system resources consumed by processes (i.e. restrict number of processes that can be spawned – prevent fork bombs)

![](images/ulimit.png)

::: notes
Speaker notes go here
:::
