import "dotenv/config"
import { web } from "./index"
import { PORT } from "./_config"

web.listen(PORT, (err: any) => {
  if (err) throw err
  console.log(`Listening on port ${PORT}`)
  console.log(`http://127.0.0.1:${PORT}/`)
})
