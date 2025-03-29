import createFeed from "@/lib/create-feed";
import requestPlaylistData from "@/lib/playlist";
import { route } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";

export type Params = {
  id: string;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<Params> },
) => {
  const { id } = await params;
  const { href } = req.nextUrl;

  const playlistData = await requestPlaylistData(id);

  const feed = createFeed(
    href,
    (id) => ({
      url: new URL(route(`/api/play/${id}`), href).href,
      type: "video/mp4",
    }),
    playlistData,
  );

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control":
        /*
          public -> same for every user
          immutable -> do not reload if still fresh
          max-age=14400 -> fresh for 4h
          stale-while-revalidate=86400 -> the next 1d you can keep using your cache
        */
        "public, immutable, max-age=14400, stale-while-revalidate=86400",
    },
  });
};
