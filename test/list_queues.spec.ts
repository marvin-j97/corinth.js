import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

ava.serial("List queues", async (t) => {
  const names = ["queue0", "queue1", "queue2", "queue3", "queue4"];
  for (const name of names) {
    await corinth.createQueue(name, {
      persistent: false,
    });
  }
  const queues = await corinth.listQueues();
  t.is(queues.length, names.length);
  t.deepEqual(names.slice().sort(), queues.map((x) => x.name).sort());
});
