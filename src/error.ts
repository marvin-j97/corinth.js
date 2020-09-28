import { IHaxanResponse } from "haxan";

export class CorinthError extends Error {
  isCorinthError = true;
  res: IHaxanResponse<unknown>;

  constructor(res: IHaxanResponse<unknown>) {
    super();
    this.res = res;
  }
}
