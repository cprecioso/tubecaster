import React from "react"

export default () => (
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
    >
      <div className="full two-third-500 three-fourth-700">
        <input type="url" name="url" placeholder="YouTube URL" />
      </div>
      <div className="full third-500 fourth-700">
        <button className="full" type="submit">
          Get podcast
        </button>
      </div>
    </form>

    <div className="full card small-font">
      <p>
        Just paste the link to a YouTube channel or playlist in the box above.
        Tubecaster will convert it to a video podcast you can listen to with
        your favorite podcast app.
      </p>
      <p>
        No ads. No comments. If your podcast app supports it, you can download
        the videos for later or watch them while on the background. Remember to
        support your favourite channels though!
      </p>
    </div>
  </>
)
