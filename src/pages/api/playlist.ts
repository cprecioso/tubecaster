import { get } from "../../api-helpers"
import { Playlist } from "../../api-types"
import requestPlaylistData from "../../playlist"

export default get<Playlist.Request, Playlist.Response>(async ({ id }) => {
  if (!id) throw new Error("ID not found")
  const playlistData = await requestPlaylistData(id)
  return { type: Playlist.ResponseType.Found, playlistData }
})
