declare module "apicache" {
  import { Request, Response, RequestHandler } from "express"

  namespace apicache {
    interface Options {
      debug: boolean
      defaultDuration: string
      enabled: boolean
      redisClient: any
      appendKey: (req: Request, res: Response) => string
      headerBlacklist?: string[]
      statusCodes?: {
        exclude?: number[]
        include?: number[]
      }
      headers?: {
        [header: string]: string
      }
    }

    interface Middleware extends RequestHandler {
      options(): Options
      options(localOptions: Partial<Options>): void
    }

    interface Instance {
      options(): Options
      options(globalOptions: Partial<Options>): this

      middleware(
        duration?: string,
        toggleMiddleware?: (req: Request, res: Response) => boolean,
        localOptions?: Partial<Options>
      ): Middleware

      getIndex(): string[]

      clear(target?: string): string

      newInstance(options?: Partial<Options>): Instance

      clone(): Instance
    }
  }

  const apicache: apicache.Instance
  export = apicache
}
