import { get, request, Response } from "./_request"
import * as cache from "./_cache"
import * as config from "../_config"
import * as most from "most"
import * as t from "./types"

type Item = t.Playlist.Item
type ItemsResponse = t.Playlist.Item.List.Response
const MAX_RESULTS_PER_PAGE = 50

const CACHE_DOMAIN = __filename
const CACHE_TTL = config.CACHE_API_PLAYLISTITEMS_SECONDS

export default function playlistItems(playlistId: string, limit = Infinity) {
  if (config.CACHE) {
    return most.fromPromise(cacheHelper(playlistId, limit)).join()
  } else {
    return uncached(playlistId, limit)
  }
}

interface CachedItemList {
  length: number
  data: string
}

async function cacheHelper(
  playlistId: string,
  limit: number = Infinity
): Promise<most.Stream<Item>> {
  const cached = await cache.get<CachedItemList>(CACHE_DOMAIN, playlistId)
  if (cached && cached.length >= limit) {
    const items = JSON.parse(cached.data) as Item[]
    return most.from(items.slice(0, limit)).multicast()
  }
  const stream = uncached(playlistId, limit)
  stream
    .reduce((arr: Item[], item: Item) => [...arr, item], [])
    .then((items: Item[]) => {
      cache.set<CachedItemList>(
        CACHE_DOMAIN,
        playlistId,
        {
          length: items.length < limit ? Infinity : items.length,
          data: JSON.stringify(items)
        },
        CACHE_TTL
      )
    })
  return stream.take(limit)
}

interface Seed {
  res: Response<ItemsResponse>
  i: number
}

export function uncached(playlistId: string, limit = Infinity) {
  const params = {
    playlistId,
    part: "id,snippet,status,contentDetails",
    maxResults: MAX_RESULTS_PER_PAGE
  }

  const maxPages = Math.ceil(limit / MAX_RESULTS_PER_PAGE)

  const stream = most
    .unfold<any, ItemsResponse, Seed>(
      // FIXME: Typings here have to be fixed in mostjs
      // @ts-ignore
      async (seed: Seed) => {
        if (seed.i >= limit) return { done: true }
        if (seed.res && seed.res.data && !seed.res.data.nextPageToken)
          return { done: true }
        const res = await (seed.i === 0
          ? get<ItemsResponse>("/playlistItems", params)
          : request<ItemsResponse>({
              ...seed.res.config,
              params: {
                ...seed.res.config.params,
                pageToken: seed.res.data.nextPageToken
              }
            }))
        const newSeed: Seed = { res, i: seed.i + 1 }
        return { value: res.data, seed: newSeed }
      },
      { i: 0 }
    )
    .concatMap((res: ItemsResponse) => most.from(res.items))
    .multicast()
  return stream
}
