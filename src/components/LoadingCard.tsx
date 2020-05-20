import Head from "next/head"
import React from "react"

export const LoadingCard: React.FunctionComponent = () => (
  <>
    <div className="card flex one center">Loading...</div>
    <Head>
      <noscript>
        <meta key="refresh" httpEquiv="refresh" content="3" />
      </noscript>
    </Head>
  </>
)
