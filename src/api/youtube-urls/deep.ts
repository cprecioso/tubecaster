import cheerio from "cheerio"
import { youtubeUrlToTubecasterUrl as shallow } from "./index"
import { TubecasterUrl } from "./internal"

const fetchCanonicalYoutubeUrl = async (
  url: string
): Promise<string | undefined> => {
  const body = await (await fetch(url)).text()
  const $ = cheerio.load(body)
  return $("link[rel='canonical']").attr("href")
}

export const youtubeUrlToTubecasterUrl = async (
  url: string
): Promise<TubecasterUrl> => {
  const shallowReturn = shallow(url)
  if (shallowReturn != null) return shallowReturn

  const canonicalUrl = await fetchCanonicalYoutubeUrl(url)
  if (canonicalUrl == null) throw new Error("Unable to fetch canonical URL")

  const deepReturn = shallow(canonicalUrl)
  if (deepReturn == null) throw new Error("Unable to parse canonical URL")

  return deepReturn
}
