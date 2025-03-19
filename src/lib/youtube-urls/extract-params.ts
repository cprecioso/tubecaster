import { VideoCollectionType } from "@/lib/types";
import assert from "node:assert/strict";
import "urlpattern-polyfill";

type ExtractorResult =
  | { type: VideoCollectionType; id: string }
  | { type: "username"; id: string };

const EXTRACTORS: ((url: string) => ExtractorResult)[] = [
  (() => {
    const pattern = new URLPattern({
      hostname: "{(www|m).}?youtube.com",
      pathname: "/(@|user/|c/):username{/*}?",
    });

    return (url) => {
      const username = pattern.exec(url)?.pathname.groups.username;
      assert(username, "Missing username in vanity URL");
      return { type: "username", id: username };
    };
  })(),

  (() => {
    const pattern = new URLPattern({
      hostname: "{(www|m).}?youtube.com",
      pathname: "/channel/:id{/*}?",
    });

    return (url) => {
      const channelId = pattern.exec(url)?.pathname.groups.id;
      assert(channelId, "Missing ID in channel URL");
      return { type: VideoCollectionType.Channel, id: channelId };
    };
  })(),

  (() => {
    const pattern = new URLPattern({
      hostname: "{(www|m).}?youtube.com",
    });

    return (url) => {
      const queryRaw = pattern.exec(url)?.search.input;
      assert(queryRaw, "Missing query for playlist URL");
      const query = new URLSearchParams(queryRaw);
      const listId = query.get("list");
      assert(listId, "Missing list query parameter for playlist URL");
      return { type: VideoCollectionType.Playlist, id: listId };
    };
  })(),
];

const tryEach = <T, U>(input: T, fns: ((input: T) => U)[]) => {
  const errors: unknown[] = [];
  for (const fn of fns) {
    try {
      const output = fn(input);
      return { type: "success", output } as const;
    } catch (error) {
      errors.push(error);
    }
  }
  return { type: "error", errors } as const;
};

export const extractParamsFromYoutubeUrl = (url: string) => {
  const result = tryEach(url, EXTRACTORS);
  if (result.type === "error")
    throw new AggregateError(result.errors, "Couldn't parse URL");
  return result.output;
};
