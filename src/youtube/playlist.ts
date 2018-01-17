import { joinWithCommas } from "./_util"
import * as cache from "./_cache"
import * as Types from "./types"
import request from "./_request"

const PLAYLIST_URL = "https://www.googleapis.com/youtube/v3/playlists"

const CACHE_DOMAIN = __filename
const CACHE_TTL = (3 * 60 + 59) * 60

export async function uncached(playlistId: string, options: Playlist.Options) {
  const params: Types.Playlist.List.Request.Params = {
    key: options.key,
    id: playlistId,
    maxResults: 1,
    part: joinWithCommas(options.parts, Playlist.Options.Part.Snippet)
  }

  const response = await request(PLAYLIST_URL, params)

  const data = response.data as Types.Playlist.List.Response
  return data.items[0]
}

const cached: typeof uncached = async (playlistId, options) => {
  return cache.attempt(
    CACHE_DOMAIN,
    playlistId,
    () => uncached(playlistId, options),
    CACHE_TTL
  )
}
export default cached

export namespace Playlist {
  export namespace Options {
    export enum Part {
      Id = "id",
      Snippet = "snippet"
    }
  }

  export interface Options {
    key: string
    parts?: Options.Part | Options.Part[]
  }
}
