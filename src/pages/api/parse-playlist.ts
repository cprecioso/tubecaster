import { NextApiHandler } from "next"
import { youtubeUrlToTubecasterUrl } from "../../api/youtube-urls/deep"

type Query = { url: string }

export default <NextApiHandler>(async (req, res) => {
  const inputUrl = (req.query as Partial<Query>).url

  if (inputUrl) {
    try {
      const redirectUrl = await youtubeUrlToTubecasterUrl(inputUrl)
      if (redirectUrl) {
        return res.writeHead(301, { Location: redirectUrl.as }).end()
      }
    } catch (error) {
      return res.writeHead(500).json({ error })
    }
  }

  return res.writeHead(302, { Location: `/` }).end()
})
