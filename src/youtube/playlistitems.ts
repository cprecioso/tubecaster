import * as Types from "./types"
import { joinWithCommas } from "./_util"
import { unpaginatedRequest } from "./_request"

const PlaylistItemsUrl = "https://www.googleapis.com/youtube/v3/playlistItems"

async function* playlistItems(
  playlistId: string,
  options: playlistItems.Options
) {
  const params: Types.Playlist.Item.List.Request.Params = {
    key: options.key,
    part: joinWithCommas(options.parts, playlistItems.Options.Part.Snippet),
    playlistId
  }

  const { items } = await unpaginatedRequest<Types.Playlist.Item>(
    PlaylistItemsUrl,
    params,
    options.limit
  )
  yield* items
}

namespace playlistItems {
  export namespace Options {
    export enum Part {
      Id = "id",
      Snippet = "snippet",
      ContentDetails = "contentDetails",
      Status = "status"
    }
  }

  export interface Options {
    key: string
    parts?: Options.Part | Options.Part[]
    limit?: number
  }
}

export default playlistItems
