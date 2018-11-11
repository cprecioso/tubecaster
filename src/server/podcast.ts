import { middleware as apicache } from "apicache"
import express from "express"
import * as ytdl from "ytdl-core"
import createFeed from "../feed"
import playlist from "../youtube/playlist"
import playlistItems from "../youtube/playlistitems"
import * as config from "../_config"
import * as routes from "./_routes"
import { asyncMiddleware, resolveUrl } from "./_util"

const app = express()

app.get(
  "/" + routes.playlistPodcast(),
  apicache(
    `${config.CACHE_PODCAST_SECONDS} seconds`,
    !config.CACHE ? () => false : undefined
  ),
  asyncMiddleware(async (req, res) => {
    const completeUrl = resolveUrl(
      req,
      routes.playlistPodcast(req.params.playlistId)
    )
    const playlistInfo = await playlist(req.params.playlistId)
    const items = await playlistItems(req.params.playlistId)

    const feed = await createFeed(
      completeUrl,
      videoId => ({
        url: resolveUrl(req, routes.videoPlay(videoId)),
        type: "video/mp4"
      }),
      playlistInfo,
      items
    )

    res.contentType("text/xml")
    res.send(feed)
  })
)

app.get(
  ["/" + routes.legacyVideoPlay(), "/" + routes.videoPlay()],
  asyncMiddleware(async (req, res) => {
    const info = await ytdl.getInfo(req.params.videoId)
    const chosenFormat = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: format =>
        format.container === "mp4" && format.audioEncoding != null
    }) as ytdl.videoFormat
    res.redirect(chosenFormat.url)
  })
)

export default app
