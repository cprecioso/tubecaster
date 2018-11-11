import { middleware as apicache } from "apicache"
import express from "express"
import playlist from "../youtube/playlist"
import findPlaylistID, { ListType } from "../youtube/playlist-id"
import * as config from "../_config"
import podcastApp from "./podcast"
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
      formAction: resolveUrl(req, routes.parseUrlFormAction())
    })
  }
)

app.post(
  "/" + routes.parseUrlFormAction(),
  express.urlencoded({ extended: false }),
  asyncMiddleware(async (req, res) => {
    if (!req.body.yturl) return res.redirect(req.baseUrl || "/")

    const url = req.body.yturl
    const { type, id } = await findPlaylistID(url)
    switch (type) {
      case ListType.Channel: {
        return res.redirect("/" + routes.channelPlaylistSelection(id))
      }
      case ListType.Playlist: {
        return res.redirect("/" + routes.playlistInfo(id))
      }
    }
  })
)

app.get(
  "/" + routes.channelPlaylistSelection(),
  asyncMiddleware(async (req, res) => {
    const id = req.params.channelId
    res.render("channel", {
      channel: { id },
      formAction: resolveUrl(req, routes.parseChannelFormAction())
    })
  })
)

app.post(
  "/" + routes.parseChannelFormAction(),
  express.urlencoded({ extended: false }),
  asyncMiddleware(async (req, res) => {
    const { channelId, listType } = req.body as { [key: string]: string }
    if (!channelId || !listType) return res.redirect(req.baseUrl || "/")

    const playlistId = channelId.replace(/^UC/, listType)
    return res.redirect("/" + routes.playlistInfo(playlistId))
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

    res.render("playlist", {
      podcast: { url: podcastUrl },
      playlist: {
        thumbnail: info.thumbnail,
        name: info.title,
        link: `https://www.youtube.com/playlist?list=${id}`,
        channel: {
          name: info.channelTitle,
          link: `https://www.youtube.com/channel/${info.channelId}`
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

app.use(((err, req, res, next) => {
  res.status(500)
  res.render("error", { error: "" + err })
}) as express.ErrorRequestHandler)

export default app
