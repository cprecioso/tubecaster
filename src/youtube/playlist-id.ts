import { URL } from "url"
import { getCanonicalURL, isYouTubeURL } from "./_util"

export const enum ListType {
  Playlist = "playlist",
  Channel = "channel"
}

export interface ListReference {
  type: ListType
  id: string
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

export default async function findPlaylistID(
  url: string
): Promise<ListReference> {
  if (!isYouTubeURL(url)) throw new Error("URL is not from YouTube")

  let parsed = parseCurrentURL(url)
  if (parsed) return parsed

  const canonicalUrl = await getCanonicalURL(url)
  parsed = parseCurrentURL(canonicalUrl)
  if (parsed) return parsed

  throw new Error("Unable to parse URL")
}
