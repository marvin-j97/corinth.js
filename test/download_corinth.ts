import { existsSync } from "fs";
import { rmdirSync } from "fs";
import { resolveExe, downloadCorinth } from "../src/release_downloader";

const exeName = resolveExe("testcorinth");

(async () => {
  if (!existsSync(exeName)) {
    await downloadCorinth(resolveExe("testcorinth"));
  }
  rmdirSync(".corinth", { recursive: true });
  console.log("Setup corinth successfully");
  process.exit(0);
})();
