import { get } from "../../src/api-helpers"
import requestPlaylistData from "../../src/playlist"
import { PlaylistData } from "../../src/types"

export type Request = {
  id: string
}

export enum ResponseType {
  Found
}

export type Response = {
  type: ResponseType.Found
  playlistData: PlaylistData
}

export default get<Request, Response>(async ({ id }) => {
  if (!id) throw new Error("ID not found")
  const playlistData = await requestPlaylistData(id)
  return { type: ResponseType.Found, playlistData }
})
