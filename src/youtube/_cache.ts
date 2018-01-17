import * as NodeCache from "node-cache"

const disableCache = process.env.CACHE === "no"

const cache = new NodeCache()

function createKey(domain: string, key: string) {
  return `${domain}#${key}`
}

export async function set<T>(domain: string, key: string, val: T, ttl: number) {
  if (disableCache) return val
  await new Promise((f, r) => {
    cache.set<T>(
      createKey(domain, key),
      val,
      ttl || 0,
      (err, success) => (err ? r(err) : f())
    )
  })
  return val
}

export async function get<T>(domain: string, key: string) {
  if (disableCache) return undefined
  return new Promise<T | undefined>((f, r) => {
    cache.get<T>(createKey(domain, key), (err, val) => (err ? r(err) : f(val)))
  })
}

export async function attempt<T>(
  domain: string,
  key: string,
  fn: () => T,
  ttl: number
) {
  return (await get<T>(domain, key)) || (await set(domain, key, fn(), ttl))
}
