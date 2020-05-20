import cheerio from "cheerio"
import {
  PlaylistReference,
  VideoCollectionReference,
  VideoCollectionType,
} from "./types"

const isYouTubeUrl = (url: string): boolean => {
  const { host } = new URL(url, "https://www.youtube.com/")
  return ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)
}

const requestCanonicalUrl = async (
  url: string
): Promise<string | undefined> => {
  const body = await (await fetch(url)).text()
  const $ = cheerio.load(body)
  return $("link[rel='canonical']").attr("href")
}

const parseUrl = (url: string): VideoCollectionReference | null => {
  const obj = new URL(url, "https://www.youtube.com/")
  const [, urlType, urlId] = obj.pathname.split("/")
  switch (urlType) {
    case "channel": {
      if (!urlId) throw new Error("Expected a channel ID in the URL")
      return { type: VideoCollectionType.Channel, id: urlId }
    }
    case "watch":
    case "playlist": {
      const list = obj.searchParams.get("list")
      if (!list) throw new Error("Expected a list ID in the URL")
      return { type: VideoCollectionType.Playlist, id: list }
    }
    default: {
      return null
    }
  }
}

export function parsePlaylistRef(url: string): VideoCollectionReference | null {
  if (!isYouTubeUrl(url)) throw new Error("URL is not from YouTube")
  return parseUrl(url)
}

async function requestPlaylistRef(
  url: string
): Promise<VideoCollectionReference> {
  let parsed = parsePlaylistRef(url)
  if (parsed) return parsed

  const canonicalUrl = await requestCanonicalUrl(url)
  if (canonicalUrl) {
    parsed = parseUrl(canonicalUrl)
    if (parsed) return parsed
  }

  throw new Error("Unable to parse URL")
}

const CHANNEL_PREFIX_REGEX = /^UC/
const channelToPlaylists = (channelId: string): PlaylistReference[] => [
  {
    name: "Uploaded videos",
    id: channelId.replace(CHANNEL_PREFIX_REGEX, "UU"),
  },
  {
    name: "Popular videos",
    id: channelId.replace(CHANNEL_PREFIX_REGEX, "PU"),
  },
  {
    name: "Favorite videos",
    id: channelId.replace(CHANNEL_PREFIX_REGEX, "FL"),
  },
]

const requestCanonicalPlaylists = async (
  url: string
): Promise<PlaylistReference[]> => {
  const ref = await requestPlaylistRef(url)
  return refToPlaylists(ref)
}
export default requestCanonicalPlaylists

export function refToPlaylists(ref: VideoCollectionReference) {
  switch (ref.type) {
    case VideoCollectionType.Channel:
      return channelToPlaylists(ref.id)
    case VideoCollectionType.Playlist:
      return [{ id: ref.id }]
    default:
      throw new Error("Can't find playlist")
  }
}
