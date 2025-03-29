import { parse as parseDate } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { Misc, YTNodes } from "youtubei.js";
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
          .filter((video) => video.is(YTNodes.PlaylistVideo))
          .map(async (video): Promise<PlaylistItemData> => {
            const videoInfo = await yt.getInfo(video.endpoint);

            const publishedAt = fromYTDate
              .optional()
              .safeParse(videoInfo.primary_info?.published.toString()).data;

            return {
              channelTitle: video.author.name,
              description: safeHtml
                .optional()
                .parse(
                  videoInfo.secondary_info?.description.toHTML() ??
                    videoInfo.basic_info.short_description,
                ),
              publishedAt,
              thumbnail: findBestThumbnail(video.thumbnails)?.url,
              title: video.title.toString(),
              videoId: video.id,
              videoLink: `https://www.youtube.com/watch?v=${video.id}`,
            };
          }),
      ),
    };
  }
}
