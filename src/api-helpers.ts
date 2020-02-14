import getMiddleware from "micro-get"
import { ApiResponse, ERROR_TYPE_SIG, MicroHandler } from "./api-types"

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
