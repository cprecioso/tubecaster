export enum GeneralListType {
  Playlist = "playlist",
  Channel = "channel"
}

export interface GeneralListReference {
  type: GeneralListType
  id: string
}

export interface PlaylistReference {
  name?: string
  id: string
}

export interface PlaylistData {
  playlistId: string
  playlistLink: string
  title: string
  description: string | null
  thumbnail: string
  publishedAt: string | null
  channelTitle: string
  channelId: string
  channelLink: string
  items: PlaylistItemData[]
}

export interface PlaylistItemData {
  videoId: string
  videoLink: string
  title: string
  description: string
  channelTitle: string
  publishedAt: string
  thumbnail: string
}

export interface Enclosure {
  url: string
  size?: number
  type?: string
}
