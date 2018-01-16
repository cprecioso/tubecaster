import * as express from "express";
import podcastApp from "./podcast";
import * as routes from "./_routes";
import * as url from "url";

const app = express();

app.set("views", routes.viewsDir);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    formAction: url.resolve(req.baseUrl || "/", routes.formAction())
  });
});

app.get("/" + routes.formAction(), async (req, res) => {
  if (!req.query.playlist) return res.redirect(req.baseUrl || "/");

  let id = req.query.playlist;
  try {
    const passedUrl = url.parse(id, true);
    id = passedUrl.query.list;
  } catch (_) {}

  const podcastCopyUrl = url.resolve(
    url.format({
      protocol: req.protocol,
      host: req.hostname,
      pathname: req.baseUrl || "/"
    }),
    routes.playlistPodcast(id)
  );

  const podcastClickUrl = url.format({
    ...url.parse(podcastCopyUrl),
    protocol: "itpc",
    href: undefined
  });

  res.render("playlist", { podcastCopyUrl, podcastClickUrl });
});

app.use(podcastApp);
app.use(require("stylus").middleware({
  src: routes.publicDir,
  compress: true
}));
app.use(express.static(routes.publicDir));

app.use((req, res) => {
  res.status(404).render("error", { error: "Can't find that page" });
});

export default app;
