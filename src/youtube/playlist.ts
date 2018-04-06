import * as config from "../_config"
import * as cache from "./_cache"
import { get } from "./_request"
import * as t from "./types"

const CACHE_DOMAIN = __filename
const CACHE_TTL = config.CACHE_API_PLAYLIST_SECONDS

export default function playlist(id: string): Promise<t.Playlist> {
  if (config.CACHE) {
    return cacheHelper(id)
  } else {
    return uncached(id)
  }
}

async function cacheHelper(id: string): Promise<t.Playlist> {
  const cached = await cache.get<string>(CACHE_DOMAIN, id)
  if (cached) {
    return JSON.parse(cached)
  } else {
    const playlist = uncached(id)
    playlist.then(playlist =>
      cache.set<string>(CACHE_DOMAIN, id, JSON.stringify(playlist), CACHE_TTL)
    )
    return playlist
  }
}

export async function uncached(id: string) {
  const playlistResponse = await get<t.Playlist.List.Response>("/playlists", {
    id,
    maxResults: 1,
    part: "id,snippet,status,contentDetails"
  })
  const playlistInfo = playlistResponse.data.items[0]
  if (!playlistInfo) throw new Error("Playlist does not exist")
  return playlistInfo
}
