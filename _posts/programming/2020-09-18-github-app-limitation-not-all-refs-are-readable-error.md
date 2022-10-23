---
layout: post
title: "Github App Limitation - not all refs are readable"
categories: [programming, github]
---

## Introduction
Recently I have been reading up and working on creating a Github App for work to automate some process to create a pull request that contains code changes from various branches. For those of you who are not familiar with Github Apps, a Github App is an app you can install or create to automate your workflow such as giving feedback on issues or pull requests if they don't meet the guidelines or are missing information. The entire [Github marketplace](https://github.com/marketplace) is dedicated to selling apps and actions to automate workflows.

Github Apps can be created using a framework called [Protobot](https://probot.github.io/) which is "optimized" for Github in the sense that you can receive webhooks and use the authenticated client to access the Github API. Essentially, it just makes communication between Github and your app much easier to work with.

## Not All Refs Are Readable Error
While working on my Github App, I was originally working on testing if I could create a pull request from one repository to another. I had no issues writing the code for this on my Github App so when I decided it was time to test my app on the target repository, I was encountering issues. I kept on getting an error: `Not All Refs Are Readable` whenever I tried to create a pull request. This puzzled me because I was so lost as to why my application could not read all the git references from my repository. I originally thought perhaps there were some issues with Github App settings that control what accesses the app can have via REST API. However, I could not find any reason why the settings I applied to the app would restrict it from reading references from my target repository. Turns out this is a limitation that exists on Github App.

To give context as to what I was trying to do, I am trying to give the ability for developers to create pull requests from creating an issue from some repository to our product's repository. Both repositories are private repository meaning the access is restricted to only developers, engineers and support who are directly working on the product to have access and not some other team who is working on another unrelated product.

## Limitations of Github App
Github Apps can be installed in multiple organizations and on your personal account, very easily. You just click a few buttons to select what repositories you want the app to have access to and then you are done. However, each instance of the app can only be authenticated on one organization or account at a time. So what happens if you want the app to perform any action that requires authentication of multiple accounts/organizations? It's not possible.

A user who was working on a similar app as mine encountered this issue much earlier than me in 2019 to Github Support. The issue was titled [Working across organizations with Github apps](https://github.community/t/working-across-organizations-with-github-apps/13721). This was the situation he was working on:

* I have two organizations; org1 and org2. In each org there is a private repo; repo1. org2:repo1 is forked from org1:repo1.

* I want to create a PR for org2:repo1 -&gt; org1:repo1. The app is authenticated with org1.

* I always receive a “422: not all refs are readable” error when trying to create the PR. The app is installed on both organizations and I’ve checked that I can make a PR inside each org.

The limitation of Github is that you cannot work with actions that involve two or more private organizations/accounts that require separate authentication. In my and the user's case, we were trying to have the app create a pull request between a private fork and parent. Having developers work on forks is a common practice when working on a project. Although I am used to directly working on the parent repo only for school projects, there are some caveats in this method. You are giving too much power to developers if you allow them to modify the parent without any form of access control such as having a requirement for changes to be code reviewed via Pull Requests. So naturally, we would want to create an ability to create a PR via Github App  between a fork and parent repo where the parent repo is owned by the organization and the fork is owned by the developer themselves.

## Solution
Since you cannot work with two private repositories owned by different organizations/users, developers will have to avoid using Github App functionalities and do it the old way: POST Requests. For some reason, I am always thinking of OAuth App (which is similar to Github App except your app acts as a Github user and not as its own entity - think of Github App as a Discord bot) when I am writing this post. Using the regular old fashion POST requests gives us the flexibility to create a request as an authenticated user as long as we provide the Github token on the header of the request. This allows us to be authenticated to more than one account at the same time and hence will solve the issue. 