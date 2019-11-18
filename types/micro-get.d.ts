declare module "micro-get" {
  import { IncomingMessage, ServerResponse } from "http"

  type MicroHandler<I extends IncomingMessage, R extends ServerResponse> = (
    req: I,
    res: R
  ) => Promise<void>

  function get<I extends IncomingMessage, R extends ServerResponse>(
    handler: MicroHandler<I, R>
  ): MicroHandler<I, R>

  export = get
}
