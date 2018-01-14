import * as express from "express";
import * as ytdl from "ytdl-core";
import { resolve } from "path";
import { URL } from "url";
import createFeed from "../feed";
import { playlist, playlistItems } from "../youtube";

const app = express();

app.get("/playlist", (req, res, next) => {
  if (req.query.playlistId) {
    res.redirect(`/playlist/${req.query.playlistId}/podcast`);
  } else next();
});

app.get("/playlist/:playlistId/podcast", async (req, res) => {
  const baseUrl = `${req.protocol}://${req.hostname}`;
  const completeURL = new URL(
    `/playlist/${req.params.playlistId}/podcast`,
    baseUrl
  ).href;
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
    completeURL,
    (playlistId, itemId) => ({
      url: new URL(`/video/${itemId}/play`, baseUrl).href,
      type: "video/mp4"
    }),
    playlistInfo,
    items
  );

  res.contentType("text/xml");
  res.send(feed);
});

app.get("/video/:videoId/play", async (req, res) => {
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

app.use(express.static(resolve(__dirname, "..", "public")));

app.get("*", (req, res) => {
  res.redirect(req.baseUrl);
});

export default app;
