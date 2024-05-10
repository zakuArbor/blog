---
layout: post
title: A Quick Look Into Spatial Locality and TLB
description: A quick investigation into TLB and CPU cacheline in respect to Spatial Locality
categories: [programming, c/c++, tlb, cache]
---

This week, I began my internship with a company and I was told I should eventually review how memory works on Linux. 
As I had nothing to do at work due to insufficient access to company's resources, I decided to share with 
my fellow intern Ulrich's paper [What Every Programmer Should Know About Memory](https://akkadia.org/drepper/cpumemory.pdf), a 
gigantic paper about computer memory that I only took a small glimpse over the years. What ignited this post was the following:

>  It is therefore good for performance and scalability if the memory needed by the
> page table trees is as small as possible. The ideal case
> for this is to place the used memory close together in the
> virtual address space; the actual physical addresses used
> do not matter
> -- [What Every Programmer Should Know About Memory](https://akkadia.org/drepper/cpumemory.pdf)

The specific quote `the actual physical addresses used do not matter` bothered me because I could not wrap around my head as to why this 
is true. I had the same exact question early March (March 13 to be exact) that I posed to a professor who corrected me on a few statements 
I made incorrectly in my question. However, at the time I did not internalize his answers and hence why I had the same exact question 
2 months later. I had this confusion as to why physical addresses don't matter because in my mind, the data is stored in a specific location 
in physical memory. Therefore, when we fetch an element in an array such as an integer `arr[0]`, the CPU will also grab 16 integers 
(assuming an integer is 4 Bytes and our CPU is 64-bit) due to how the CPU fetches data from the main memory. When the CPU wants to fetch some 
data from main memory, it'll grab a chunk of data called a cache line into the CPU cache to reduce the number of times the CPU needs to access 
the main memory because accessing data from main memory is EXPENSIVE. So if `arr[0]` was not in cache, we will have a cache miss and therefore, 
the CPU will need to fetch `arr[0]` from main memory. It'll also bring along `arr[1], arr[2], ..., arr[15]` along with it so that if we 
ever need to access any of the first 16 elements of the array, we don't ever need to travel to the main memory which is far from the CPU 
as it will already be in our cache which requires very little CPU cycles to retrieve the data.

If you have taken an operating system class or had an opportunity to work with memory at a low level, you will know that although two 
virtual address may be close virtually, that could be mapped to very different physical pages where the data is actually stored. Hence, 
my confusion. I was not sure if 


```
 Performance counter stats for './seq_sum':

            51,218      cache-misses:u                                                          (12.23%)
             4,140      dTLB-load-misses:u                                                      (46.03%)
               142      iTLB-load-misses:u                                                      (79.96%)
         7,373,582      L1-dcache-loads:u                                                     
             2,211      L1-dcache-load-misses:u          #    0.03% of all L1-dcache accesses   (87.77%)
               120      LLC-loads:u                                                             (53.97%)
                 0      LLC-load-misses:u                                                       (20.04%)

       0.003320777 seconds time elapsed

       0.003278000 seconds user
       0.000000000 seconds sys



 Performance counter stats for './seq_sum2':

            15,215      cache-misses:u                                                          (51.32%)
             4,178      dTLB-load-misses:u                                                      (56.00%)
               198      iTLB-load-misses:u                                                      (61.81%)
        28,074,069      L1-dcache-loads:u                                                       (64.76%)
             6,596      L1-dcache-load-misses:u          #    0.02% of all L1-dcache accesses   (60.45%)
               693      LLC-loads:u                                                             (55.79%)
               671      LLC-load-misses:u                #   96.83% of all LL-cache accesses    (49.87%)

       0.017677293 seconds time elapsed

       0.016259000 seconds user
       0.000978000 seconds sys



 Performance counter stats for './rand_sum':

             9,565      cache-misses:u                                                          (52.85%)
             7,368      dTLB-load-misses:u                                                      (58.86%)
               304      iTLB-load-misses:u                                                      (63.73%)
        26,754,642      L1-dcache-loads:u                                                       (63.76%)
             2,944      L1-dcache-load-misses:u          #    0.01% of all L1-dcache accesses   (59.23%)
               935      LLC-loads:u                                                             (53.26%)
               600      LLC-load-misses:u                #   64.17% of all LL-cache accesses    (48.30%)

       0.016833063 seconds time elapsed

       0.016675000 seconds user
       0.000000000 seconds sys
$       perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./seq_sum
        perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./seq_sum2
        perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./rand_sum

 Performance counter stats for './seq_sum':

            28,989      cache-misses:u                                                          (17.05%)
             4,179      dTLB-load-misses:u                                                      (46.57%)
               130      iTLB-load-misses:u                                                      (76.69%)
         7,372,533      L1-dcache-loads:u                                                     
             2,450      L1-dcache-load-misses:u          #    0.03% of all L1-dcache accesses   (82.95%)
               114      LLC-loads:u                                                             (53.43%)
                21      LLC-load-misses:u                #   18.42% of all LL-cache accesses    (23.31%)

       0.003657964 seconds time elapsed

       0.003602000 seconds user
       0.000000000 seconds sys



 Performance counter stats for './seq_sum2':

             4,688      cache-misses:u                                                          (48.52%)
             4,292      dTLB-load-misses:u                                                      (51.76%)
               274      iTLB-load-misses:u                                                      (56.75%)
        27,912,842      L1-dcache-loads:u                                                       (63.22%)
            12,681      L1-dcache-load-misses:u          #    0.05% of all L1-dcache accesses   (65.54%)
               698      LLC-loads:u                                                             (59.96%)
               473      LLC-load-misses:u                #   67.77% of all LL-cache accesses    (54.25%)

       0.017745640 seconds time elapsed

       0.015180000 seconds user
       0.001898000 seconds sys



 Performance counter stats for './rand_sum':

             8,078      cache-misses:u                                                          (48.29%)
             8,873      dTLB-load-misses:u                                                      (53.22%)
               265      iTLB-load-misses:u                                                      (59.13%)
        26,602,908      L1-dcache-loads:u                                                       (64.55%)
             8,122      L1-dcache-load-misses:u          #    0.03% of all L1-dcache accesses   (63.49%)
               866      LLC-loads:u                                                             (58.62%)
               362      LLC-load-misses:u                #   41.80% of all LL-cache accesses    (52.71%)

       0.017413264 seconds time elapsed

       0.015884000 seconds user
       0.001008000 seconds sys
```
* 
