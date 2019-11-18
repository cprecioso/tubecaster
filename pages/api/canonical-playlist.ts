import { ApiErrorResponse, get } from "../../src/api-helpers"
import requestCanonicalPlaylists from "../../src/canonical"
import { PlaylistReference } from "../../src/types"

export type Request = {
  url: string
}

export enum ResponseType {
  Found
}

export type FoundResponse = {
  type: ResponseType.Found
  playlistReferences: PlaylistReference[]
}

export type Response = FoundResponse | ApiErrorResponse

export default get<Request, Response>(async ({ url }) => {
  if (!url) throw new Error("URL not found")
  const playlistReferences = await requestCanonicalPlaylists(url)
  return { type: ResponseType.Found, playlistReferences }
})
