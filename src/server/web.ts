import * as express from "express"
import podcastApp from "./podcast"
import * as routes from "./_routes"
import * as url from "url"
import { middleware as apicache } from "apicache"

const app = express()

app.set("views", routes.viewsDir)
app.set("view engine", "pug")

app.get(
  "/",
  apicache("24 hours", process.env.CACHE === "no" ? () => false : undefined),
  (req, res) => {
    res.render("index", {
      formAction: url.resolve(req.baseUrl || "/", routes.formAction())
    })
  }
)

app.get("/" + routes.formAction(), async (req, res) => {
  if (!req.query.playlist) return res.redirect(req.baseUrl || "/")

  let id = req.query.playlist
  try {
    const passedUrl = url.parse(id, true)
    id = passedUrl.query.list || id
  } catch (_) {}

  const podcastUrl = url.resolve(
    url.format({
      protocol: req.protocol,
      host: req.hostname,
      pathname: req.baseUrl || "/"
    }),
    routes.playlistPodcast(id)
  )

  res.render("playlist", { podcastUrl })
})

app.use(podcastApp)
app.use(
  require("stylus").middleware({
    src: routes.publicDir,
    compress: true
  })
)
app.use(express.static(routes.publicDir))

app.use((req, res) => {
  res.status(404).render("error", { error: "Can't find that page" })
})

export default app
