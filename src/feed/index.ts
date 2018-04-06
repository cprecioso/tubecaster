import { Stream } from "most"
import * as parseAuthor from "parse-author"
import * as RSS from "rss"

import * as Types from "../youtube/types"
import { chooseBiggestThumbnail } from "./_util"

const pkg = require("../../package.json")

interface Enclosure {
  url: string
  size?: number
  type?: string
}

export default async function createFeed(
  feed_url: string,
  enclosure_creator: (playlistId: string, itemId: string) => Enclosure,
  playlist: Types.Playlist,
  items: Stream<Types.Playlist.Item>
) {
  if (!playlist.snippet)
    throw new Error("Please provide all the information for playlist")

  const feed = new RSS({
    title: playlist.snippet.title,
    description: playlist.snippet.description,
    generator: `${pkg.name} ${pkg.version}`,
    feed_url,
    ttl: 60,
    site_url: `https://www.youtube.com/playlist?list=${playlist.id}`,
    image_url: chooseBiggestThumbnail(playlist.snippet.thumbnails).url,
    pubDate: new Date(playlist.snippet.publishedAt),
    webMaster: pkg.author,
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
    },
    custom_elements: [
      { "itunes:author": playlist.snippet.channelTitle },
      { "itunes:summary": playlist.snippet.description },
      {
        "itunes:owner": [
          { "itunes:name": parseAuthor(pkg.author).name },
          { "itunes:email": parseAuthor(pkg.author).email }
        ]
      },
      { "itunes:block": "yes" },
      { "itunes:category": { _attr: { text: "TV & Film" } } },
      {
        "itunes:image": {
          _attr: {
            href: chooseBiggestThumbnail(playlist.snippet.thumbnails).url
          }
        }
      }
    ]
  })

  await items.forEach(item => {
    if (!item.status || !item.snippet)
      throw new Error("Please provide all the information for items")

    if (item.status.privacyStatus === "private") return
    feed.item({
      title: item.snippet.title,
      description: item.snippet.description,
      url: `http://youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      author: item.snippet.channelTitle,
      date: new Date(item.snippet.publishedAt),
      enclosure: enclosure_creator(
        playlist.id,
        item.snippet.resourceId.videoId
      ),
      custom_elements: [
        { "itunes:author": item.snippet.channelTitle },
        {
          "itunes:image": {
            _attr: {
              href: chooseBiggestThumbnail(item.snippet.thumbnails).url
            }
          }
        },
        { "itunes:episodeType": "full" }
      ]
    })
  })

  return feed.xml()
}
