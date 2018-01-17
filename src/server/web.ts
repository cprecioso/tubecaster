import * as express from "express"
import podcastApp from "./podcast"
import * as routes from "./_routes"
import * as url from "url"
import { middleware as apicache } from "apicache"
import playlist from "../youtube/playlist"
import { chooseBiggestThumbnail } from "../feed/_util"

const app = express()

app.set("views", routes.viewsDir)
app.set("view engine", "pug")
app.enable("trust proxy")

app.get(
  "/",
  apicache("24 hours", process.env.CACHE === "no" ? () => false : undefined),
  (req, res) => {
    res.render("index", {
      formAction: url.resolve(req.baseUrl || "/", routes.formAction())
    })
  }
)

app.get("/" + routes.formAction(), (req, res) => {
  if (!req.query.playlist) return res.redirect(req.baseUrl || "/")

  let id = req.query.playlist
  try {
    const passedUrl = url.parse(id, true)
    id = passedUrl.query.list || id
  } catch (_) { }

  res.redirect("/" + routes.playlistInfo(id))
})

app.get(
  "/" + routes.playlistInfo(),
  apicache("24 hours", process.env.CACHE === "no" ? () => false : undefined),
  async (req, res) => {
    const id = req.params.playlistId

    const podcastUrl = url.resolve(
      url.format({
        protocol: req.protocol,
        host: req.hostname,
        pathname: req.baseUrl || "/"
      }),
      routes.playlistPodcast(id)
    )

    const info = await playlist(id, {
      key: process.env.YOUTUBE_API_KEY as string
    })
    const thumbnail = chooseBiggestThumbnail(info.snippet!.thumbnails).url

    res.render("playlist", {
      podcast: { url: podcastUrl },
      playlist: {
        thumbnail,
        name: info.snippet!.title,
        link: `https://www.youtube.com/playlist?list=${id}`,
        channel: {
          name: info.snippet!.channelTitle,
          link: `https://www.youtube.com/channel/${info.snippet!.channelId}`
        }
      }
    })
  }
)

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
