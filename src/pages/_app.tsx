import App from "next/app"
import Head from "next/head"
import "picnic"
import React from "react"
import "../styles/main.less"

export default class Tubecaster extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Tubecaster</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <header>
          <h1 className="full">
            <a href="/">Tubecaster</a>
          </h1>
          <h2 className="full">
            Turn YouTube playlists and channels into video podcasts
          </h2>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
        <footer className="flex one two-500">
          <span>
            Made by <a href="https://carlosprecioso.com">Carlos Precioso</a>
          </span>
          <span>
            <a href="https://github.com/cprecioso/tubecaster">Source</a>
          </span>
        </footer>
      </>
    )
  }
}
