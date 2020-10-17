import debug from "debug";
import execa from "execa";
import { resolveExe } from "../src/release_downloader";

const PORT = 44444;

const corinthLog = debug("corinth");

export async function spawnCorinth(port = PORT, interval: number = 0) {
  const exeName = resolveExe("testcorinth");
  const path = `./${exeName}`;
  debug("test:message")(`Spawning ${path} with port ${port}`);
  const proc = execa(path, {
    env: {
      CORINTH_PORT: port.toString(),
      CORINTH_COMPACT_INTERVAL: interval.toString(),
    },
  });
  proc.stderr?.on("data", (msg) => {
    corinthLog(msg.toString());
  });
  return proc;
}

spawnCorinth();
