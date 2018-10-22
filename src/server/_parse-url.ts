import axios from "axios"
import { load as cheerio } from "cheerio"
import * as pMemoize from "p-memoize"
import pThrottle from "p-throttle"
import { URL } from "url"

export const enum ListType {
  Playlist = "playlist",
  Channel = "channel"
}

export interface ListReference {
  type: ListType
  id: string
}

export const getCanonicalURL = pMemoize(
  pThrottle(
    async (url: string): Promise<string> => {
      const { data } = await axios(url, { responseType: "text" })
      const $ = cheerio(data)
      return $("link[rel='canonical']").attr("href")
    },
    60,
    60 * 1000
  )
)

export const isYouTubeURL = (url: string): boolean => {
  const { host } = new URL(url, "https://www.youtube.com/")
  return host === "youtube.com" || host === "www.youtube.com"
}

const parseCurrentURL = (url: string): ListReference | false => {
  const obj = new URL(url, "https://www.youtube.com/")
  const [, urlType, urlId] = obj.pathname.split("/")
  switch (urlType) {
    case "channel": {
      if (!urlId) return false
      return { type: ListType.Channel, id: urlId }
    }
    case "watch":
    case "playlist": {
      const list = obj.searchParams.get("list")
      if (!list) return false
      return { type: ListType.Playlist, id: list }
    }
    default: {
      return false
    }
  }
}

export default async function parseURL(url: string): Promise<ListReference> {
  if (!isYouTubeURL(url)) throw new Error("URL is not from YouTube")

  let parsed = parseCurrentURL(url)
  if (parsed) return parsed

  const canonicalUrl = await getCanonicalURL(url)
  parsed = parseCurrentURL(canonicalUrl)
  if (parsed) return parsed

  throw new Error("Unable to parse URL")
}
