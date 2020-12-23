import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());
const queueName = "purge";
const queue = corinth.defineQueue(queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await queue.create({
    persistent: false,
  });
  t.assert(await queue.exists());
  await queue.enqueueOne({
    name: "test",
  });
  {
    const { size } = await queue.stat();
    t.is(size, 1);
  }
});

ava.serial("Purge queue", async (t) => {
  await queue.purge();
  t.assert(await queue.exists());
  {
    const { size } = await queue.stat();
    t.is(size, 0);
  }
});
