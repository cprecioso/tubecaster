import { isArray } from "util"

export function joinWithCommas(val: string | string[]): string
export function joinWithCommas(
  val: string | string[] | undefined,
  fallback: string
): string

export function joinWithCommas(val?: string | string[], fallback?: string) {
  if (!val && fallback) return fallback
  if (isArray(val)) {
    return val.join(",")
  } else {
    return val
  }
}
