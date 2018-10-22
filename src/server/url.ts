import { Request } from "express"
import { URL } from "url"

export function getBaseUrl(req: Request) {
  return new URL(
    `${req.protocol}://${req.headers.host || req.hostname}${req.baseUrl || "/"}`
  ).toString()
}

export function resolveUrl(req: Request, url: string) {
  return new URL(url, getBaseUrl(req)).toString()
}
