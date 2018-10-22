import { middleware as apicache } from "apicache"
import * as express from "express"
import { chooseBiggestThumbnail } from "../feed/_util"
import playlist from "../youtube/playlist"
import * as config from "../_config"
import podcastApp from "./podcast"
import parseYTURL, { ListType } from "./_parse-url"
import * as routes from "./_routes"
import { addCompiledPugEngine, asyncMiddleware, resolveUrl } from "./_util"

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
      formAction: resolveUrl(req, routes.formAction())
    })
  }
)

app.get(
  "/" + routes.formAction(),
  asyncMiddleware(async (req, res) => {
    if (!req.query.yturl) return res.redirect(req.baseUrl || "/")

    const url = req.query.yturl
    const { type, id } = await parseYTURL(url)
    switch (type) {
      case ListType.Channel: {
        throw new Error("Only playlists are supported for now")
      }
      case ListType.Playlist: {
        return res.redirect("/" + routes.playlistInfo(id))
      }
    }
  })
)


app.get(
  "/" + routes.playlistInfo(),
  apicache(
    `${config.CACHE_FRONTEND_PLAYLIST_SECONDS} seconds`,
    !config.CACHE ? () => false : undefined
  ),
  asyncMiddleware(async (req, res) => {
    const id = req.params.playlistId
    const podcastUrl = resolveUrl(req, routes.playlistPodcast(id))
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
  })
)

app.use(podcastApp)
app.use(express.static(routes.publicDir))

app.use((req, res) => {
  res.status(404).render("error", { error: "Can't find that page" })
})

export default app
