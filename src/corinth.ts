import { CorinthError } from "./error";
import haxan from "haxan";
import { Queue } from "./queue";

export class Corinth {
  ip: string;

  constructor(ip: string) {
    this.ip = ip;
  }

  async queueExists(name: string) {
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

  async createQueue<T = unknown>(name: string) {
    const queue = new Queue<T>(this.ip, name);
    const request = haxan(queue.uri()).method(haxan.HTTPMethod.Put);
    const res = await request.send();
    if (res.ok) {
      return queue;
    }
    throw new CorinthError(res);
  }

  async ensureQueue<T = unknown>(name: string) {
    const queue = new Queue<T>(this.ip, name);
    try {
      return await this.createQueue(name);
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
