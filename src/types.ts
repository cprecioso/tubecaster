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
  title: string
  description?: string
  thumbnail: string
  publishedAt?: string
  channelTitle: string
  channelId: string
  items: PlaylistItemData[]
}

export interface PlaylistItemData {
  videoId: string
  title: string
  description: string
  channelTitle: string
  publishedAt: Date
  thumbnail: string
}

export interface Enclosure {
  url: string
  size?: number
  type?: string
}
