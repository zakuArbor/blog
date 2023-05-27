---
layout: post
title: Duplicate a Fluent-Bit Plugin
description: A walkthrough installing a duplicating a fluent bit plugin
categories: [programming, kafka, fluent-bit, compilation]
---

Today I am exploring how to create a copy of Kafka plugin on Fluent-Bit so that you can modify the plugin without affecting the original plugin. Don't ask me why 
would anyone want to do that, it happens. I didn't even know what Fluent-Bit and Kafka was till very recently and I happened to come across the need to duplicate 
the plugin to fiddle around with. Mainly to understand what is going on. Not an interesting topic but I haven't written much blogs this year so this is the topic I chose to write. What is interesting about Fluent Bit is that you are supposed to write the plugins in C which was surprising when I heard this. Though you could probably choose to write the plugins in other languages like Go I assume.

To develop plugins for Fluent Bit, I am going to build Fluent Bit from the source code since I need access to some of the source code. Perhaps you could use containers but I ain't going to waste my time looking into that for the moment.

## Downloading and Installing Fluent Bit

Building fluent bit isn't difficult, just follow the instruction from Fluent Bit's website: [https://docs.fluentbit.io/manual/installation/sources/download-source-code](https://docs.fluentbit.io/manual/installation/sources/download-source-code). The only thing I needed to install additionally from my setup was `libyaml-devel` (on Fedora) but if you don't use your machine for development, you may need to install more packages. Fluent Bit does a good job listing their dependencies, so do install all the packages they ask for.

```
$ git clone https://github.com/fluent/fluent-bit
$ cd fluent-bit/build
$ cmake ../
$ make
$ make install
```

Once you have finished building fluent-bit, it's time to create a duplicate copy of fluent-bit and change some configurations. Unsurprisingly, plugins are installed under the `plugins` directory.

## Making a Copy of Kafka Plugin

```
$ cd ../plugins
$ cp -r out_kafka out_kafka2
```

Since the plugin is written in C, it is likely that plugins are compiled as a shared library and either dynamically linked to Fluent Bit or dynamically loaded to Fluent Bit. So it would make no sense if there were two libraries with the same name, so we need to change the name of the copied plugin by editing the `CMakeLists.txt`:

```
$ diff ../out_kafka/CMakeLists.txt CMakeLists.txt 
7,8c7,8
< FLB_PLUGIN(out_kafka "${src}" "rdkafka")
< target_link_libraries(flb-plugin-out_kafka -lpthread)
---
> FLB_PLUGIN(out_kafka2 "${src}" "rdkafka")
> target_link_libraries(flb-plugin-out_kafka2 -lpthread)
```

## Enabling the New Plugin

Before compiling the plugin, we first need to enable the plugin by modifying the `CMakeLists.txt`.

1.) Edit the `CMakeLists.txt` in the root of the project directory to create the option variable:
```cmake
option(FLB_OUT_KAFKA2                  "Enable Kafka output plugin duplicate"         Yes)
```

**Diff:**

<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code><span style="color:#D0CFCC"><b>$ </b></span>git diff CMakeLists.txt
<b>diff --git a/CMakeLists.txt b/CMakeLists.txt</b>
<b>index d3847ef11..78edc9dab 100644</b>
<b>--- a/CMakeLists.txt</b>
<b>+++ b/CMakeLists.txt</b>
<span style="color:#2AA1B3">@@ -237,6 +237,7 @@</span> option(FLB_OUT_FLOWCOUNTER             &quot;Enable flowcount output plugin&quot;
 option(FLB_OUT_LOGDNA                  &quot;Enable LogDNA output plugin&quot;              Yes)
 option(FLB_OUT_LOKI                    &quot;Enable Loki output plugin&quot;                Yes)
 option(FLB_OUT_KAFKA                   &quot;Enable Kafka output plugin&quot;                No)
<span style="color:#26A269">+option(FLB_OUT_KAFKA2                  &quot;Enable Kafka output plugin duplicate&quot;     Yes)</span>
 option(FLB_OUT_KAFKA_REST              &quot;Enable Kafka Rest output plugin&quot;          Yes)
 option(FLB_OUT_CLOUDWATCH_LOGS         &quot;Enable AWS CloudWatch output plugin&quot;      Yes)
 option(FLB_OUT_KINESIS_FIREHOSE        &quot;Enable AWS Firehose output plugin&quot;        Yes)
</code></pre></div>

**Note:** By default, `kafka` plugin is disabled

2.) Next is to edit `CMakeLists.txt` again but this time it's located under the `plugins` directory  (i.e. `plugins/CMakeLists.txt`): 
```cmake
REGISTER_OUT_PLUGIN("out_kafka2")
```

