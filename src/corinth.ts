import haxan from "haxan";

import { CorinthError } from "./error";
import { IQueueStat, Queue } from "./queue";
import { IResult } from "./types";

interface ICorinthStats {
  name: "Corinth";
  version: string;
  uptime_ms: number;
  uptime_secs: number;
  started_at: number;
}

// type LoggerFunction = (...msgs: any[]) => void;

// interface ICorinthRootOptions {
//   logger: LoggerFunction;
// }

export class Corinth {
  private ip: string;
  // private logger?: LoggerFunction;

  constructor(ip: string /*opts?: ICorinthRootOptions*/) {
    this.ip = ip;
    // this.logger = opts?.logger;
  }

  getIp(): string {
    return this.ip;
  }

  uri(route: string): string {
    return `${this.ip}${route}`;
  }

  // getLogger(): LoggerFunction | undefined {
  //   return this.logger;
  // }

  async version(): Promise<string> {
    const { version } = await this.stat();
    return version;
  }

  async stat(): Promise<ICorinthStats> {
    const request = haxan<IResult<{ info: ICorinthStats }>>(this.uri("/"));
    const res = await request.send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!.info;
    }
    throw new CorinthError(res);
  }

  async listQueues(): Promise<IQueueStat[]> {
    const request = haxan<IResult<{ queues: { items: IQueueStat[] } }>>(
      this.uri("/queues"),
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
    return queue.exists();
  }

  defineQueue<T>(name: string): Queue {
    return new Queue<T>(this, name);
  }
}
