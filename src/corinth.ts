import { CorinthError } from "./error";
import haxan from "haxan";
import { Queue } from "./queue";

export class Corinth {
  ip: string;

  constructor(ip: string) {
    this.ip = ip;
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
}
