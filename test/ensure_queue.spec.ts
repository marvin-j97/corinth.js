import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

const queueName = "ensure_queue";
const queue = corinth.defineQueue(queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await queue.create({
    persistent: false,
  });
  t.assert(await queue.exists());
});

ava.serial("Ensure queue", async (t) => {
  try {
    t.assert(await queue.exists());
    await queue.ensure();
    t.pass();
  } catch (error) {
    t.fail();
  }
});
