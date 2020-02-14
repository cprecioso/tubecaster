import { get } from "../../src/api-helpers"
import { CanonicalPlaylist } from "../../src/api-types"
import requestCanonicalPlaylists from "../../src/canonical"

export default get<CanonicalPlaylist.Request, CanonicalPlaylist.Response>(
  async ({ url }) => {
    if (!url) throw new Error("URL not found")
    const playlistReferences = await requestCanonicalPlaylists(url)
    return { type: CanonicalPlaylist.ResponseType.Found, playlistReferences }
  }
)
