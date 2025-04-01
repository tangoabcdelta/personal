**Explain the event-driven architecture of Node.js.**
**What is the difference between `process.nextTick()` and `setImmediate()`?**
**How does the Node.js event loop work?**
**What are streams in Node.js, and how do you use them?**
**Explain the concept of middleware in Express.js.**
**How do you handle asynchronous operations in Node.js?**
**What are the benefits of using Node.js for backend development?**
**How do you manage environment variables in a Node.js application?**
**What is the purpose of the `package.json` file?**
**How do you handle errors in Node.js applications?**
**Explain the concept of the event loop in Node.js and how it handles asynchronous operations.**
**What are worker threads in Node.js, and how do they differ from the main thread?**
**How does Node.js handle memory management and garbage collection?**
**Describe the process of clustering in Node.js and its benefits.**
**What are the differences between `Buffer` and `Stream` in Node.js?**
**How would you implement a rate limiter in a Node.js application?**
**Explain the concept of microservices and how you would implement them using Node.js.**
**What are the security best practices you follow when developing a Node.js application?**
**How do you handle database connections in a Node.js application, especially in a high-concurrency environment?**
**Explain the role of middleware in Express.js and how you can create custom middleware.**
**How would you handle a memory leak in a Node.js application? Describe the steps you would take to identify and fix it.**
**Explain the concept of backpressure in Node.js streams and how you would manage it.**
**What are the differences between `fork()` and `spawn()` methods in Node.js, and when would you use each?**
**How do you implement a zero-downtime deployment for a Node.js application?**
**Describe how you would design a scalable microservices architecture using Node.js.**
**What are the potential security vulnerabilities in a Node.js application, and how would you mitigate them?**
**Explain how you would handle distributed transactions in a microservices architecture using Node.js.**
**How do you optimize the performance of a Node.js application under heavy load?**
**What is the role of the `libuv` library in Node.js, and how does it interact with the event loop?**
**Describe the process of implementing a custom Node.js module in C++ using Node-API (N-API).**
**How would you design a schema for a social media application using MongoDB? Explain your choices for embedding vs. referencing.**
**Describe how you would implement pagination in a MongoDB collection with millions of documents.**
**What are the differences between `populate()` and `aggregate()` in Mongoose, and when would you use each?**
**How do you handle transactions in MongoDB, especially in a microservices architecture?**
**Explain the concept of sharding in MongoDB and how it improves performance and scalability.**
**How would you optimize a MongoDB query that is performing poorly?**
**Describe the process of implementing full-text search in MongoDB.**
**What are the potential pitfalls of using NoSQL databases like MongoDB, and how can you mitigate them?**
**How do you handle data migrations in a MongoDB database?**
**Explain how you would secure a MongoDB database in a production environment.**

### Connection Pools
**What is a connection pool, and how does it improve database performance?**
**How do you configure a connection pool in a Node.js application using Mongoose?**
**Explain the difference between connection pooling and connection multiplexing.**
**How do you handle connection pool exhaustion in a high-concurrency environment?**
**Describe the process of tuning a connection pool for optimal performance.**
**What are the potential issues with using a single connection pool for multiple databases?**
**How do you implement a custom connection pool in Node.js?**
**Explain the concept of connection pooling in the context of a microservices architecture.**
**How do you monitor and debug connection pool performance issues?**
**What are the security considerations when using connection pools in a production environment?**


### Thread Pools
**What is a thread pool, and why is it used in concurrent programming?**
**Explain the difference between a fixed thread pool and a cached thread pool.**
**How do you handle thread starvation in a thread pool?**
**Describe the process of tuning a thread pool for optimal performance.**
**What are the potential issues with using a single thread pool for both CPU-bound and I/O-bound tasks?**
**How do you implement a custom thread pool in Node.js?**
**Explain the concept of work stealing in thread pools.**
**How do you monitor and debug thread pool performance issues?**
**What are the advantages and disadvantages of using thread pools in a microservices architecture?**

**How do you configure the size of a thread pool in a Node.js application?**
Libuv is a cross-platform C library that provides support for asynchronous I/O operations. It was originally developed for Node.js and is now used by other software projects as well. Libuv's role in Node.js is to handle the event loop and provide a consistent way to manage asynchronous tasks across different operating systems. This includes file system operations, network requests, and child process management. 
Libuv uses an event-driven, non-blocking I/O model, which allows Node.js to handle multiple concurrent operations efficiently. It achieves this by using a thread pool to offload blocking operations, such as file system access and DNS lookups, while the main thread remains free to handle other events. The default size of libuv's thread pool is four threads.
When an asynchronous operation is initiated in Node.js, libuv takes over and manages the operation in the background. Once the operation is complete, libuv notifies Node.js through a callback function, which is then executed in the event loop. This allows Node.js to continue processing other requests while waiting for I/O operations to finish.

The threadpool is maintained by `threadpool.c` source file.
An exported `UV_THREADPOOL_SIZE` environment variable in Unix environments can also be used.
There are reports that if this env variable is not set, then a programmer will be limited to a threadpool of just 4 threads.
This is probably the default size of the threadpool.

Execute the threadpool size from the `ENV` variables:
 
    UV_THREADPOOL_SIZE=64 node

If you're running a Windows OS and running via a .js file you'll need to set the `UV_THREADPOOL_SIZE` prior to calling the script via node. 

Example in cmd: `SET UV_THREADPOOL_SIZE=2 && node my-file-to-run.js` (no spaces around the `=`)

Or in Powershell: `$env:UV_THREADPOOL_SIZE = 2 && node my-file-to-run.js`

You can also modify from inside the node program :

    process.env.UV_THREADPOOL_SIZE=64
    //then execute some function that requires threadpool
    require('fs').readFile('testing',function(){});

Alternatively, you can check the `cpus()` method for determining the threadpool size:

    const OS = require('os');
    process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

Testing threads:

    ps -Lef | grep  "\<node\>" | wc -l
    67




### Network Jitter and Retries
**What is network jitter, and how does it affect real-time applications?**
**How can you measure and mitigate network jitter in a distributed system?**
**Explain the difference between latency and jitter.**
**What techniques can be used to handle packet loss and retries in a network?**
**How do you implement exponential backoff for retry mechanisms in a networked application?**
**Describe how you would design a system to handle high network latency and jitter.**
**What are the best practices for implementing retries in a RESTful API?**
**How do you handle idempotency in retry logic for network requests?**
**Explain the impact of network jitter on VoIP and video conferencing applications.**
**What tools and techniques can be used to simulate network jitter and test its effects on an application?**




https://www.fullstack.cafe/blog/mern-stack-interview-questions
https://github.com/shubhdhungana/mern-interview-sets-pdf
https://www.skillvertex.com/blog/60-mern-stack-advanced-interview-questions/
https://www.fullstack.cafe/blog/7-hardest-nodejs-interview-questions-and-answers
https://www.fullstack.cafe/blog/node-js-interview-questions
https://www.quickread.in/top-50-advance-nodejs-interview-questions/
https://nareshit.com/blogs/37-advanced-java-interview-questions-for-freshers
https://www.geekinterview.com/question_details/55425
https://stackoverflow.com/questions/61504619/question-regarding-the-implementation-of-a-connection-pool

