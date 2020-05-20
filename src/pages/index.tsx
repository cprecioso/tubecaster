import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { youtubeUrlToTubecasterUrl } from "../api/youtube-urls"
import { ErrorCard } from "../components/ErrorCard"
import SearchField, { OnSubmitHandler } from "../components/SearchField"

const IndexPage: NextPage = () => {
  const [error, setError] = React.useState<string | undefined>()

  const router = useRouter()
  const handleSubmit = React.useCallback<OnSubmitHandler>(
    (url, preventDefault) => {
      try {
        const redirectUrl = youtubeUrlToTubecasterUrl(url)
        if (redirectUrl) {
          router.push(redirectUrl.href, redirectUrl.as)
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
