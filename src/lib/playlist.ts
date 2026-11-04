import { parse as parseDate } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { Helpers, Misc, YTNodes } from "youtubei.js";

type YTNode = Helpers.YTNode;
import * as z from "zod";
import { PlaylistData, PlaylistItemData, safeHtml } from "./types";
import { findMax } from "./util";
import { yt } from "./youtube";

const findBestThumbnail = (thumbnails: Misc.Thumbnail[]) =>
  findMax(thumbnails, (t) => t.width * t.height);

const fromYTDate = z
  .string()
  .transform((str) =>
    parseDate(str, "MMM d, yyyy", new Date(), { locale: enUS }),
  );

// YouTube returns either legacy PlaylistVideo nodes or newer LockupView nodes
const getVideoId = (node: YTNode): string[] => {
  if (node.is(YTNodes.PlaylistVideo)) return [node.id];
  if (
    node.is(YTNodes.LockupView) &&
    node.content_type === "VIDEO" &&
    node.content_id
  )
    return [node.content_id];
  return [];
};

export default async function requestPlaylistData(
  playlistId: string,
): Promise<PlaylistData> {
  {
    const { info, videos } = await yt.getPlaylist(playlistId);

    return {
      playlistId,
      playlistLink: `https://www.youtube.com/playlist?list=${playlistId}`,
      title: info.title,
      description: safeHtml.parse(
        [info.subtitle && `<p>${info.subtitle.toHTML()}</p>`, info.description]
          .filter(Boolean)
          .join(""),
      ),
      thumbnail: findBestThumbnail(info.thumbnails)?.url,
      channelTitle: info.author.name,
      channelId: info.author.id,
      channelLink: `https://www.youtube.com/channel/${info.author.id}`,

      items: await Promise.all(
        videos
          .flatMap(getVideoId)
          .map(async (videoId): Promise<PlaylistItemData> => {
            const videoInfo = await yt.getInfo(videoId);
            const { basic_info } = videoInfo;

            const publishedAt = fromYTDate
              .optional()
              .safeParse(videoInfo.primary_info?.published.toString()).data;

            return {
              channelTitle: basic_info.author ?? info.author.name,
              description: safeHtml
                .optional()
                .parse(
                  videoInfo.secondary_info?.description.toHTML() ??
                    basic_info.short_description,
                ),
              duration: basic_info.duration,
              publishedAt,
              thumbnail: findBestThumbnail(basic_info.thumbnail ?? [])?.url,
              title: basic_info.title ?? videoId,
              videoId,
              videoLink: `https://www.youtube.com/watch?v=${videoId}`,
            };
          }),
      ),
    };
  }
}
