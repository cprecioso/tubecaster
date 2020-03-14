import React, { FunctionComponent } from "react"

export const ErrorCard: FunctionComponent<{ error: string }> = ({ error }) => (
  <pre className="card">{error}</pre>
)
