import { middleware as apicache } from "apicache"
import * as express from "express"
import * as url from "url"
import { chooseBiggestThumbnail } from "../feed/_util"
import playlist from "../youtube/playlist"
import * as config from "../_config"
import podcastApp from "./podcast"
import addCompiledPugEngine from "./templateEngine"
import * as routes from "./_routes"

const app = express()

addCompiledPugEngine(app)
app.set("views", routes.viewsDir)
app.set("view engine", "pug.js")
app.enable("trust proxy")

app.get(
  "/",
  apicache(
    `${config.CACHE_FRONTEND_HOME_SECONDS} seconds`,
    !config.CACHE ? () => false : undefined
  ),
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
  } catch (_) {}

  res.redirect("/" + routes.playlistInfo(id))
})

app.get(
  "/" + routes.playlistInfo(),
  apicache(
    `${config.CACHE_FRONTEND_PLAYLIST_SECONDS} seconds`,
    !config.CACHE ? () => false : undefined
  ),
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

    const info = await playlist(id)
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
app.use(express.static(routes.publicDir))

app.use((req, res) => {
  res.status(404).render("error", { error: "Can't find that page" })
})

export default app
