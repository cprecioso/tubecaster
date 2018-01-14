require("dotenv").config()
if (Symbol["asyncIterator"] === undefined)
  (<any>Symbol)["asyncIterator"] = Symbol.for("asyncIterator");

import app from "./server"

const PORT = 8080

app.listen(PORT, (err: any) => {
  if (err) throw err
  console.log(`Listening on port ${PORT}`)
  console.log(`http://127.0.0.1:${PORT}/`)
})
