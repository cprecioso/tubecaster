import { resolve } from "path"

export const parseUrlFormAction = () => `parse`
export const parseChannelFormAction = () => `parse-channel`

export const channelPlaylistSelection = (channelId = ":channelId") =>
  `channel/${channelId}`

export const playlistInfo = (playlistId = ":playlistId") =>
  `playlist/${playlistId}`

export const playlistPodcast = (playlistId = ":playlistId") =>
  `playlist/${playlistId}/podcast`

export const legacyVideoPlay = (videoId = ":videoId") => `video/${videoId}/play`
export const videoPlay = (videoId = ":videoId") => `video/${videoId}/play.mp4`

export const viewsDir = resolve(__dirname, "../../views")
export const publicDir = resolve(__dirname, "../../public")
