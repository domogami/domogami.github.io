---
---

## Where to cache?

We can cache on the client side with browser storage, on the sever edge like a CDN/CloudFront. Or we can cache server side.

## Types of Cache

* Cache Aside (most common) - Cache when the user needs something, the application checks the cache, if it's not there it updates the database and also updates the cache
* Write-Through (bad) - Every write will write to the cache and then to the database. This could pollute the cache with data that isn't actually read. Only when every read must return data quickly and write latency is tolerable.
* Write behind - similar to Write Through, except the database updates are flushed asynchronously. This is okay when data loss is okay in case the Cache crashes, only important when writes speed is more important than immediate consistency.
* Read through - (this is how a CDN works) on a CDN miss, you check the cache first and then read from DDB as fallback and save result to the cache for next time.
