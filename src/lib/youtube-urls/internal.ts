import { VideoCollectionReference, VideoCollectionType } from "@/lib/types";
import { Locale } from "@/locale";
import { coerceUrl } from "@/route";

const isYouTubeUrl = (url: string): boolean => {
  const { host } = new URL(url, "https://www.youtube.com/");
  return ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host);
};

const extractParamsFromYoutubeUrl = (
  url: string,
): VideoCollectionReference | null => {
  const obj = new URL(url, "https://www.youtube.com/");
  const [, urlType, urlId] = obj.pathname.split("/");
  switch (urlType) {
    case "channel": {
      if (!urlId) throw new Error("Expected a channel ID in the URL");
      return { type: VideoCollectionType.Channel, id: urlId };
    }
    case "watch":
    case "playlist": {
      const list = obj.searchParams.get("list");
      if (!list) throw new Error("Expected a list ID in the URL");
      return { type: VideoCollectionType.Playlist, id: list };
    }
    default: {
      return null;
    }
  }
};

export const youtubeUrlToVideoCollectionReference = (
  url: string,
): VideoCollectionReference | null => {
  if (!isYouTubeUrl(url)) throw new Error("URL is not from YouTube");
  return extractParamsFromYoutubeUrl(url);
};

export const videoCollectionReferenceToTubecasterUrl = <T extends string>(
  locale: Locale,
  ref: VideoCollectionReference,
) => coerceUrl(`/${locale}/${ref.type}/${ref.id}`);
