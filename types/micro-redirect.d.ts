declare module "micro-redirect" {
  import { ServerResponse } from "http";

  function redirect<R extends ServerResponse>(
    res: R,
    statusCode: number,
    location: string,
  ): void;

  export = redirect;
}
