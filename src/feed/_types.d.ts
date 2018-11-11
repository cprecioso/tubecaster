export interface Playlist {
  playlistId: string
  title: string
  description?: string
  thumbnail: string
  publishedAt?: Date
  channelTitle: string
  channelId: string
}

export interface PlaylistItem {
  videoId: string
  title: string
  description: string
  channelTitle: string
  publishedAt: Date
  thumbnail: string
}
