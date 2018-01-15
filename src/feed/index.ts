import * as RSS from "rss";
import { Types as YT } from "../youtube";
import { chooseBiggestThumbnail } from "./_util";
const pkg = require("../../package.json");

interface Enclosure {
  url: string;
  size?: number;
  type?: string;
}

export default async function createFeed(
  feed_url: string,
  enclosure_creator: (playlistId: string, itemId: string) => Enclosure,
  playlist: YT.Playlist,
  items: AsyncIterableIterator<YT.Playlist.Item>
) {
  const feed = new RSS({
    title: playlist.snippet!.title,
    description: playlist.snippet!.description,
    generator: pkg.name,
    feed_url,
    ttl: 60,
    site_url: `https://www.youtube.com/playlist?list=${playlist.id}`,
    image_url: chooseBiggestThumbnail(playlist.snippet!.thumbnails).url,
    pubDate: new Date(playlist.snippet!.publishedAt),
    managingEditor: playlist.snippet!.channelTitle,
    webMaster: pkg.author,
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
    },
    custom_elements: [
      { "itunes:author": playlist.snippet!.channelTitle },
      { "itunes:summary": playlist.snippet!.description },
      {
        "itunes:owner": [
          { "itunes:name": pkg.author.name },
          { "itunes:email": pkg.author.email }
        ]
      },
      {
        "itunes:image": {
          _attr: {
            href: chooseBiggestThumbnail(playlist.snippet!.thumbnails).url
          }
        }
      }
    ]
  });

  for await (const item of items) {
    if (item.status!.privacyStatus === "private") continue;
    feed.item({
      title: item.snippet!.title,
      description: item.snippet!.description,
      url: `http://youtube.com/watch?v=${item.snippet!.resourceId.videoId}`,
      author: item.snippet!.channelTitle,
      date: new Date(item.snippet!.publishedAt),
      enclosure: enclosure_creator(
        playlist.id,
        item.snippet!.resourceId.videoId
      ),
      custom_elements: [
        { "itunes:author": item.snippet!.channelTitle },
        {
          "itunes:image": {
            _attr: {
              href: chooseBiggestThumbnail(item.snippet!.thumbnails).url
            }
          }
        }
      ]
    });
  }

  return feed.xml();
}
