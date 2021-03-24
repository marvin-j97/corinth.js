import { Corinth } from "./corinth";
import haxan from "haxan";

import { CorinthError } from "./error";
import { IMessage, IResult } from "./types";

interface IQueueDequeueOptions {
  ack: boolean;
  amount: number;
}

interface IQueueCreateOptions {
  requeue_time: number;
  deduplication_time: number;
  persistent: boolean;
  max_length: number;
  dead_letter_queue: Queue;
  dead_letter_queue_threshold: number;
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
  dead_letter: { name: string; threshold: number } | null;
  max_length: number;
}

export interface IEnqueueResult<T> {
  num_enqueued: number;
  num_deduplicated: number;
  items: Array<IMessage<T>>;
}

export interface IDequeueResult<T> {
  message: IMessage<T>;
  ack: () => Promise<boolean>;
}

export interface IEnqueueItem<T> {
  item: T;
  deduplication: string | null;
}

export interface IQueuePatchOptions {
  requeue_time: number;
  deduplication_time: number;
  max_length: number;
}

export class Queue<T = unknown> {
  protected $root: Corinth;
  protected name: string;

  constructor(root: Corinth, name: string) {
    this.$root = root;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  uri(): string {
    return `${this.$root.getIp()}/queue/${this.name}`;
  }

  getUrl(route: string): string {
    return this.uri() + route;
  }

  async ack(id: string): Promise<true> {
    const res = await haxan(this.getUrl(`/${id}/ack`))
      .method(haxan.HTTPMethod.Post)
      .send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async peek(): Promise<IMessage<T> | null> {
    const res = await haxan<IResult<{ item: IMessage<T> | null | undefined }>>(
      this.getUrl("/peek"),
    ).send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!.item || null;
    }
    throw new CorinthError(res);
  }

  async dequeue({
    ack = false,
    amount = 1,
  }: Partial<IQueueDequeueOptions> = {}): Promise<Array<IDequeueResult<T>>> {
    const request = haxan<IResult<{ items: Array<IMessage<T>> }>>(
      this.getUrl("/dequeue"),
    )
      .method(haxan.HTTPMethod.Post)
      .param("amount", amount);

    if (ack) {
      request.param("ack", "true");
    }

    const res = await request.send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!.items.map((item) => ({
        message: item,
        ack: async () => {
          if (ack) {
            return true;
          } else {
            return this.ack(item.id);
          }
        },
      }));
    }
    throw new CorinthError(res);
  }

  async enqueueOne(
    item: T,
    deduplication: string | null = null,
  ): Promise<IEnqueueResult<T>> {
    return this.enqueue([{ item, deduplication }]);
  }

  async enqueue(messages: Array<IEnqueueItem<T>>): Promise<IEnqueueResult<T>> {
    const res = await haxan<IResult<IEnqueueResult<T>>>(this.getUrl("/enqueue"))
      .post({
        messages,
      })
      .send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!;
    }
    throw new CorinthError(res);
  }

  async stat(): Promise<IQueueStat> {
    const res = await haxan<IResult<{ queue: IQueueStat }>>(this.uri()).send();
    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return res.data.result!.queue;
    }
    throw new CorinthError(res);
  }

  async purge(): Promise<true> {
    const res = await haxan(this.getUrl("/purge")).delete().send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async edit(opts: Partial<IQueuePatchOptions>): Promise<true> {
    return this.update(opts);
  }

  async update(opts: Partial<IQueuePatchOptions>): Promise<true> {
    const res = await haxan(this.uri()).patch(opts).send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async exists(): Promise<boolean> {
    try {
      await this.stat();
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

  async delete(): Promise<true> {
    const res = await haxan(this.uri()).delete().send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async create(opts?: Partial<IQueueCreateOptions>): Promise<true> {
    const request = haxan(this.uri()).method(haxan.HTTPMethod.Put);

    if (opts?.dead_letter_queue !== undefined) {
      request.param("dead_letter_queue_name", opts.dead_letter_queue.getName());
    }

    if (opts?.dead_letter_queue_threshold !== undefined) {
      request.param(
        "dead_letter_queue_threshold",
        String(opts.dead_letter_queue_threshold),
      );
    }

    if (opts?.deduplication_time !== undefined) {
      request.param("deduplication_time", String(opts.deduplication_time));
    }

    if (opts?.max_length !== undefined) {
      request.param("max_length", String(opts.max_length));
    }

    if (opts?.persistent !== undefined) {
      request.param("persistent", String(opts.persistent));
    }

    if (opts?.requeue_time !== undefined) {
      request.param("requeue_time", String(opts.requeue_time));
    }

    const res = await request.send();
    if (res.ok) {
      return true;
    }
    throw new CorinthError(res);
  }

  async ensure(opts?: Partial<IQueueCreateOptions>): Promise<true> {
    try {
      return this.create(opts);
    } catch (error) {
      if (error.isCorinthError) {
        if (error.res.status === 409) {
          return true;
        }
      }
      throw error;
    }
  }
}
