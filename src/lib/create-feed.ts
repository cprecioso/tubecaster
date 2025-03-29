import parseAuthor from "parse-author";
import RSS from "rss";
import pkg from "../../package.json";
import { PlaylistData } from "./types";
import { t } from "./util";

export default function createFeed(
  feed_url: string,
  enclosureCreator: (videoId: string) => RSS.EnclosureObject,
  playlist: PlaylistData,
) {
  const feedAuthor = parseAuthor(pkg.author as string);

  const feed = new RSS({
    title: playlist.title ?? t`Playlist from ${playlist.channelTitle}`,
    description: [playlist.playlistLink, playlist.description]
      .filter(Boolean)
      .join("\n\n"),
    generator: `${pkg.name} ${pkg.version}`,
    feed_url,
    ttl: 60,
    site_url: playlist.playlistLink,
    image_url: playlist.thumbnail,
    pubDate: playlist.publishedAt,
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      media: "http://search.yahoo.com/mrss/",
      podcast: "https://podcastindex.org/namespace/1.0",
    },
    custom_elements: [
      { link: playlist.playlistLink },
      { "itunes:author": playlist.channelTitle },
      { "itunes:summary": playlist.description },
      {
        "itunes:owner": [
          { "itunes:name": feedAuthor.name },
          { "itunes:email": feedAuthor.email },
        ],
      },
      { "itunes:block": "yes" },
      { "itunes:explicit": false },
      { "itunes:category": { _attr: { text: "TV & Film" } } },
      { "itunes:image": { _attr: { href: playlist.thumbnail } } },
    ],
  });

  for (const item of playlist.items) {
    const enclosure = enclosureCreator(item.videoId);

    feed.item({
      title: item.title,
      description: [item.videoLink, item.description]
        .filter(Boolean)
        .join("\n\n"),
      url: item.videoLink,
      author: item.channelTitle,
      date: item.publishedAt ?? "",
      enclosure,
      custom_elements: [
        { link: item.videoLink },
        { "itunes:author": item.channelTitle },
        { "itunes:image": { _attr: { href: item.thumbnail } } },
        { "itunes:episodeType": "full" },
        { "itunes:duration": item.duration },
        { "media:content": { _attr: enclosure } },
        {
          "podcast:contentLink": [
            { _attr: { href: item.videoLink } },
            t`Watch on YouTube`,
          ],
        },
      ],
    });
  }

  return feed.xml();
}
