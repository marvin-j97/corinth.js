import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { Queue } from "../src/queue";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

const queueName = "my_queue";
const queue = new Queue(corinth, queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await corinth.createQueue(queueName, {
    persistent: false,
  });
  t.assert(await queue.exists());
  const { requeue_time } = await queue.stat();
  t.is(requeue_time, 300);
});

ava.serial("Edit queue", async (t) => {
  await queue.edit({
    requeue_time: 150,
  });
  const { requeue_time } = await queue.stat();
  t.is(requeue_time, 150);
});
