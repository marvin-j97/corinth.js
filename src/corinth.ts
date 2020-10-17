import { CorinthError } from "./error";
import haxan from "haxan";
import { Queue } from "./queue";
import { platform } from "os";
import { createWriteStream, existsSync, ReadStream } from "fs";

function downloadStream(source: ReadStream, output: string) {
  return new Promise((done, reject) => {
    const writer = createWriteStream(output);
    writer.on("error", (err) => {
      console.error(err);
      reject();
    });
    writer.on("close", done);
    source.pipe(writer);
  });
}

function resolveExe(base: string): string {
  const plat = platform();
  return plat === "win32" ? base + ".exe" : base;
}

interface IGithubAsset {
  name: string;
  browser_download_url: string;
}

function findAssetForOS(assets: IGithubAsset[]): IGithubAsset | null {
  const plat = platform();
  if (plat === "win32") {
    return assets[assets.findIndex((a) => a.name.includes(".exe"))] || null;
  }
  if (plat === "linux") {
    return assets[assets.findIndex((a) => a.name.includes("linux"))] || null;
  }
  if (plat === "darwin") {
    return assets[assets.findIndex((a) => a.name.includes("darwin"))] || null;
  }
  throw new Error(`Unsupported platform: ${platform}`);
}

interface IQueueCreateOptions {
  requeue_time: number;
  deduplication_time: number;
  persistent: boolean;
  max_length: number;
  dead_letter_queue_name: Queue;
  dead_letter_queue_threshold: number;
}

export class Corinth {
  ip: string;

  constructor(ip: string) {
    this.ip = ip;
  }

  static async download(path = resolveExe("corinth")): Promise<boolean> {
    if (existsSync(path)) {
      return false;
    }

    const releasesResponse = await haxan<{ assets: IGithubAsset[] }[]>(
      "https://api.github.com/repos/dotvirus/corinth/releases",
    ).request();

    if (releasesResponse.ok) {
      const latest = releasesResponse.data[0];
      const asset = findAssetForOS(latest.assets);
      if (!asset) {
        throw new Error("No asset for platform found");
      }
      console.log(`Fetching ${asset.browser_download_url}`);
      const downloadResponse = await haxan<ReadStream>(
        asset.browser_download_url,
      )
        .type(haxan.ResponseType.Stream)
        .send();
      if (downloadResponse.ok) {
        console.log(`Downloading to ${path}`);
        await downloadStream(downloadResponse.data, path);
        return true;
      } else {
        throw new Error(`Error from GitHub API: ${downloadResponse.status}`);
      }
    } else {
      throw new Error(`Error from GitHub API: ${releasesResponse.status}`);
    }
  }

  async queueExists(name: string): Promise<boolean> {
    const queue = new Queue(this.ip, name);
    try {
      await queue.stat();
      return true;
    } catch (error) {
      if (error.isCorinthError) {
        if (error.res.status === 404) {
          return false;
        }
      }
      throw error;
    }
  }

  async createQueue<T = unknown>(
    name: string,
    opts?: Partial<IQueueCreateOptions>,
  ): Promise<Queue<T>> {
    const queue = new Queue<T>(this.ip, name);
    const query = opts || {};
    const request = haxan(queue.uri(), {
      query: {
        ...query,
        dead_letter_queue_name:
          query.dead_letter_queue_name?.getName() || undefined,
      },
    }).method(haxan.HTTPMethod.Put);
    const res = await request.send();
    if (res.ok) {
      return queue;
    }
    throw new CorinthError(res);
  }

  async ensureQueue<T = unknown>(
    name: string,
    opts?: Partial<IQueueCreateOptions>,
  ): Promise<Queue<T>> {
    const queue = new Queue<T>(this.ip, name);
    try {
      return await this.createQueue(name, opts);
    } catch (error) {
      if (error.isCorinthError) {
        if (error.res.status === 409) {
          return queue;
        }
      }
      throw error;
    }
  }
}
