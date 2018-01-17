import * as express from "express"
import { middleware as apicache } from "apicache"
import * as routes from "./_routes"
import * as url from "url"
import * as ytdl from "ytdl-core"
import createFeed from "../feed"
import playlist from "../youtube/playlist"
import playlistItems, { PlaylistItems } from "../youtube/playlistItems"

const app = express()

app.get(
  "/" + routes.playlistPodcast(),
  apicache(
    `${60 + 59} min`,
    process.env.CACHE === "no" ? () => false : undefined
  ),
  async (req, res) => {
    const baseUrl = url.format({
      protocol: req.protocol,
      host: req.hostname,
      pathname: req.baseUrl || "/"
    })
    const completeUrl = url.resolve(
      baseUrl,
      routes.playlistPodcast(req.params.playlistId)
    )
    const playlistInfo = await playlist(req.params.playlistId, {
      key: process.env.YOUTUBE_API_KEY as string
    })
    const items = playlistItems(req.params.playlistId, {
      key: process.env.YOUTUBE_API_KEY as string,
      parts: [
        PlaylistItems.Options.Part.Snippet,
        PlaylistItems.Options.Part.Status
      ]
    })

    const feed = await createFeed(
      completeUrl,
      (playlistId, itemId) => ({
        url: url.resolve(baseUrl, routes.videoPlay(itemId)),
        type: "video/mp4"
      }),
      playlistInfo,
      items
    )

    res.contentType("text/xml")
    res.send(feed)
  }
)

app.get("/" + routes.videoPlay(), async (req, res) => {
  const info = await ytdl.getInfo(req.params.videoId)
  const chosenFormat = ytdl.chooseFormat(info.formats, {
    quality: "highest",
    filter: format => format.container === "mp4" && format.audioEncoding != null
  }) as ytdl.videoFormat
  res.redirect(chosenFormat.url)
})

export default app
