import { HaxanFactory, IHaxanResponse } from "haxan";

export function sendRequest<T>(
  request: HaxanFactory<T>,
): Promise<IHaxanResponse<T>> {
  return request.send();
}
