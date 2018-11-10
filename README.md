# tubecaster

Turn your favourite playlists into video podcasts

> Be aware that if you watch the videos through your podcast player and not through the offical YouTube players, you might be breaking YouTube's ToS. Proceed at your own caution.

> You need a YouTube Data API server key for this to work, you can [get it in Google's Developer Console](https://console.developers.google.com/apis/library/youtube.googleapis.com/).

## What is this?

**tubecatcher** creates a video podcast from a YouTube playlist. Then you can take advantage of your podcast app's abilities such as played / not played markers, downloading episodes and more.

## Installation as a server

Rename `sample.env` to `.env` and fill it out. Run locally (`yarn` and `yarn start`) or deploy to a provider of your choice (recommended). Only tested in [now](https://now.sh).
Open the address of your server and the web interface will guide you.

## Installation as a dependency

```sh
npm install tubecaster
```

Exposes two [express apps](https://expressjs.com) that you can mount on your own app. Please take care of having the required environment variables (look in [`sample.env`](./sample.env)).

- front-end server at `tubecaster.web`
- podcast server at `tubecaster.podcast`
