import { yt } from "@/lib/youtube";
import assert from "node:assert/strict";

export const fetchYoutubeChannelId = async (url: string) => {
  const endpoint = await yt.resolveURL(url);
  const browseId: unknown = endpoint.payload?.browseId;
  assert(
    typeof browseId === "string" && browseId.startsWith("UC"),
    "Couldn't resolve channel ID",
  );
  return browseId;
};
