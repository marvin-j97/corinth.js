import ava, { before } from "ava";
import { existsSync, unlinkSync } from "fs";
import { Corinth, resolveExe } from "../src/corinth";

const exeName = resolveExe("corinth");
const custom = "corinth_download";

before(() => {
  if (existsSync(exeName)) {
    unlinkSync(exeName);
  }
  if (existsSync(custom)) {
    unlinkSync(custom);
  }
});

ava.serial("Download for OS", async (t) => {
  t.assert(!existsSync(exeName));
  await Corinth.download();
  t.assert(existsSync(exeName));
});

ava.serial("Download with custom name", async (t) => {
  t.assert(custom);
  await Corinth.download(custom);
  t.assert(custom);
});
