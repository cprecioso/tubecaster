import { resolve } from "path";

export const playlistPodcast = (playlistId = ":playlistId") =>
  `playlist/${playlistId}/podcast`;

export const videoPlay = (videoId = ":videoId") => `video/${videoId}/play`;

export const publicDir = resolve(__dirname, "../../public");
