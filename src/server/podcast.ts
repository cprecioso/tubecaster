import * as express from "express";
import * as ytdl from "ytdl-core";
import createFeed from "../feed";
import { playlist, playlistItems } from "../youtube";
import * as routes from "./routes";
import * as url from "url";

const app = express();

app.get("/" + routes.playlistPodcast(), async (req, res) => {
  const baseUrl = url.format({
    protocol: req.protocol,
    host: req.hostname,
    pathname: req.baseUrl || "/"
  });
  const completeUrl = url.resolve(
    baseUrl,
    routes.playlistPodcast(req.params.playlistId)
  );
  const playlistInfo = await playlist(req.params.playlistId, {
    key: process.env.YOUTUBE_API_KEY as string
  });
  const items = playlistItems(req.params.playlistId, {
    key: process.env.YOUTUBE_API_KEY as string,
    batch: 50,
    parts: [
      playlistItems.Options.Part.Snippet,
      playlistItems.Options.Part.Status
    ]
  });

  const feed = await createFeed(
    completeUrl,
    (playlistId, itemId) => ({
      url: url.resolve(baseUrl, routes.videoPlay(itemId)),
      type: "video/mp4"
    }),
    playlistInfo,
    items
  );

  res.contentType("text/xml");
  res.send(feed);
});

app.get("/" + routes.videoPlay(), async (req, res) => {
  // @ts-ignore
  const info = await ytdl.getInfo(req.params.videoId, {
    filter: "audioandvideo"
  });
  const chosenFormat = ytdl.chooseFormat(info.formats, {
    quality: "highest",
    filter: format => format.container === "mp4" && format.audioEncoding != null
  }) as ytdl.videoFormat;
  res.redirect(chosenFormat.url);
});

export default app;
