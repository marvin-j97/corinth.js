import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

ava.serial("Peek empty queue", async (t) => {
  const queue = await corinth.createQueue("queue0", {
    persistent: false,
  });
  const peeked = await queue.peek();
  t.is(peeked, null);
});
