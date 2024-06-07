import {
  ChannelReference,
  PlaylistReference,
  VideoCollectionType,
} from "../types";
import {
  TubecasterUrl,
  videoCollectionReferenceToTubecasterUrl,
  youtubeUrlToVideoCollectionReference,
} from "./internal";

export const youtubeUrlToTubecasterUrl = (
  url: string,
): TubecasterUrl | null => {
  const ref = youtubeUrlToVideoCollectionReference(url);
  if (ref) {
    return videoCollectionReferenceToTubecasterUrl(ref);
  }
  return ref;
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
