import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

ava.serial("Peek empty queue", async (t) => {
  const queue = await corinth.createQueue<{ name: string }>("queue0");
  {
    const { size } = await queue.stat();
    t.is(size, 0);
  }
  const result = await queue.enqueueOne({
    name: "test",
  });
  t.is(result.items.length, 1);
  {
    const { size } = await queue.stat();
    t.is(size, 1);
  }
});
