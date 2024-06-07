import { OutgoingHttpHeaders } from "http";
import { NextApiHandler } from "next";
import { youtubeUrlToTubecasterUrl } from "../../api/youtube-urls/deep";

type Query = { url: string };

export default <NextApiHandler>(async (req, res) => {
  const inputUrl = (req.query as Partial<Query>).url;

  const cacheHeaders: OutgoingHttpHeaders = {
    "Cache-Control": "maxage=86400, immutable",
  };

  if (inputUrl) {
    try {
      const redirectUrl = await youtubeUrlToTubecasterUrl(inputUrl);
      if (redirectUrl) {
        return res
          .writeHead(301, { Location: redirectUrl.as, ...cacheHeaders })
          .end();
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  return res.writeHead(302, { Location: `/`, ...cacheHeaders }).end();
});
