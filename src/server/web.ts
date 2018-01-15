import * as express from "express";
import podcastApp from "./podcast";

const app = express();

app.use(podcastApp);
app.use(express.static(routes.publicDir));

export default app;
