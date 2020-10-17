import haxan from "haxan";

import { CorinthError } from "./error";
import { IQueueStat, Queue } from "./queue";
import { downloadCorinth, resolveExe } from "./release_downloader";
import { IResult } from "./types";

interface IQueueCreateOptions {
  requeue_time: number;
  deduplication_time: number;
  persistent: boolean;
  max_length: number;
  dead_letter_queue: Queue;
  dead_letter_queue_threshold: number;
}

interface ICorinthStats {
  name: "Corinth";
  version: string;
  uptime_ms: number;
  uptime_secs: number;
  started_at: number;
}

export class Corinth {
  ip: string;

  constructor(ip: string) {
    this.ip = ip;
  }

  async stat(): Promise<ICorinthStats> {
    const request = haxan<IResult<ICorinthStats>>(this.ip).method(
      haxan.HTTPMethod.Put,
    );
    const res = await request.send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!;
    }
    throw new CorinthError(res);
  }

  static async download(path = resolveExe("corinth")): Promise<boolean> {
    return downloadCorinth(path);
  }

  async listQueues(): Promise<IQueueStat[]> {
    const request = haxan<IResult<{ queues: { items: IQueueStat[] } }>>(
      `${this.ip}/queues`,
    );
    const res = await request.send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!.queues.items;
    }
    throw new CorinthError(res);
  }

  async queueExists(name: string): Promise<boolean> {
    const queue = new Queue(this, name);
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
    const queue = new Queue<T>(this, name);
    const query = opts || {};
    const request = haxan(queue.uri(), {
      query,
    }).method(haxan.HTTPMethod.Put);

    delete query.dead_letter_queue;
    if (opts?.dead_letter_queue) {
      request.param(
        "query.dead_letter_queue_name",
        opts.dead_letter_queue.getName(),
      );
    }

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
    const queue = new Queue<T>(this, name);
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
