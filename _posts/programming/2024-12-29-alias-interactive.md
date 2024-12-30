---
layout: post
title:  "Utilizing Aliases and Interactive Mode to Force Users to Think Twice Before Deleting Files"
description: "Using interactive mode and alias to force users to think twice before overwriting files"
date: 2024-12-29
categories: [micro, linux]
permalink: micro/2024/12/:title
---

I previously mentioned that [I lost my file](../jekyll-cache) by accidentally overwriting my file using the `cp` command. This got me thinking as to why this would be impossible on 
my work laptop since I would be constantly bombarded with a prompt to confirm my intention to overwrite the file. 

```
$ cp 2024-12-01-template.md 2024-12-30-alias-interactive.md
cp: overwrite '2024-12-30-alias-interactive.md'?
```

Commands like `mv` and `cp` have an **interactive** flag `-i` to prompt before overwriting the file. As seen in `man 1 cp`

```
-i, --interactive
              prompt before overwrite (overrides a previous -n option)
```

To force everyone at work to have this flag enabled, they made `cp` and `mv` an alias in our default shell configs:

```bash
alias cp="cp -i"
alias mv="mv -i"
```

Which you can also verify using the `type` command:
```
$ type cp
cp is aliased to `cp -i'
$ type mv
mv is aliased to `mv -i'
```
