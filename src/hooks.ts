import React from "react"

export const useClientSideValue = <T>(
  fn: () => T,
  deps?: React.DependencyList
): T | undefined => {
  const [value, setValue] = React.useState(undefined as T | undefined)

  React.useEffect(() => {
    if (process.browser) setValue(fn())
  }, deps)

  return value
}
