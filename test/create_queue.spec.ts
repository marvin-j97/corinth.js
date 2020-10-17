import ava from "ava";
import { Corinth, Queue } from "../src";
import { getIp } from "./common";

const corinth = new Corinth(getIp());

ava.serial("Create queue", async (t) => {
  const queueName = "my_queue";
  const queue = new Queue(corinth, queueName);
  t.assert(!(await queue.exists()));
  await corinth.createQueue(queueName);
  t.assert(await queue.exists());
});
