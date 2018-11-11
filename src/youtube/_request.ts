import got from "got"
import QuickLRU from "quick-lru"

const createCache = (maxSize = 10000) => new QuickLRU({ maxSize })

export const client = (got as (typeof got) & {
  extend(opts: got.GotOptions<string>): typeof got
}).extend({ cache: createCache() })
