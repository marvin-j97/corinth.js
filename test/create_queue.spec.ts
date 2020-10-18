import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { CorinthError } from "../src/error";
import { Queue } from "../src/queue";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

const queueName = "my_queue";
const queue = new Queue(corinth, queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await corinth.createQueue(queueName);
  t.assert(await queue.exists());
});

ava.serial("Conflict create queue", async (t) => {
  try {
    t.assert(await queue.exists());
    await corinth.createQueue(queueName);
    t.fail();
  } catch (error) {
    const err = <CorinthError>error;
    t.assert(err.isCorinthError);
    t.is(err.res.status, 409);
  }
});
