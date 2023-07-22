---
layout: post
title: Fluent Bit Avro Frustration
description: A tale of a clueless programmer struggling to serialize JSON data into Avro via Fluent Bit
categories: [programming, C/C++, msgPack, avro]
---

A tale of a clueless programmer trying to figure out how to use Fluent Bit's "built-in" support to send messages serialized/encoded in Avro, a compact 
binary format that has types. 

Lately, I have been investigating various serialization formats such as protobuf, MsgPack, and Avro to see their performance in regards to:
* serialization time
* deserialization time
* total time of flight + processing
* interoperability with existing JSON data

JSON as you likely know is a human readable format that isn't bloated like XML and gives us the ability to structure data in more complex ways than 
traditional CSVs. However, JSON being human readable consumes a lot of data which not only means more storage but also more time to send over the network.

Hence, if you want to scale your microservices or data pipelines in general, you need to start considering binary formats like Protobuf. As a student 
with limited experience, this was all new to me. The closest thing I have worked with to serializing data was Java serialization to write objects 
into a binary file and load them back again. I also have been looking at Fluent Bit and Kafka, two services I did not even know about till recently. 
So it's been an interesting yet frustrating task that is still ongoing.

## Fluent-Bit

Fluent Bit is a centralized (from what I know) data collector that can process and forward data to different services such as Kafka. Essentially, 
Fluent-Bit collects data from various inputs such as system logs or from different programs and can do some processing to the data such as 
structuring them (via a parser plugin), filter through the data, and output the data to various external destination for various use cases 
such as storage (Database), analyzed, or to Kafka. 

