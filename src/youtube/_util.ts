import { load as cheerio } from "cheerio"
import { Element as XMLElement, xml2js } from "xml-js"
import { client } from "./_request"

export const elementWithName = (name: string) => (node: XMLElement) =>
  node.type === "element" && node.name === name

export const getPlaylistFeed = (id: string) =>
  client
    .get(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`)
    .then(
      res =>
        (xml2js(res.body, { alwaysArray: true }) as XMLElement).elements![0]
    )

export const getPlaylistPage = (id: string) =>
  client
    .get(`https://www.youtube.com/playlist?list=${id}`)
    .then(res => cheerio(res.body))

export const getCanonicalURL = async (url: string): Promise<string> => {
  const { body } = await client.get(url)
  const $ = cheerio(body)
  return $("link[rel='canonical']").attr("href")
}

export const isYouTubeURL = (url: string): boolean => {
  const { host } = new URL(url, "https://www.youtube.com/")
  return host === "youtube.com" || host === "www.youtube.com"
}
