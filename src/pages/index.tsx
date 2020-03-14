import { css, jsx } from "@emotion/core"
import { produce } from "immer"
import Link from "next/link"
import Router from "next/router"
import React, { FunctionComponent } from "react"
import {
  ApiErrorResponse,
  CanonicalPlaylist,
  ERROR_TYPE_SIG
} from "../api-types"
import { PlaylistReference } from "../types"

const OptionButton: FunctionComponent<{
  option: PlaylistReference
}> = ({ option }) => (
  <Link href={{ pathname: "/playlist", query: { id: option.id } }}>
    <a>{option.name}</a>
  </Link>
)

export default () => {
  const [state, setState] = React.useState({
    url: "",
    loading: false,
    options: null as null | readonly PlaylistReference[],
    error: null as string | null
  })

  React.useEffect(() => {
    if (!state.loading) return

    const controller = new AbortController()

    void (async () => {
      const req = fetch(
        `/api/canonical-playlist?url=${encodeURIComponent(state.url)}`,
        { signal: controller.signal }
      )
      const res = (await (await req).json()) as CanonicalPlaylist.Response
      setState(
        produce(state => {
          state.loading = false
        })
      )

      switch (res.type) {
        case CanonicalPlaylist.ResponseType.Found:
          const { playlistReferences } = res as CanonicalPlaylist.FoundResponse
          if (playlistReferences.length === 1) {
            return Router.push({
              pathname: "/playlist",
              query: { id: playlistReferences[0].id }
            })
          } else {
            return setState(
              produce(state => {
                state.options = playlistReferences
              })
            )
          }
        case ERROR_TYPE_SIG:
          return setState(
            produce(state => {
              state.error = (res as ApiErrorResponse).error
            })
          )
      }
    })()

    return () => controller.abort()
  }, [state.loading])

  const submitCb = React.useCallback(
    e => {
      if (state.url) {
        setState(
          produce(state => {
            state.loading = true
          })
        )
      }
      e.preventDefault()
    },
    [state]
  )

  const changeCb = React.useCallback(e => {
    const url = e.target.value || ""
    setState(
      produce(state => {
        state.url = url
      })
    )
  }, [])

  return (
    <>
      {state.error ? <pre className="card">{state.error}</pre> : null}
      <form
        className="card full flex one two-500"
        method="#"
        onSubmit={submitCb}
      >
        <div className="full two-third-500 three-fourth-700">
          <input
            type="url"
            placeholder="Youtube URL"
            value={state.url}
            onChange={changeCb}
          />
        </div>
        <div className="full third-500 fourth-700">
          <button className="full" type="submit" disabled={state.loading}>
            Get podcast
          </button>
        </div>
      </form>

      {state.options && state.options.length > 0 ? (
        <>
          <div className="card full flex one center">
            <h3>Choose the list you want to convert:</h3>
            <div className="flex one two-500">
              <ul
                css={css`
                  margin: 0;
                `}
              >
                {state.options.map((option, i) => (
                  <li className="stack" key={i}>
                    <OptionButton option={option} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="card"
            css={css`
              font-size: 0.8em;
            `}
          >
            <p>
              If you want the podcast of another playlist from that user, you
              can paste the link of that playlist instead.
            </p>
          </div>
        </>
      ) : (
        <div
          className="full card"
          css={css`
            font-size: 0.8em;
          `}
        >
          <p>
            Just paste the link to a YouTube channel or playlist in the box
            above. Tubecaster will convert it to a video podcast you can listen
            to with your favorite podcast app.
          </p>
          <p>
            No ads. No comments. If your podcast app supports it, you can
            download the videos for later or watch them while on the background.
            Remember to support your favourite channels though!
          </p>
        </div>
      )}
    </>
  )
}
