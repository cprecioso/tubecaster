import * as express from "express";
import { resolve } from "path";
import createFeed from "../feed";
import { playlist, playlistItems } from "../youtube";
import { URL } from "url";

const app = express();

app.get("/playlist", (req, res, next) => {
  if (req.query.playlistId) {
    res.redirect(`/playlist/${req.query.playlistId}/podcast.xml`);
  } else next();
});

app.get("/playlist/:playlistId/podcast.xml", async (req, res) => {
  const baseUrl = `${req.protocol}://${req.hostname}`;
  const completeURL = new URL(
    `/playlist/${req.params.playlistId}/podcast.xml`,
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
      url: new URL(`/playlist/${playlistId}/item/${itemId}/play.mp4`, baseUrl)
        .href
    }),
    playlistInfo,
    items
  );

  res.contentType("text/xml");
  res.send(feed);
});

app.use(express.static(resolve(__dirname, "..", "public")));

app.get("*", (req, res) => {
  res.redirect(req.baseUrl);
});

export default app;
