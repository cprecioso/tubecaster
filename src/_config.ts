export const PORT = parseInt(process.env.TUBECASTER_PORT as string) || 8080

export const CACHE = process.env.TUBECASTER_CACHE !== "no"

export const CACHE_FRONTEND_HOME_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_FRONTEND_HOME_SECONDS as string) ||
  86400

export const CACHE_FRONTEND_PLAYLIST_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_FRONTEND_PLAYLIST_SECONDS as string) ||
  86400

export const CACHE_PODCAST_SECONDS =
  parseInt(process.env.TUBECASTER_CACHE_PODCAST_SECONDS as string) || 7140
