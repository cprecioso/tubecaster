export enum VideoCollectionType {
  Playlist = "playlist",
  Channel = "channel",
}

export interface VideoCollectionReference {
  type: VideoCollectionType;
  id: string;
}

export interface ChannelReference extends VideoCollectionReference {
  type: VideoCollectionType.Channel;
}

export interface PlaylistReference extends VideoCollectionReference {
  type: VideoCollectionType.Playlist;
  name?: string;
}

export interface PlaylistData {
  playlistId: string;
  playlistLink: string;
  title: string;
  description: string | null;
  thumbnail: string;
  publishedAt: string | null;
  channelTitle: string;
  channelId: string;
  channelLink: string;
  items: PlaylistItemData[];
}

export interface PlaylistItemData {
  videoId: string;
  videoLink: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
}

export interface Enclosure {
  url: string;
  size?: number;
  type?: string;
}
