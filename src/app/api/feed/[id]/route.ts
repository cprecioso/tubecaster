import { Route } from "next";
import { NextRequest, NextResponse } from "next/server";
import createFeed from "../../../../api/create-feed";
import requestPlaylistData from "../../../../api/playlist";

export type Params = {
  id: string;
};

const coerceUrl = <T extends string>(route: Route<T>) => route;

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: Params },
) => {
  const { href } = req.nextUrl;

  const playlistData = await requestPlaylistData(id);

  const feed = createFeed(
    href,
    (id) => ({
      url: new URL(coerceUrl(`/api/play/${id}`), href).href,
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