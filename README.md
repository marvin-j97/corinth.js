# Corinth.js

Node.js wrapper for [Corinth](https://github.com/marvin-j97/corinth), a Rust message queue server.

[![codecov](https://codecov.io/gh/marvin-j97/corinth.js/branch/dev/graph/badge.svg?token=ILBZQH7KH8)](https://codecov.io/gh/marvin-j97/corinth.js)
![CI & Coverage](https://github.com/marvin-j97/corinth.js/workflows/CI%20&%20Coverage/badge.svg)


#### Example

```typescript
import { Corinth } from "corinth.js";

const hostUrl = "http://localhost:44444";
const corinth = new Corinth(hostUrl);

interface IItem {
  id: string;
}

// myQueue contains IItem objects
// This does not create the queue, just define a model to interact with
const myQueue = corinth.defineQueue<IItem>("myQueue");

// Ensure queue exists
await transcodeQueue.ensure();

// Enqueue an item
await transcodeQueue.enqueueOne({ id: "abc" });

// Get one or more items from the queue
// Gets one by default
const result = await transcodeQueue.dequeue();
const item = result[0];

// Process your item
await processItem(item);

// Acknowledge success
await item.ack();
```
