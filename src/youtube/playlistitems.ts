import axios from "axios";
import { isArray } from "util";
import { Types } from ".";
import { joinWithCommas } from "./_util";

const PlaylistItemsURL = "https://www.googleapis.com/youtube/v3/playlistItems";

async function* playlistItems(
  playlistId: string,
  options: playlistItems.Options
): AsyncIterableIterator<Types.Playlist.Item> {
  const params: Types.Playlist.Item.List.Request.Params = {
    key: options.key,
    maxResults: options.batch,
    part: joinWithCommas(options.parts, playlistItems.Options.Part.Snippet),
    playlistId
  };

  do {
    const response = await axios.get(PlaylistItemsURL, {
      responseType: "json",
      params
    });

    const data = response.data as Types.Playlist.Item.List.Response;
    yield* data.items;

    params.pageToken = data.nextPageToken;
  } while (params.pageToken != null);
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
    key: string;
    parts?: Options.Part | Options.Part[];
    batch?: number;
  }
}

export default playlistItems;
