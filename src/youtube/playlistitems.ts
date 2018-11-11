import { PlaylistItem } from "../feed/_types"
import { elementWithName, getPlaylistFeed } from "./_util"

export default async function playlistItems(
  playlistId: string
): Promise<PlaylistItem[]> {
  const feed = await getPlaylistFeed(playlistId)

  const items: PlaylistItem[] = feed
    .elements!.filter(elementWithName("entry"))
    .map(entry => {
      const mediaGroup = entry.elements!.find(elementWithName("media:group"))!
      const item: PlaylistItem = {
        channelTitle: entry
          .elements!.find(elementWithName("author"))!
          .elements!.find(elementWithName("name"))!.elements![0].text as string,
        description: mediaGroup.elements!.find(
          elementWithName("media:description")
        )!.elements![0].text! as string,
        publishedAt: new Date(entry.elements!.find(
          elementWithName("published")
        )!.elements![0].text! as string),
        thumbnail: mediaGroup.elements!.find(
          elementWithName("media:thumbnail")
        )!.attributes!.url as string,
        title: entry.elements!.find(elementWithName("title"))!.elements![0]
          .text! as string,
        videoId: entry.elements!.find(elementWithName("yt:videoId"))!
          .elements![0].text! as string
      }
      return item
    })

  return items
}
