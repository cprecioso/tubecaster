import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { parsePlaylistRef, refToPlaylists } from "../canonical"
import { ErrorCard } from "../components/ErrorCard"
import { PlaylistChooseCard } from "../components/PlaylistChooseCard"
import { PlaylistReference } from "../types"

const IndexPage: NextPage = () => {
  const [playlistOptions, setPlaylistOptions] = React.useState<
    PlaylistReference[] | undefined
  >()
  const [error, setError] = React.useState<string | undefined>()

  const [url, setUrl] = React.useState("")
  const handleChangeUrl = React.useCallback<
    NonNullable<JSX.IntrinsicElements["input"]["onChange"]>
  >((e) => {
    setError(undefined)
    setPlaylistOptions(undefined)
    setUrl(e.currentTarget.value)
  }, [])

  const router = useRouter()
  const handleSubmit = React.useCallback<
    NonNullable<JSX.IntrinsicElements["form"]["onSubmit"]>
  >(
    (e) => {
      try {
        const ref = parsePlaylistRef(url)
        if (ref) {
          const playlists = refToPlaylists(ref)
          if (playlists.length === 1) {
            router.push("/playlist/[id]", `/playlist/${playlists[0].id}`)
          } else {
            setPlaylistOptions(playlists)
          }
          e.preventDefault()
          return false
        }
      } catch (err) {
        setError("" + err)
        e.preventDefault()
        return false
      }
    },
    [url]
  )

  return (
    <>
      <style jsx>{`
        .small-font {
          font-size: 0.8em;
        }
      `}</style>

      <form
        className="card full flex one two-500"
        method="GET"
        action="/playlist-choose"
        onSubmit={handleSubmit}
      >
        <div className="full two-third-500 three-fourth-700">
          <input
            type="url"
            name="url"
            placeholder="YouTube URL"
            value={url}
            onChange={handleChangeUrl}
          />
        </div>
        <div className="full third-500 fourth-700">
          <button className="full" type="submit">
            Get podcast
          </button>
        </div>
      </form>

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
