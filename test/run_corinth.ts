import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import debug from "debug";
import { chmodSync, existsSync, rmdirSync } from "fs";
import { downloadCorinth, resolveExe } from "../src/release_downloader";

const PORT = 44444;

const corinthLog = debug("corinth");

let corinth: ChildProcessWithoutNullStreams;

export async function spawnCorinth(port = PORT, interval: number = 0) {
  const exeName = resolveExe("testcorinth");
  if (!existsSync(exeName)) {
    await downloadCorinth(exeName);
    chmodSync(exeName, "755");
  }
  rmdirSync(".corinth", { recursive: true });
  console.log("Setup corinth successfully");

  const path = `./${exeName}`;
  const proc = spawn(path, {
    env: {
      CORINTH_PORT: port.toString(),
      CORINTH_COMPACT_INTERVAL: interval.toString(),
    },
  });
  proc.stderr.on("data", (msg) => {
    corinthLog(msg.toString());
  });
  corinth = proc;
  return proc;
}

export const setupCorinth = async () => {
  await spawnCorinth(PORT);
  console.log("Spawned corinth");
};

process.on("exit", () => {
  console.log("Killing corinth");
  corinth.kill();
});
