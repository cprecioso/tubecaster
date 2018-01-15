import axios from "axios";
import { Types } from ".";
import { joinWithCommas } from "./_util";

const PlaylistUrl = "https://www.googleapis.com/youtube/v3/playlists";

async function playlist(playlistId: string, options: playlist.Options) {
  const params: Types.Playlist.List.Request.Params = {
    key: options.key,
    id: playlistId,
    maxResults: 1,
    part: joinWithCommas(options.parts, playlist.Options.Part.Snippet)
  };

  const response = await axios.get(PlaylistUrl, {
    responseType: "json",
    params
  });

  const data = response.data as Types.Playlist.List.Response;
  return data.items[0];
}

namespace playlist {
  export namespace Options {
    export enum Part {
      Id = "id",
      Snippet = "snippet"
    }
  }

  export interface Options {
    key: string;
    parts?: Options.Part | Options.Part[];
  }
}

export default playlist;
