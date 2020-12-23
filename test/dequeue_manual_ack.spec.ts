import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());
const queueName = "dequeue_manual_ack";
const queue = corinth.defineQueue(queueName);

ava.serial("Enqueue to queue", async (t) => {
  await queue.ensure({
    persistent: false,
  });
  {
    const { size, persistent } = await queue.stat();
    t.is(size, 0);
    t.assert(!persistent);
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

ava.serial("Dequeue with manual ack", async (t) => {
  const result = await queue.dequeue();
  t.deepEqual(result[0].message.item, {
    name: "test",
  });
  {
    const { size, num_unacknowledged, num_acknowledged } = await queue.stat();
    t.is(size, 0);
    t.is(num_unacknowledged, 1);
    t.is(num_acknowledged, 0);
  }

  await result[0].ack();
  {
    const { size, num_unacknowledged, num_acknowledged } = await queue.stat();
    t.is(size, 0);
    t.is(num_unacknowledged, 0);
    t.is(num_acknowledged, 1);
  }
});
