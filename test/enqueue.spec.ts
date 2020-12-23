import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());
const queueName = "enqueue_queue";
const queue = corinth.defineQueue<{ name: string }>(queueName);

ava.serial("Enqueue item", async (t) => {
  await queue.create({ persistent: false });
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
