import { NextPage } from "next"
import React from "react"
import { Playlist } from "../api-types"

type Props = { response: Playlist.Response }

const usePodcastUrl = (id: string) => {
  const [podcastUrl, setPodcastUrl] = React.useState(
    undefined as string | undefined
  )

  React.useEffect(() => {
    if (process.browser) {
      const url = new URL(`/api/podcast?id=${id}`, window.location.href)
      url.protocol = "podcast"
      setPodcastUrl(url.href)
    }
  }, [])

  return podcastUrl
}

const PlaylistPage: NextPage<Props> = ({ response }) => {
  const data = response.playlistData

  const podcastUrl = usePodcastUrl(data.playlistId)

  return (
    <div className="card flex one center">
      <header className="full">
        <img className="full" src={data.thumbnail} />
        <h3>
          <a href={data.playlistLink}>{data.title}</a>
        </h3>
        <h4>
          from <a href={data.channelLink}>{data.channelTitle}</a>
        </h4>
      </header>
      <main className="full">
        <a href={podcastUrl}>
          <pre className="full">{podcastUrl}</pre>
        </a>
        <p className="full">
          Copy the link and paste it into your podcast app. You can press and
          hold (or right-click) the link in order to copy it more easily.
        </p>
      </main>
    </div>
  )
}

PlaylistPage.getInitialProps = async ({ query, res }) => {
  const id = query.id as string
  if (!res) {
    const req = fetch(`/api/playlist?id=${encodeURIComponent(id)}`)
    const response = (await (await req).json()) as Playlist.Response
    return { id, response }
  } else {
    const response: Playlist.Response = {
      type: Playlist.ResponseType.Found,
      playlistData: await (await import("../playlist")).default(id)
    }
    return { response }
  }
}

export default PlaylistPage
