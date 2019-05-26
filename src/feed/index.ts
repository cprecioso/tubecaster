import parseAuthor from "parse-author"
import { sync as readPkgUp } from "read-pkg-up"
import RSS from "rss"
import { Playlist, PlaylistItem } from "./_types"

const { package: pkg } = readPkgUp({ normalize: false })

interface Enclosure {
  url: string
  size?: number
  type?: string
}

export default function createFeed(
  feed_url: string,
  enclosureCreator: (videoId: string) => Enclosure,
  playlist: Playlist,
  items: PlaylistItem[]
) {
  const feed = new RSS({
    title: playlist.title,
    description: playlist.description,
    generator: `${pkg.name} ${pkg.version}`,
    feed_url,
    ttl: 60,
    site_url: `https://www.youtube.com/playlist?list=${playlist.playlistId}`,
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
          { "itunes:name": parseAuthor(pkg.author).name },
          { "itunes:email": parseAuthor(pkg.author).email }
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

  items.forEach(item => {
    const enclosure = enclosureCreator(item.videoId)

    feed.item({
      title: item.title,
      description: item.description,
      url: `http://youtube.com/watch?v=${item.videoId}`,
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
  })

  return feed.xml()
}
