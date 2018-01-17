import { PORT } from "./_config"
import { web } from "./index"

web.listen(PORT, (err: any) => {
  if (err) throw err
  console.log(`Listening on port ${PORT}`)
  console.log(`http://127.0.0.1:${PORT}/`)
})
