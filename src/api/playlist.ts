import cheerio from "cheerio"
import { Element as XMLElement, xml2js } from "xml-js"
import { PlaylistData } from "./types"

const elementWithName = (name: string) => (node: XMLElement) =>
  node.type === "element" && node.name === name

const requestPlaylistFeed = async (id: string) =>
  (xml2js(
    await (
      await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`)
    ).text(),
    { alwaysArray: true }
  ) as XMLElement).elements![0]

const requestPlaylistPage = async (id: string) =>
  cheerio.load(
    await (await fetch(`https://www.youtube.com/playlist?list=${id}`)).text()
  )

export default async function requestPlaylistData(
  playlistId: string
): Promise<PlaylistData> {
  const [feed, $] = await Promise.all([
    requestPlaylistFeed(playlistId),
    requestPlaylistPage(playlistId),
  ])

  const publishedAt = feed.elements!.find(elementWithName("published"))
    ?.elements?.[0].text as string | undefined

  const channelId = feed.elements!.find(elementWithName("yt:channelId"))!
    .elements![0].text! as string
  return {
    playlistId,
    playlistLink: `https://www.youtube.com/playlist?list=${playlistId}`,
    title: $("meta[property='og:title']").attr("content") || "",
    description: $("meta[property='og:description']").attr("content") ?? null,
    thumbnail: $("meta[property='og:image']").last().attr("content") || "",
    publishedAt: (publishedAt && new Date(publishedAt).toISOString()) ?? null,
    channelTitle: feed
      .elements!.find(elementWithName("author"))!
      .elements!.find(elementWithName("name"))!.elements![0].text! as string,
    channelId,
    channelLink: `https://www.youtube.com/channel/${channelId}`,
    items: feed.elements!.filter(elementWithName("entry")).map((entry) => {
      const mediaGroup = entry.elements!.find(elementWithName("media:group"))!
      const videoId = entry.elements!.find(elementWithName("yt:videoId"))!
        .elements![0].text! as string
      return {
        channelTitle: entry
          .elements!.find(elementWithName("author"))!
          .elements!.find(elementWithName("name"))!.elements![0].text as string,
        description: mediaGroup.elements!.find(
          elementWithName("media:description")
        )!.elements![0].text! as string,
        publishedAt: new Date(
          entry.elements!.find(elementWithName("published"))!.elements![0]
            .text! as string
        ).toISOString(),
        thumbnail: mediaGroup.elements!.find(
          elementWithName("media:thumbnail")
        )!.attributes!.url as string,
        title: entry.elements!.find(elementWithName("title"))!.elements![0]
          .text! as string,
        videoId,
        videoLink: `https://www.youtube.com/watch?v=${videoId}`,
      }
    }),
  }
}
