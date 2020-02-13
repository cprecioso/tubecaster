import redirect from "micro-redirect"
import { NextApiRequest, NextApiResponse } from "next"
import ytdl from "ytdl-core"

export type Request = { id: string }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "HEAD":
    case "GET":
      break

    default:
      return res.status(405).send("Only allowed GET and HEAD")
  }

  try {
    const reqData = req.query as Request
    const info = await ytdl.getInfo(reqData.id)

    const chosenFormat = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: format =>
        format.container === "mp4" && (format.audioChannels ?? 0) > 0
    })

    if (chosenFormat instanceof Error) throw chosenFormat

    redirect(res, 302, chosenFormat.url)
  } catch (error) {
    res.status(500).send("" + error)
    throw error
  }
}
