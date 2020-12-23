import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { CorinthError } from "../src/error";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

const queueName = "create_queue";
const queue = corinth.defineQueue(queueName);

ava.serial("Create queue", async (t) => {
  t.assert(!(await queue.exists()));
  await queue.create({
    persistent: false,
  });
  t.assert(await queue.exists());
});

ava.serial("Conflict create queue", async (t) => {
  try {
    t.assert(await queue.exists());
    await queue.create({
      persistent: false,
    });
    t.fail();
  } catch (error) {
    const err = <CorinthError>error;
    t.assert(err.isCorinthError);
    t.is(err.res.status, 409);
  }
});
