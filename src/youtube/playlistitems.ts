import { CACHE_API_PLAYLISTITEMS } from "../_config"
import { joinWithCommas } from "./_util"
import { unpaginatedRequest } from "./_request"
import * as cache from "./_cache"
import * as Types from "./types"

const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems"

const CACHE_DOMAIN = __filename
const CACHE_TTL = CACHE_API_PLAYLISTITEMS

export async function* uncached(
  playlistId: string,
  options: PlaylistItems.Options
) {
  const params: Types.Playlist.Item.List.Request.Params = {
    key: options.key,
    part: joinWithCommas(options.parts, PlaylistItems.Options.Part.Snippet),
    playlistId
  }

  const { items } = await unpaginatedRequest<Types.Playlist.Item>(
    PLAYLIST_ITEMS_URL,
    params,
    options.limit
  )
  yield* items
}

export const cached: typeof uncached = async function*(playlistId, options) {
  const cachedItems = await cache.get<Types.Playlist.Item[]>(
    CACHE_DOMAIN,
    playlistId
  )
  if (cachedItems) {
    yield* cachedItems
    return
  }

  const fresh = uncached(playlistId, options)
  const buffer: Types.Playlist.Item[] = []
  for await (const item of fresh) {
    buffer.push(item)
    yield item
  }
  await cache.set(CACHE_DOMAIN, playlistId, buffer, CACHE_TTL)
}
export default cached

export namespace PlaylistItems {
  export namespace Options {
    export enum Part {
      Id = "id",
      Snippet = "snippet",
      ContentDetails = "contentDetails",
      Status = "status"
    }
  }

  export interface Options {
    key: string
    parts?: Options.Part | Options.Part[]
    limit?: number
  }
}