**Diff:**

<div class="language-plaintext highlighter-rouge">
<pre class = "highlight"><code><span style="color:#D0CFCC"><b>$ </b></span>git diff CMakeLists.txt
<b>diff --git a/plugins/CMakeLists.txt b/plugins/CMakeLists.txt</b>
<b>index 78f007a81..6f534c485 100644</b>
<b>--- a/plugins/CMakeLists.txt</b>
<b>+++ b/plugins/CMakeLists.txt</b>
<span style="color:#2AA1B3">@@ -296,6 +296,7 @@</span> REGISTER_OUT_PLUGIN(&quot;out_influxdb&quot;)
 REGISTER_OUT_PLUGIN(&quot;out_logdna&quot;)
 REGISTER_OUT_PLUGIN(&quot;out_loki&quot;)
 REGISTER_OUT_PLUGIN(&quot;out_kafka&quot;)
<span style="color:#26A269">+REGISTER_OUT_PLUGIN(&quot;out_kafka2&quot;)</span>
 REGISTER_OUT_PLUGIN(&quot;out_kafka_rest&quot;)
 REGISTER_OUT_PLUGIN(&quot;out_nats&quot;)
 REGISTER_OUT_PLUGIN(&quot;out_nrlogs&quot;)
</code></pre></div>
   
3.) Generate the Build Files for our duplicate plugin:
```
$ cmake -DFLB_OUT_KAFKA2=On ../ 
```

## Building the Plugin

Now that the build files are generated, we can now build. But will it actually compile or are there more steps to consider?
It turns out now, here's the first error you'll encounter:

<div class="language-plaintext highlighter-rouge">
<pre class = "highlight"><code>[ 69%] <span style="color:#26A269">Building C object plugins/out_kafka2/CMakeFiles/flb-plugin-out_kafka2.dir/kafka_config.c.o</span>
In file included from <b>/home/zaku/Downloads/fluent-bit/plugins/out_kafka2/kafka_config.h:29</b>,
                 from <b>/home/zaku/Downloads/fluent-bit/plugins/out_kafka2/kafka_config.c:26</b>:
<b>/home/zaku/Downloads/fluent-bit/include/fluent-bit/flb_kafka.h:28:10:</b> <span style="color:#C01C28"><b>fatal error: </b></span>rdkafka.h: No such file or directory
   28 | #include <span style="color:#C01C28"><b>&lt;rdkafka.h&gt;</b></span>
</code></pre></div>

This error seems oddly weird because the `CMakeLists.txt` for `kafka` should have specified that the plugin is dependent on Kafka libraries:
```cmake
FLB_PLUGIN(out_kafka2 "${src}" "rdkafka")
```

which if we look at `plugins/CMakeLists.txt`, we can see `FLB_PLUGIN` is a macro defined as:
```cmake
# FLB_PLUGIN: used by plugins to perform registration and linking
macro(FLB_PLUGIN name src deps)
  add_library(flb-plugin-${name} STATIC ${src})
  add_sanitizers(flb-plugin-${name})
  target_link_libraries(flb-plugin-${name} fluent-bit-static msgpack-c-static ${deps})
endmacro()
```

So what is going on? The library should be linked to our binary. It turns out that if we peek further into `CMakeLists.txt` under the root directory:
```cmake
if(FLB_IN_KAFKA OR FLB_OUT_KAFKA)
    FLB_OPTION(RDKAFKA_BUILD_STATIC    On)
    FLB_OPTION(RDKAFKA_BUILD_EXAMPLES Off)
    FLB_OPTION(RDKAFKA_BUILD_TESTS    Off)
    FLB_OPTION(ENABLE_LZ4_EXT         Off)
```

We can see that we need to set the option to build with Kafka library.

**diff:**

