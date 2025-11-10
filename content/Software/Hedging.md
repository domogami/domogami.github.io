---
---

## Summary

* TikTok that taught me: https://www.tiktok.com/t/ZPHp6RencHpvq-XjLMP/

## 🎯 What is request hedging (AI Response)

In this context, hedging means sending duplicate or backup requests to mitigate the risk of one request being a “straggler” (i.e., much slower than normal) and thus dragging down overall latency.
In other words: you treat your call to a dependency like a bet. If one path might be slow, you place an “insurance” duplicate call just in case, and use whichever wins.

Detailed:

* Suppose you have a microservice A that calls microservice B. Most of the time B responds quickly (say P95 = 20 ms). But sometimes B chokes (due to GC, network, load imbalance), and occasionally that request might take 200 ms or more.
* If A must wait for B, those tail-latency cases creep into user-visible latency.
* With hedging: A fires the normal request to B. After a short delay (say 20 ms, which is around B’s P95), if B hasn’t responded, A also fires a second request (maybe to another replica of B). Whichever response comes first wins; the other is cancelled or ignored.
* This dramatically reduces your P99 or P99.9 latency at the cost of a little extra load.
  This pattern is well documented in the context of distributed systems: for example, see the blog by Costa Alexoglou: “Hedging: A ‘Simple’ Tactic to Tame Tail Latency in Distributed Systems”. 
  Alex Oglou Blog
* Also, the official docs of gRPC include hedging as a supported retry/hedging policy. 
  gRPC
