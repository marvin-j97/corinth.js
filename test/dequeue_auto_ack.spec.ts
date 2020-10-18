import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { Queue } from "../src/queue";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());
const queue = new Queue(corinth, "queue0");

ava.serial("Enqueue to queue", async (t) => {
  await corinth.ensureQueue(queue.getName(), {
    persistent: false,
  });
  {
    const { size } = await queue.stat();
    t.is(size, 0);
  }
  const result = await queue.enqueueOne({
    name: "test",
  });
  t.is(result.items.length, 1);
  {
    const { size } = await queue.stat();
    t.is(size, 1);
  }
});

ava.serial("Dequeue with auto ack", async (t) => {
  const result = await queue.dequeue(true);
  t.deepEqual(result[0].message.item, {
    name: "test",
  });
  {
    const { size, num_unacknowledged, num_acknowledged } = await queue.stat();
    t.is(size, 0);
    t.is(num_unacknowledged, 0);
    t.is(num_acknowledged, 1);
  }
});
