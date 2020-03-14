import { get } from "../../api-helpers"
import { CanonicalPlaylist } from "../../api-types"
import requestCanonicalPlaylists from "../../canonical"

export default get<CanonicalPlaylist.Request, CanonicalPlaylist.Response>(
  async ({ url }) => {
    if (!url) throw new Error("URL not found")
    const playlistReferences = await requestCanonicalPlaylists(url)
    return { type: CanonicalPlaylist.ResponseType.Found, playlistReferences }
  }
)
