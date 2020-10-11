---
title: "Github Apps on GHE: Your Private Key is not Correct"
published: true
---
If you are working on a Github App on an Enterprise Edition and encounter an error such as `Your Private Key is not Correct`, it may not be anything wrong with your private key at all. You just need to set `GHE_HOST` variable to resolve the issue.

While working on my first Github App at work, I originally made a skeleton Github App on my personal Github account that simply just logged whenever someone edited an issue. I ported this skeleton code to my work account which is hosted on the enterprise version of Github. However, to my surprise the app was no longer working giving me this weird error:
```
03:01:02.831Z ERROR probot: Your private key (usually a .pem file) is not correct. Go to https://github.com/settings/apps/YOUR_APP and generate a new PEM file. If you're deploying to Now, visit https://probot.github.io/docs/deployment/#now.
  HttpError: A JSON web token could not be decoded
      at 
```
Based on the error, it seemed like there was something wrong with my private key. However after fiddling with my private key, permissions for the app and other things for hours, I found the error has nothing to do with your private key. Although the error does hint the issue, it wasn't obvious to me for a while. If you look at the error, it shows to generate a new PEM file on github.com. I knew the link was wrong in the beginning but just ignored it during my initial investigation. Turns out that is actually the key issue. You need to specify `GHE_HOST` on the `.env` file. Previously I was testing on my personal Github account that is not accessing enterprise Github repositories. If you read [Protobot's configuration documentation](https://probot.github.io/docs/configuration/), you'll find `GHE_HOST` is an environment variable that exists under the `less common environment variables`. Setting `GHE_HOST` resolved `Your Private Key is not Correct` error even though it has nothing to do with your private key. Though having the wrong host would explain a lot why your private key does not work.
