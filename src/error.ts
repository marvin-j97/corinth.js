import { IHaxanResponse } from "haxan";

export class CorinthError extends Error {
  res: IHaxanResponse<unknown>;

  constructor(res: IHaxanResponse<unknown>) {
    super();
    this.res = res;
  }
}
