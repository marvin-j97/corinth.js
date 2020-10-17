import ava, { after, before } from "ava";
import { existsSync, unlinkSync } from "fs";
import { Corinth } from "../src/corinth";
import { resolveExe } from "../src/release_downloader";

const exeName = resolveExe("corinth");
const custom = "corinth_download";

function cleanup() {
  if (existsSync(exeName)) {
    unlinkSync(exeName);
  }
  if (existsSync(custom)) {
    unlinkSync(custom);
  }
}

before(cleanup);
after(cleanup);

ava.serial.skip("Download for OS", async (t) => {
  t.assert(!existsSync(exeName));
  await Corinth.download();
  t.assert(existsSync(exeName));
});

ava.serial.skip("Download with custom name", async (t) => {
  t.assert(custom);
  await Corinth.download(custom);
  t.assert(custom);
});
