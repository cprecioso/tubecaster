import { yt } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";
import assert from "node:assert/strict";

export type Params = { id: string };

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<Params> },
) => {
  const { id } = await params;

  const data = await yt.getStreamingData(id, {
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
