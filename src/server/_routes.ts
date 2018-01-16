import { resolve } from "path"

export const formAction = () => `get-playlist`

export const playlistPodcast = (playlistId = ":playlistId") =>
  `playlist/${playlistId}/podcast`

export const videoPlay = (videoId = ":videoId") => `video/${videoId}/play`

export const viewsDir = resolve(__dirname, "../../views")
export const publicDir = resolve(__dirname, "../../public")