![fluentd many to many log routing](https://web.archive.org/web/20220808123641if_/http://radar.oreilly.com/wp-files/2/2015/04/oreilly_radar_fluentd_3.png)
<p class = "caption">Taken from OReilly. Apparent from Kiyoto Tamura</p>

The picture may be for FluentD, but Fluent-bit works exactly the same way. Anyhow, in Fluent-Bit, data can go through various stages
of the data pipeline as seen below:

![illustration of various stages/plugins the data can go through](https://4018815634-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F1NBbcZmdFBruUw1adUIg%2Fuploads%2Fgit-blob-621897340d1948b951b35ee1562bc92ae5bf1c07%2Flogging_pipeline_parser%20(1)%20(1)%20(1)%20(1)%20(2)%20(2)%20(2)%20(3)%20(3)%20(3)%20(3)%20(3)%20(1).png?alt=media)

All plugins are written in C but there has been recent developments to have some specific stage in the data pipeline to be written in Go. 
Due to how Fluent-Bit works, data are transformed into msgPack. I won't go into details what msgPack is but here are some examples:

![an image that illustrates how more efficient msgPack is over JSON](https://msgpack.org/images/intro.png)

Here's another example:

**JSON:** 76 bytes
```json
{
	"name": "zakuarbor",
	"age": 26, 
	"nationality": "Canadian", 
	"major": "mathematics"
}
```

**msgPack:** 60 bytes (saves 21% of the space)
```
84 a4 6e 61 6d 65 a9 7a 61 6b 75 61 72 62 6f 72 a3 61 67 65 1a ab 6e 
61 74 69 6f 6e 61 6c 69 74 79 a8 43 61 6e 61 64 69 61 6e a5 6d 61 6a 
6f 72 ab 6d 61 74 68 65 6d 61 74 69 63 73
```

<!--
## Setting up Fluent-Bit and Kafka 

### [(You can Skip this Section if You aren't following along)](#fluent-avro)

The simplest way to send some data to fluent-bit (aside from CPU logs) is to use the [Dummy Input Plugin](https://docs.fluentbit.io/manual/pipeline/inputs/dummy) which generates 
a fixed JSON record to Fluent-Bit. This is great for quick testing.

Under `fluent-bit/conf/fluent-bit.conf`, have the following at the bottom:
```apache
[INPUT]
    Name    dummy
    Tag     dummy.log
    Dummy   {"name": "zaku", "age":26}
    Samples 1

[OUTPUT]
    Name        kafka
    Match       *
    Brokers     192.168.1.3:9092
    Topics      test
    Schema_str  {"name":"avro_log", "type":"record","fields":[{"name":"name", "type": "string"}, {"name":"age", "type":"int"}]}
    Schema_id   1
    Format      avro
```

I won't go into the details but essentially what we are doing is setting up Fluent-Bit to receive a fixed JSON data and encode the data to Avro and send it to Kafka under the topic `test`. 
If you do not know what Kafka or Fluent-Bit is, read the following article [The log: The lifeblood of your data pipeline](http://radar.oreilly.com/2015/04/the-log-the-lifeblood-of-your-data-pipeline.html). 
Essentially, Kafka is a decentralized (and hence distributed) data streaming that can be used to ingest real-time data, streamline data pipelines and store data. Both Kafka and Fluent-Bit sound 
familiar but the key difference from my understanding and further supported by the author of the article is that Kafka can store data:

> Kafka is primarily related to holding log data rather than moving log data. Thus, Kafka producers need to write the code to put data in Kafka, and Kafka consumers need to write the code to pull data out of Kafka. Fluentd has both input and output plugins for Kafka so that data engineers can write less code to get data in and out of Kafka.
> 
> [-- The log: The lifeblood of your data pipeline -- Kiyoto Tamura](http://radar.oreilly.com/2015/04/the-log-the-lifeblood-of-your-data-pipeline.html)

Kafka is a publish-subscribe model meaning to write data to Kafka, you need a `producer` that writes data into Kafka and a `consumer` to "consume"/read the data. Quite funny names 
if you ask me because when I first read about Kafka a week ago, it reminded me of the classical synchronization problem: producer-consumer problem. Kafka isn't too important 
for the problem I want to talk about so just follow along as I skip over all the details.

**Installing Kafka:** Follow the [quickstart guide](https://kafka.apache.org/quickstart) to install Kafka. For myself, I'll post the commands to start Kafka:
```bash
# Start the ZooKeeper service
$ bin/zookeeper-server-start.sh config/zookeeper.properties
# Start the Kafka broker service
$ bin/kafka-server-start.sh config/server.properties
```

**Note:** Both Kafka and avro support in Kafka plugin are not enabled by default. You'll have to compile them with those flags. Here's a quick overview but check out [Fluent-Bit](https://docs.fluentbit.io/manual/pipeline/outputs/kafka) 
for more detailed instruction:

```bash
cd fluent-bit/build
cmake -DFLB_DEV=On -DFLB_OUT_KAFKA=On -DFLB_TLS=On -DFLB_TESTS_RUNTIME=On -DFLB_TESTS_INTERNAL=On -DCMAKE_BUILD_TYPE=Debug -DFLB_HTTP_SERVER=true -DFLB_AVRO_ENCODER=On ../
make
```

We'll also need `fastavro` and `kafka` python libraries installed:
```
sudo dnf install python-fastavro
pip3 install python-kafka
```

<a name = "fluent-avro"/>
-->
## Fluent-Bit and Avro

According to [Fluent-Bit](https://docs.fluentbit.io/manual/pipeline/outputs/kafka#avro-support), there is Avro encoding support for `out_kafka` plugin. 
Naturally, I would have assumed this avro support will work out of the box provided I compiled with avro encoding flag. 

To test Kafka's avro capabilities, I decided to send a simple message:
```json
{
    "name": "zaku",
    "age": 26
}
```

To store the JSON data into avro, we need to define a schema (this will be stored in `sample.avsc` and matches the `schema_str` in the config):

```json 
{
    "name":"avro_log", 
    "type":"record",
    "fields":[
        {"name":"name", "type": "string"}, 
        {"name":"age", "type":"int"}
    ]
}
```

To see if our data has been properly serialized, we need a consumer as well:
```python
from kafka import KafkaConsumer
import io
import fastavro

consumer = KafkaConsumer(
    "avro-test",
    bootstrap_servers=["localhost:9092"]
)

SCHEMA_PATH = "sample.avsc"
schema = fastavro.schema.load_schema(SCHEMA_PATH)

for msg in consumer:
    reader = io.BytesIO(msg.value)
    decoded = fastavro.schemaless_reader(reader, schema)
    print(decoded)
```

The result is ... not the JSON I wanted.

**result:**
```json
{'name': '', 'age': -1}
```

We can "infer" some of the data has been sent correctly as we see the keys have been properly decoded. So I naturally thought to myself, maybe I wrote my consumer incorrectly or I just am misunderstanding how to 
get Fluent-Bit to serialize the data properly. As this isn't the first time I made a stupid mistake while working on MessagePack and Protobuff, I was fairly confident I made a mistake. So after 
hours of work which span to the next working day, I still got nowhere.

Based on my search, I found out that there may be a magic number encoded into the message which I needed to take into consideration. There were blogs and stackoverflow posts mentioning this 
magic number which isn't rare to see in binary formats. A magic number for those of you who do not know what they are, a magic number in a file format are the first few bits that uniquely 
identify the type of file. For instance, JPEG magic number is `ff d8 ff e0`. We can see this by observing the [404 not found octocat](..//images/404.jpg) that is hosted on this site:

```
$ xxd 404.jpg | head -n 1 | cut -f2,3 -d ' '
ffd8 ffe0
```

So all we needed to do is add the following code before we decode the message:
```python
reader.tell(5)
```

This will move our file cursor to begin reading from the 5th byte as 4 bytes were reserved for the magic number. However, the results were frightening:
```
$ python3 test-consumer.py
ConsumerRecord(topic='avro-test', partition=0, offset=7, timestamp=1686973613871, timestamp_type=0, key=None, value=b'\x00\x01\xb0\xfd\x1c\x0e\x7f\x00\x00P\xce\x02\x18\\\x7f\x00\x00\x08zaku4\x00', headers=[], checksum=None, serialized_key_size=-1, serialized_value_size=24, serialized_header_size=-1)
Traceback (most recent call last):
  File "/tmp/test-consumer.py", line 17, in <module>
    decoded = fastavro.schemaless_reader(reader, schema)
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "fastavro/_read.pyx", line 1107, in fastavro._read.schemaless_reader
  File "fastavro/_read.pyx", line 1120, in fastavro._read.schemaless_reader
  File "fastavro/_read.pyx", line 749, in fastavro._read._read_data
  File "fastavro/_read.pyx", line 620, in fastavro._read.read_record
  File "fastavro/_read.pyx", line 706, in fastavro._read._read_data
  File "fastavro/_read.pyx", line 288, in fastavro._read.read_utf8
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xce in position 4: invalid continuation byte
```

If we were to play around with the offset, we may see the following error: `EOFError: Expected -948 bytes, read 18`. After many hours of banging my head, I notice there exists github issues that 
were stating there was a bug in the implementation of avro and a [fix was available](https://github.com/fluent/fluent-bit/pull/5435). So I applied the patch and everything was working smoothly. 
But that got me curious, what was wrong with my data? Stupid me decided not to read the patch nor the comments in the Pull/Merge Request and inspect the binaries itself.

## Inspecting how Avro Encodes Data

<!--While not required, one can take a look at how Avro encodes the data which interestingly enough [links you to the protobuf documentation on encoding](https://protobuf.dev/programming-guides/encoding/#types). 
I won't go into the details but I'll reference the important bits (no pun intended) during the inspection of the binary.-->

While not required, one can take a look at how [Avro encodes the data](https://avro.apache.org/docs/1.11.1/specification/#binary-encoding). The image below illustrates beautifully how 
data is encoded. (Though I would have appreciated if they gave a more complex example)

![An illustration of how avro encodes data](https://web.archive.org/web/20230101113630im_/https://www.oreilly.com/api/v2/epubs/9781491903063/files/assets/ddia_0405.png)

The following below is the resulting binary from the patched version:
```
0000 0000 0108 7a61 6b75 3400            ......zaku4.
```

We can observe that the values are indeed encoded in hex based on the fact that we can see `7a61 6b75` is the string `zaku` and `34` is our integer `4`. If you are lost as to 
how `34` is our integer 4, recall the ASCII table. The integer 4 is represented as 52 in decimal so by simple math we can convert this to hex: `16*3+4 = 52`.
Hence `34` represents `4` in ASCII HEX.

<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code>0000 0000 0108 <b style="color:#ff0000">7a61 6b75</b> <b style = "color:#00bfff">34</b>00
</code></pre></div>

How does Avro encode the length of the string because our string could have been `zaku4`. There needs to be some way to know that `zaku` is our string value and `4` is our integer value. 
One thing to note is that the avro encoding does not need to contain the schema so when working with Avro, one must know the schema to decode the data. 

<!--According to [protobuf specification](https://protobuf.dev/programming-guides/encoding/#types) that avro follows, we see that:

* String length has an ID of **2**
* Integer has an ID of **0**

However, -->

Let's prune some bits to simplify the problem. We know that avro contains a magic number which is the first 4 bytes so 
we have the following to consider:

<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code><s>0000 0000</s> <b>0108</b> <s>7a61 6b75</s> <s>34</s><b>00</b>
</code></pre></div>

We can further eliminate one byte that is reserved to indicate the serial avro id, which we can see is `1` from `0108` (where `01` is the hex that represents the serial avro id). 
In addition, we can purge the last byte `00` as that is placed at the end of an avro binary to indicate the end.
So we have the remaining bytes:
<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code><s>0000 0000 01</s>08 <s>7a61 6b75</s> <s>3400</s>
</code></pre></div>

That leaves us to decipher what `08` represents. We know a string has both a length and a value property. Somehow `08` needs to represent this. We know that the string
`zaku` has a length of 4 and not 8. It is not all that obvious how this works because so far we've been looking at the hex value to infer the data. 
It turns out, we should not be looking at the encoded data in hex but in binary instead.

**HEX:** `O8`
**Binary:** `0000 1000`

If you look at the diagram above, you'll see how the last bit is reserved as a sign bit. When I was reading the documentation, I was so lost as to how this works. For instance, 
`the three-character string “foo” would be encoded as the long value 3 (encoded as hex 06)` but we know that 06 is not `3` even in ASCII. I wish the documentation stated this 
more explicitly. Hence if we drop the lowest bit, we get the following binary: `100` which is 4 in binary. Exactly what we wanted.

## Comparing Between the Binaries

Let's now compare between the binaries:

**good:**
<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code>0000 0000 01<b style = "color:#00bfff">08 7a61 6b75 3400</b>            ......zaku4.</code></pre></div>

**v.s corrupted binary:**

<div class="language-plaintext highlighter-rouge"><pre class = "highlight"><code>0001 003e 480e 7f00 0050 ce02 44a7 7f00  ...>H....P..D...
00<b style = "color:#00bfff">08 7a61 6b75 3400</b>                      ..zaku4.
</code></pre></div>

As you can observe, the corrupted binary is a lot larger than it should be. But is this really incorrect? According to [the specifications](https://avro.apache.org/docs/1.11.1/specification/#schema-declaration), 
an avro binary contains a header which consists of:

* 4 bytes (magic number): `4F62 6A011` (i.e. "Obj" in ASCII)
* metadata such as the schema
* 16 byte of randomly generated sync marker for the file

While I was aware of the magic number and the possibility of a schema being added to the avro binary, what I didn't know till the time of writing was the 16 bytes of randomly generated sync marker till the 
time of writing this blog. If we look at the plugin's source code, we can see that the author truly intended the schema id to be encoded as a 16 byte schema id seeing as they 
[explicitly stated this in a comment](https://github.com/fluent/fluent-bit/blob/master/plugins/out_kafka/kafka.c). Perhaps it was due to my misunderstanding of how avro specification works, but 
the author neglected encoding the 4bytes magic number.If they truly wanted to follow the specifications properly, they should have also encoded the magic bytes so that our deserializers would 
have realized this. I'm not the only one who was lost as to how the avro feature works in Fluent Bit seeing the number of users who also was stumped by this. Though they are mainly confluent kafka users 
which does have their own schema requirements. In addition, I am not sure why the schema id is even accepted or mentioned in the configuration if we are going to use a randomly generated serial id followed by 
a NULL (i.e. `00`).

Anyhow, to solve this issue, I just simply told my deserializer to move the read cursor by 17 bytes: `reader.tell(17)` for my fluent-bit installation that does not contain the proposed patch. 
It is bizarre to me why the author chose to do this because I assume most users of the avro feature would be using the plugin to connect to their confluent kafka instance.

On a side tangent before I end the blog, it is very interesting how they randomly generated the schema id. Since the randomness of the schema isn't truly important, the author decides 
to get random hex values by grabbing 2 bytes of the address of a fixed length array. This means that each time you start fluent-bit, a new schema id is generated.

**Source:** [https://github.com/fluent/fluent-bit/blob/master/src/flb_avro.c#L343](https://github.com/fluent/fluent-bit/blob/master/src/flb_avro.c#L343)
```c
const char *pos = ctx->schema_id;
unsigned char val[16];
size_t count;
for (count = 0; count < sizeof val/sizeof *val; count++) {
        sscanf(pos, "%2hhx", &val[count]);
        pos += 2;
}
```

## Summary

The avro support for Kafka's output plugin in Fluent-Bit can give frustration to users as it does not conform to Confluent's Kafka schema. Even if you are not using Confluent's Kafka instance, 
trying to deserialize the data can be a bit of a nightmare if you don't realize that you need to ignore the first 17 bytes. [A fix is available](https://github.com/fluent/fluent-bit/pull/5435) 
for those of us who follow Confluent's Kafka or just trying to deserialize data in general. However, if you are not in the position to apply the patch in your Kafka's instance, then you'll need 
to apply 17 bytes offset to ignore the random 16 generated bytes for the serial id and 1 NULL byte.


