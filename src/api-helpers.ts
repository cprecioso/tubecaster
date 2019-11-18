import getMiddleware from "micro-get"
import { NextApiRequest, NextApiResponse } from "next"

export const ERROR_TYPE_SIG = -1
export type ApiErrorResponse = { type: typeof ERROR_TYPE_SIG; error: string }
export type ApiResponse =
  | { type: Exclude<number | string, typeof ERROR_TYPE_SIG> }
  | ApiErrorResponse

type MicroHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export const get = <Req extends {}, Res extends ApiResponse>(
  handler: (req: Req) => Promise<Res>
): MicroHandler =>
  getMiddleware(async (req, res) => {
    try {
      const responseData = await handler(req.query as any)
      res.status(200).json(responseData)
    } catch (error) {
      const responseData = { type: ERROR_TYPE_SIG, error: "" + error }
      res.status(500).json(responseData)
    }
  })
