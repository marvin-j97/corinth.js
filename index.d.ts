import { IHaxanResponse } from 'haxan';

interface IResult<T> {
    status: number;
    message?: string;
    result?: T;
    error?: boolean;
}
declare enum MessageState {
    Pending = 0,
    Requeued = 1
}
interface IMessage<T> {
    id: string;
    item: T;
    num_requeues: number;
    queued_at: number;
    state: MessageState;
    updated_at: number;
}

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
interface IQueueStat {
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
    dead_letter: {
        name: string;
        threshold: number;
    } | null;
    max_length: number;
}
interface IEnqueueResult<T> {
    num_enqueued: number;
    num_deduplicated: number;
    items: Array<IMessage<T>>;
}
interface IDequeueResult<T> {
    message: IMessage<T>;
    ack: () => Promise<boolean>;
}
interface IEnqueueItem<T> {
    item: T;
    deduplication: string | null;
}
interface IQueuePatchOptions {
    requeue_time: number;
    deduplication_time: number;
    max_length: number;
}
declare class Queue<T = unknown> {
    protected $root: Corinth;
    protected name: string;
    constructor(root: Corinth, name: string);
    getName(): string;
    uri(): string;
    getUrl(route: string): string;
    ack(id: string): Promise<true>;
    peek(): Promise<IMessage<T> | null>;
    dequeue({ ack, amount, }?: Partial<IQueueDequeueOptions>): Promise<Array<IDequeueResult<T>>>;
    enqueueOne(item: T, deduplication?: string | null): Promise<IEnqueueResult<T>>;
    enqueue(messages: Array<IEnqueueItem<T>>): Promise<IEnqueueResult<T>>;
    stat(): Promise<IQueueStat>;
    size(): Promise<number>;
    purge(): Promise<true>;
    edit(opts: Partial<IQueuePatchOptions>): Promise<true>;
    update(opts: Partial<IQueuePatchOptions>): Promise<true>;
    exists(): Promise<boolean>;
    delete(): Promise<true>;
    create(opts?: Partial<IQueueCreateOptions>): Promise<true>;
    ensure(opts?: Partial<IQueueCreateOptions>): Promise<true>;
}

interface ICorinthStats {
    name: "Corinth";
    version: string;
    uptime_ms: number;
    uptime_secs: number;
    started_at: number;
}
declare class Corinth {
    private ip;
    constructor(ip: string);
    getIp(): string;
    version(): Promise<string>;
    stat(): Promise<ICorinthStats>;
    listQueues(): Promise<IQueueStat[]>;
    queueExists(name: string): Promise<boolean>;
    defineQueue<T>(name: string): Queue;
}

declare class CorinthError extends Error {
    isCorinthError: boolean;
    res: IHaxanResponse<unknown>;
    constructor(res: IHaxanResponse<unknown>);
}

export { Corinth, CorinthError, IDequeueResult, IEnqueueItem, IEnqueueResult, IMessage, IQueuePatchOptions, IQueueStat, IResult, MessageState, Queue };
