import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export type Params = { id: string };

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<Params> },
) => {
  const { id } = await params;

  const info = await ytdl.getInfo(id);

  const chosenFormat = ytdl.chooseFormat(info.formats, {
    quality: "highest",
    filter: (format) =>
      format.container === "mp4" && (format.audioChannels ?? 0) > 0,
  });

  return NextResponse.redirect(chosenFormat.url, {
    status: 307,
    headers: {
      "Cache-Control": "no-store",
    },
  });
};
