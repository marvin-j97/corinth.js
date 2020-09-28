import { CorinthError } from "./error";
import haxan from "haxan";

enum MessageState {
  Pending,
  Requeued,
}

export interface IMessage<T> {
  id: string;
  item: T;
  num_requeues: number;
  queued_at: number;
  state: MessageState;
  updated_at: number;
}

export interface IQueueStat {
  name: string;
  created_at: number;
  deduplication_time: number;
  memory_size: number;
  num_acknowledged: number;
  num_deduplicated: number;
  num_deduplicating: number;
  num_requeued: number;
  num_unacknowledged: number;
  persistent: boolean;
  requeue_time: number;
  size: number;
}

type QueueStatResponse = { result: { queue: IQueueStat } };

export class Queue<T = unknown> {
  ip: string;
  name: string;

  constructor(ip: string, name: string) {
    this.ip = ip;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  uri(): string {
    return `${this.ip}/queue/${this.name}`;
  }

  getUrl(route: string) {
    return this.uri() + route;
  }

  async ack(id: string) {
    const res = await haxan(this.getUrl(`/${id}/ack`))
      .method(haxan.HTTPMethod.Post)
      .send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async dequeue(amount = 1) {
    const res = await haxan<{ result: { items: Array<IMessage<T>> } }>(
      this.getUrl("/dequeue"),
    )
      .method(haxan.HTTPMethod.Post)
      .param("amount", amount)
      .send();
    if (res.ok) {
      return res.data.result.items.map((item) => ({
        message: item,
        ack: () => this.ack(item.id),
      }));
    }
    throw new CorinthError(res);
  }

  async enqueue(messages: Array<{ item: T; deduplication: string | null }>) {
    const res = await haxan(this.getUrl("/enqueue"))
      .post({
        messages,
      })
      .send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async stat() {
    const res = await haxan<QueueStatResponse>(this.uri()).send();
    if (res.ok) {
      return res.data.result.queue;
    }
    throw new CorinthError(res);
  }

  async purge() {
    const res = await haxan(this.getUrl("/purge")).delete().send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async delete() {
    const res = await haxan(this.uri()).delete().send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }
}
