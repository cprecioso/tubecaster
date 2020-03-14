import Link from "next/link"
import React, { FunctionComponent } from "react"
import { PlaylistReference } from "../types"

const OptionButton: FunctionComponent<{
  option: PlaylistReference
}> = ({ option }) => (
  <li className="stack">
    <Link href={{ pathname: "/playlist", query: { id: option.id } }}>
      <a>{option.name}</a>
    </Link>
  </li>
)

export const PlaylistChooseCard: FunctionComponent<{
  options: readonly PlaylistReference[]
}> = ({ options }) => {
  return (
    <>
      <style jsx>{`
        ul {
          margin: 0;
        }
        .small-font {
          font-size: 0.8em;
        }
      `}</style>
      <div className="card full flex one center">
        <h3>Choose the list you want to convert:</h3>
        <div className="flex one two-500">
          <ul>
            {options.map((option, i) => (
              <OptionButton key={i} option={option} />
            ))}
          </ul>
        </div>
      </div>
      <div className="card small-font">
        <p>
          If you want the podcast of another playlist from that user, you can
          paste the link of that playlist instead.
        </p>
      </div>
    </>
  )
}
