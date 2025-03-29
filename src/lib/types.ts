import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import * as z from "zod";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const safeHtml = z
  .string()
  .transform((s) => DOMPurify.sanitize(s))
  .brand<"safe_html">();
export type SafeHTML = z.infer<typeof safeHtml>;

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
  title?: string;
  description?: SafeHTML;
  thumbnail?: string;
  publishedAt?: Date;
  channelTitle: string;
  channelId: string;
  channelLink: string;
  items: PlaylistItemData[];
}

export interface PlaylistItemData {
  videoId: string;
  videoLink: string;
  title: string;
  duration?: number;
  description?: SafeHTML;
  channelTitle: string;
  publishedAt?: Date;
  thumbnail?: string;
}
