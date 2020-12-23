import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

const queueName = "delete_queue";
const queue = corinth.defineQueue(queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await queue.create({
    persistent: false,
  });
  t.assert(await queue.exists());
});

ava.serial("Delete queue", async (t) => {
  await queue.delete();
  t.assert(!(await queue.exists()));
});
