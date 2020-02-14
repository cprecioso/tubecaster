import { NextApiRequest, NextApiResponse } from "next"
import { PlaylistData, PlaylistReference } from "./types"

export namespace Playlist {
  export type Request = {
    id: string
  }

  export enum ResponseType {
    Found
  }

  export type Response = {
    type: ResponseType.Found
    playlistData: PlaylistData
  }
}

export namespace CanonicalPlaylist {
  export type Request = {
    url: string
  }

  export enum ResponseType {
    Found
  }

  export type FoundResponse = {
    type: ResponseType.Found
    playlistReferences: PlaylistReference[]
  }

  export type Response = FoundResponse | ApiErrorResponse
}

export const ERROR_TYPE_SIG = -1
export type ApiErrorResponse = { type: typeof ERROR_TYPE_SIG; error: string }
export type ApiResponse =
  | { type: Exclude<number | string, typeof ERROR_TYPE_SIG> }
  | ApiErrorResponse

export type MicroHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>
