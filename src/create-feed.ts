import parseAuthor from "parse-author"
import RSS from "rss"
import pkg from "../package.json"
import { Enclosure, PlaylistData } from "./types"

export default function createFeed(
  feed_url: string,
  enclosureCreator: (videoId: string) => Enclosure,
  playlist: PlaylistData
) {
  const author = parseAuthor(pkg.author as string)

  const feed = new RSS({
    title: playlist.title,
    description: `${playlist.playlistLink}\n\n${playlist.description || ""}`,
    generator: `${pkg.name} ${pkg.version}`,
    feed_url,
    ttl: 60,
    site_url: playlist.playlistLink,
    image_url: playlist.thumbnail,
    pubDate: playlist.publishedAt,
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      media: "http://search.yahoo.com/mrss/"
    },
    custom_elements: [
      { "itunes:author": playlist.channelTitle },
      { "itunes:summary": playlist.description },
      {
        "itunes:owner": [
          { "itunes:name": author.name },
          { "itunes:email": author.email }
        ]
      },
      { "itunes:block": "yes" },
      { language: "en-US" },
      { "itunes:explicit": false },
      { "itunes:category": { _attr: { text: "TV & Film" } } },
      {
        "itunes:image": {
          _attr: {
            href: playlist.thumbnail
          }
        }
      }
    ]
  })

  for (const item of playlist.items) {
    const enclosure = enclosureCreator(item.videoId)

    feed.item({
      title: item.title,
      description: `${item.videoLink}\n\n${item.description || ""}`,
      url: item.videoLink,
      author: item.channelTitle,
      date: new Date(item.publishedAt),
      enclosure,
      custom_elements: [
        { "itunes:author": item.channelTitle },
        {
          "itunes:image": {
            _attr: {
              href: item.thumbnail
            }
          }
        },
        { "itunes:episodeType": "full" },
        { "media:content": { _attr: enclosure } }
      ]
    })
  }

  return feed.xml()
}
