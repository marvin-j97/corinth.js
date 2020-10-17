export interface IResult<T> {
  status: number;
  message?: string;
  result?: T;
  error?: boolean;
}

export enum MessageState {
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
