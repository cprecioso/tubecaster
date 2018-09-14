import { Express } from "express"

const addCompiledPugEngine = (app: Express) =>
  app.engine(
    "pug.js",
    (
      filePath: string,
      options: unknown,
      callback: (err: any, out?: string) => void
    ) => {
      try {
        const template = require(filePath)
        const out = template(options)
        callback(null, out)
      } catch (err) {
        callback(err)
      }
    }
  )

export default addCompiledPugEngine
