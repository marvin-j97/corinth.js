import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());
const queueName = "peek_empty";
const queue = corinth.defineQueue(queueName);

ava.serial("Peek empty queue", async (t) => {
  await queue.create({
    persistent: false,
  });
  const peeked = await queue.peek();
  t.is(peeked, null);
});
