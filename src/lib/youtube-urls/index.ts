import { Locale } from "@/locale";
import assert from "node:assert/strict";
import {
  ChannelReference,
  PlaylistReference,
  VideoCollectionReference,
  VideoCollectionType,
} from "../types";
import { fetchCanonicalYoutubeUrl } from "./canonical";
import { extractParamsFromYoutubeUrl } from "./extract-params";

const videoCollectionReferenceToTubecasterUrl = (
  locale: Locale,
  ref: VideoCollectionReference,
) => `/${locale}/${ref.type}/${ref.id}`;

export const youtubeUrlToTubecasterUrl = async (
  locale: Locale,
  url: string,
) => {
  let ref = extractParamsFromYoutubeUrl(url);

  if (ref.type === "username") {
    ref = extractParamsFromYoutubeUrl(await fetchCanonicalYoutubeUrl(url));
  }

  assert(ref.type !== "username", "Couldn't get a channel reference");

  return videoCollectionReferenceToTubecasterUrl(locale, ref);
};

const CHANNEL_PREFIX_REGEX = /^UC/;
export const channelReferenceToPlaylistReferences = (
  ref: ChannelReference,
): PlaylistReference[] => [
  {
    type: VideoCollectionType.Playlist,
    name: "Uploaded videos",
    id: ref.id.replace(CHANNEL_PREFIX_REGEX, "UU"),
  },
  {
    type: VideoCollectionType.Playlist,
    name: "Popular videos",
    id: ref.id.replace(CHANNEL_PREFIX_REGEX, "PU"),
  },
  {
    type: VideoCollectionType.Playlist,
    name: "Favorite videos",
    id: ref.id.replace(CHANNEL_PREFIX_REGEX, "FL"),
  },
];
