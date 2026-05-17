---
title: "Freelancing"
date: 2026-05-17T14:33:37-04:00
draft: false
---

As part of my 11 projects in 11 months initiative, I worked on a [freelance project](https://flinda.io) for the past couple of weeks. I initially declined because freelancing defeated the purpose of this initiative, which was to work on my own projects, but I ended up taking the project for a couple of reasons:
1. The client validated the idea. It was addressing a problem his team was having at work and he also found out other companies were experiencing this problem.
2. The client took a stab at building the MVP. Although it did not work, I was able to see his vision and it gave me an idea of what he wanted to build.
3. The client had experience working with devs before, which I find helpful because it makes it easier to communicate and set expectations.

As the first step, we worked together to define the scope. Initially, the client had a long list of features even for the MVP so I recommended that we trim it down to the core features. His goal was to have a working product he could demo to potential users. Learning his objective made it easier to figure out what features were needed vs. what could be deferred to later iterations.

This project was interesting because it was my first time working on a vibe-coded project from someone who is not an engineer. Not surprisingly, the code was bloated with tangled logic across frontend, server and DB that had built up over many iterations and changes in direction. It was hard to know what could be kept and what could be safely removed.

I had two options: rewrite from scratch or build on top of the client's codebase. I decided to build on top of it because the the MVP already had a lot of features and I wasn't confident I could reach feature parity within a reasonable timeframe. Building on top of what was there let me ship working features from day one.

The workflow I settled on was to first audit the code with coding agents for a specific feature. I would get a report where the agent tells me what needs to be cleaned up vs. what could be kept. Based on the report, I would decide on the next steps and slowly clean up the codebase and make it work at the same time. I initially asked both Claude and Codex to run independent reports because one agent would pick up on something the other missed, but this was expensive because I was using both agents' tokens for the same job.

I was able to make a lot of progress using coding agents but it also limited me to work on the project for 2-3 hours at a time because I would reach the token limit. Claude Opus 4.7 burned tokens really fast so I learned to be careful about which model I use for each task. Codex lasts longer, but in general I think it's good practice to know which model is best suited for a given task to stay token-efficient.

I'm glad I took on this project because I had a lot of fun working on it. I am surprised how much ground we covered given that the total engagement was only 20 hours (2.5 days of work). Working in focused time blocks and logging what I did each hour helped me to stay focused and be honest where my time was being spent. It reminded me of something my director once told me. He said he used to keep an hourglass on his desk and audit his work against it. It kept him honest and helped him deliver quickly.

One thing I didn't account for was how time-consuming client communication can be. It was mostly emails with weekly check-ins but it still added up and I did not charge for any of it. I probably ended up spending closer to 25-30 hours on the project. I should bill for those hours going forward.

