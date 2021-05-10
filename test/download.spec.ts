import ava, { after, before } from "ava";
import { existsSync, unlinkSync } from "fs";
import { Corinth } from "../src/corinth";
import { resolveExe } from "./util/release_downloader";

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

ava.serial("Download for OS", async (t) => {
  t.assert(!existsSync(exeName));
  t.assert(await Corinth.download());
  t.assert(existsSync(exeName));
  t.assert(!(await Corinth.download()));
});

ava.serial("Download with custom name", async (t) => {
  t.assert(!existsSync(custom));
  t.assert(await Corinth.download(custom));
  t.assert(existsSync(custom));
  t.assert(!(await Corinth.download(custom)));
});
