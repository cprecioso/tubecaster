require("dotenv").config()

export const PORT = parseInt(process.env.TUBECASTER_PORT as string) || 8080

export const API_KEY = (() => {
  const key = process.env.TUBECASTER_YOUTUBE_API_KEY as string | undefined
  if (!key) throw new Error("process.env.TUBECASTER_YOUTUBE_API_KEY is needed")
  return key
})()

export const ITEMS_PER_PODCAST =
  parseInt(process.env.TUBECASTER_ITEMS_PER_PODCAST as string) || 50

export const CACHE = process.env.TUBECASTER_CACHE !== "no"

export const CACHE_FRONTEND_HOME_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_FRONTEND_HOME_SECONDS as string) ||
  86400

export const CACHE_FRONTEND_PLAYLIST_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_FRONTEND_PLAYLIST_SECONDS as string) ||
  86400

export const CACHE_PODCAST_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_PODCAST_SECONDS as string) || 7140

export const CACHE_API_PLAYLIST_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_API_PLAYLIST_SECONDS as string) || 14340

export const CACHE_API_PLAYLISTITEMS_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_API_PLAYLISTITEMS_SECONDS as string) ||
  7140
