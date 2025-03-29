import { NextRequest, NextResponse } from "next/server";
import assert from "node:assert/strict";
import { Innertube } from "youtubei.js";

const client = await Innertube.create({});

export type Params = { id: string };

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<Params> },
) => {
  const { id } = await params;

  const data = await client.getStreamingData(id, {
    type: "video+audio",
    format: "mp4",
    quality: "best",
  });

  assert(data.url, "Video URL not found");

  return NextResponse.redirect(data.url, {
    status: 307,
    headers: {
      "Cache-Control": "no-store",
    },
  });
};
