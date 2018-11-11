import { Playlist } from "../feed/_types"
import { elementWithName, getPlaylistFeed, getPlaylistPage } from "./_util"

export default async function playlist(playlistId: string): Promise<Playlist> {
  const [feed, $] = await Promise.all([
    getPlaylistFeed(playlistId),
    getPlaylistPage(playlistId)
  ])

  let ref
  const publishedAt = ((ref = feed.elements!.find(
    elementWithName("published")
  )) != null
    ? (ref = ref.elements) != null
      ? (ref = ref[0]) != null
        ? ref.text
        : void 0
      : void 0
    : void 0) as string | undefined

  const playlistInfo: Playlist = {
    playlistId,
    title: $("meta[property='og:title']").attr("content"),
    description: $("meta[property='og:description']").attr("content"),
    thumbnail: $("meta[property='og:image']")
      .last()
      .attr("content"),
    publishedAt: (publishedAt && new Date(publishedAt)) as Date | undefined,
    channelTitle: feed
      .elements!.find(elementWithName("author"))!
      .elements!.find(elementWithName("name"))!.elements![0].text! as string,
    channelId: feed.elements!.find(elementWithName("yt:channelId"))!
      .elements![0].text! as string
  }

  return playlistInfo
}
