import ava, { after, before } from "ava";
import { existsSync, unlinkSync } from "fs";

import { resolveExe, downloadCorinth } from "./util/release_downloader";

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
  t.assert(await downloadCorinth());
  t.assert(existsSync(exeName));
  t.assert(!(await downloadCorinth()));
});

ava.serial("Download with custom name", async (t) => {
  t.assert(!existsSync(custom));
  t.assert(await downloadCorinth(custom));
  t.assert(existsSync(custom));
  t.assert(!(await downloadCorinth(custom)));
});
