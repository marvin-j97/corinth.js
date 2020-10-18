import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

ava.serial("Get root info", async (t) => {
  const info = await corinth.stat();
  t.is(info.name, "Corinth");
});