<div class="language-plaintext highlighter-rouge">
<pre class = "highlight"><code><span style="color:#C01C28">-if(FLB_IN_KAFKA OR FLB_OUT_KAFKA)</span>
<span style="color:#26A269">+if(FLB_IN_KAFKA OR FLB_OUT_KAFKA OR FLB_OUT_KAFKA2)</span>
     FLB_OPTION(RDKAFKA_BUILD_STATIC    On)
     FLB_OPTION(RDKAFKA_BUILD_EXAMPLES Off)
     FLB_OPTION(RDKAFKA_BUILD_TESTS    Off)
</code></pre></div>

Is this the end of the errors? Now we fact the classic undefined reference errors:
```
/usr/bin/ld: ../library/libfluent-bit.a(flb_config.c.o): in function `flb_plugins_register':
/home/zaku/Downloads/fluent-bit/include/fluent-bit/flb_plugins.h:606: undefined reference to `out_kafka2_plugin'
collect2: error: ld returned 1 exit status
make[2]: *** [src/CMakeFiles/fluent-bit-bin.dir/build.make:391: bin/fluent-bit] Error 1
make[1]: *** [CMakeFiles/Makefile2:7449: src/CMakeFiles/fluent-bit-bin.dir/all] Error 2
make: *** [Makefile:156: all] Error 2
```

This yet another configuration change we need to make in `plugins/CMakeLists.txt` but which one? This was the trickiest part of the build process for me. Looking at the error, the undefined reference was made when trying to compile `fluent-bit`. So if we go under `src/CMakeLists.txt`:
```cmake
if(FLB_IN_KAFKA OR FLB_OUT_KAFKA)
  set(src
    ${src}
    "flb_kafka.c"
    )
endif()
```

So similarly to the previous configuration change, we just need to add another `OR` statement.

<div class="language-plaintext highlighter-rouge">
<pre class = "highlight"><code><span style="color:#D0CFCC"><b>$ </b></span>git diff CMakeLists.txt
<b>diff --git a/src/CMakeLists.txt b/src/CMakeLists.txt</b>
<b>index b6233d9f7..bf0936634 100644</b>
<b>--- a/src/CMakeLists.txt</b>
<b>+++ b/src/CMakeLists.txt</b>
<span style="color:#2AA1B3">@@ -186,7 +186,7 @@</span> if(FLB_LUAJIT)
     )
 endif()
 
<span style="color:#C01C28">-if(FLB_IN_KAFKA OR FLB_OUT_KAFKA)</span>
<span style="color:#26A269">+if(FLB_IN_KAFKA OR FLB_OUT_KAFKA OR FLB_OUT_KAFKA2)</span>
   set(src
     ${src}
     &quot;flb_kafka.c&quot;
</code></pre></div>

It turns out that this may not be a configuration change :(

I guess it's an actual code error even though we made no code changes at all. It turns out that when we renamed the plugin from `out_kafka` to `out_kafka2`, 
we needed to update `kafka.c` as well. The thought process behind this is to `grep` the reference of `out_kafka_plugin`:

<div class="language-plaintext highlighter-rouge">
<pre class = "highlight"><code><span style="color:#D0CFCC"><b>$ </b></span>grep -r out_kafka_plugin *
<span style="color:#A347BA">out_kafka/kafka.c</span><span style="color:#2AA1B3">:</span>struct flb_output_plugin <span style="color:#C01C28"><b>out_kafka_plugin</b></span> = {
<span style="color:#A347BA">out_kafka2/kafka.c</span><span style="color:#2AA1B3">:</span>struct flb_output_plugin <span style="color:#C01C28"><b>out_kafka_plugin</b></span> = {
</code></pre></div>

So rename the struct to the correct name. This should resolve the issue. There is one final step you have to do but you can refer to [this](https://www.cncf.io/blog/2022/05/04/how-to-write-a-fluent-bit-plugin/) blog to see the final step. All I was interested in today was the compilation


## Summary

Making another copy of the plugin requires more than just copy and paste of the plugin's source code. You also need to change `CMakeLists.txt` under root, `plugins`, and `src`. In addition, you need to modify `CMakeLists.txt` of the new plugin you created and change the struct name to reflect the new plugin's name in `kafka.c`.

On a side note, if you are looking to write your own plugin, the CNCF has a nice blog on [this](https://www.cncf.io/blog/2022/05/04/how-to-write-a-fluent-bit-plugin/). 