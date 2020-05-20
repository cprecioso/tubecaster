import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { parsePlaylistRef, refToPlaylists } from "../canonical"
import { ErrorCard } from "../components/ErrorCard"
import { PlaylistChooseCard } from "../components/PlaylistChooseCard"
import SearchField, { OnSubmitHandler } from "../components/SearchField"
import { PlaylistReference } from "../types"

const IndexPage: NextPage = () => {
  const [playlistOptions, setPlaylistOptions] = React.useState<
    PlaylistReference[] | undefined
  >()
  const [error, setError] = React.useState<string | undefined>()

  const router = useRouter()
  const handleSubmit = React.useCallback<OnSubmitHandler>(
    (url, preventDefault) => {
      setError(undefined)
      setPlaylistOptions(undefined)

      try {
        const ref = parsePlaylistRef(url)
        if (ref) {
          const playlists = refToPlaylists(ref)
          if (playlists.length === 1) {
            router.push("/playlist/[id]", `/playlist/${playlists[0].id}`)
          } else {
            setPlaylistOptions(playlists)
          }
          return preventDefault()
        }
      } catch (err) {
        setError("" + err)
        return preventDefault()
      }
    },
    []
  )

  return (
    <>
      <style jsx>{`
        .small-font {
          font-size: 0.8em;
        }
      `}</style>

      <SearchField onSubmit={handleSubmit} />

      {error != null ? <ErrorCard error={error} /> : null}

      {playlistOptions != null ? (
        <PlaylistChooseCard options={playlistOptions} />
      ) : null}

      <div className="full card small-font">
        <p>
          Just paste the link to a YouTube channel or playlist in the box above.
          Tubecaster will convert it to a video podcast you can listen to (or
          watch) with your favorite podcast app.
        </p>
        <p>
          No ads. No comments. If your podcast app supports it, you can download
          the videos for later or watch them while on the background. Remember
          to support your favourite channels though!
        </p>
      </div>
    </>
  )
}
export default IndexPage
