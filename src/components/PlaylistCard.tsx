import React from "react"
import { PlaylistData } from "../api/types"

export const PlaylistCard: React.FunctionComponent<{
  data: PlaylistData
}> = ({ data }) => {
  const [podcastUrl, setPodcastUrl] = React.useState(
    `/api/podcast?id=${data.playlistId}`
  )
  React.useEffect(
    () =>
      setPodcastUrl((oldUrl) => {
        const newUrl = new URL(oldUrl, window.location.href)
        newUrl.protocol = "podcast"
        return newUrl.href
      }),
    []
  )

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
