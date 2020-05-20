import React from "react"
import { PlaylistData } from "../api/types"

export const PlaylistCard: React.FunctionComponent<{
  data: PlaylistData
}> = ({ data }) => {
  const [podcastLink, setPodcastLink] = React.useState({
    url: `/api/podcast?id=${data.playlistId}`,
    text: "Right click (or hold) to copy the link",
    shoxExtraInfo: false,
  })
  React.useEffect(
    () =>
      setPodcastLink(({ url }) => {
        const newUrl = new URL(url, window.location.href)
        newUrl.protocol = "podcast"
        return { url: newUrl.href, text: newUrl.href, shoxExtraInfo: true }
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
        <a href={podcastLink.url}>
          <pre className="full">{podcastLink.text}</pre>
        </a>
        <p className="full">
          <>Copy the link and paste it into your podcast app.</>
          {podcastLink.shoxExtraInfo ? (
            <>
              {" "}
              You can press and hold (or right-click) the link in order to copy
              it more easily.
            </>
          ) : null}
        </p>
      </main>
    </div>
  )
}
