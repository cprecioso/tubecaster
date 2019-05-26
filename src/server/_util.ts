import { Express, Request, RequestHandler } from "express"
import { URL } from "url"

export function getBaseUrl(req: Request) {
  return new URL(
    `${req.protocol}://${req.headers.host || req.hostname}${req.baseUrl || "/"}`
  ).toString()
}

export function resolveUrl(req: Request, url: string) {
  return new URL(url, getBaseUrl(req)).toString()
}

export const addCompiledPugEngine = (app: Express) =>
  app.engine("pug.js", (filePath, options, callback) => {
    try {
      const template = require(filePath)
      const out = template(options)
      callback(null, out)
    } catch (err) {
      // @ts-ignore
      callback(err)
    }
  })

export const asyncMiddleware = (fn: RequestHandler): RequestHandler => (
  req,
  res,
  next
) => Promise.resolve(fn(req, res, next)).catch(next)
