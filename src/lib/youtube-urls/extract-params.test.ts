import { expect, it } from "vitest";
import { VideoCollectionType } from "../types";
import { extractParamsFromYoutubeUrl } from "./extract-params";

it.each(
  [
    ["/@foo", "username"],
    ["/@foo/", "username"],
    ["/user/foo", "username"],
    ["/user/foo/", "username"],
    ["/user/foo/videos", "username"],
    ["/user/foo/videos/", "username"],
    ["/c/foo", "username"],
    ["/c/foo/", "username"],
    ["/c/foo/videos", "username"],
    ["/c/foo/videos/", "username"],
    ["/channel/foo", VideoCollectionType.Channel],
    ["/channel/foo/", VideoCollectionType.Channel],
    ["/channel/foo/videos", VideoCollectionType.Channel],
    ["/channel/foo/videos/", VideoCollectionType.Channel],
    ["/playlist?list=foo", VideoCollectionType.Playlist],
    ["/watch?v=video&list=foo", VideoCollectionType.Playlist],
    ["/anything/at/all?list=foo", VideoCollectionType.Playlist],
  ].flatMap(([path, type]) =>
    ["", "m.", "www."].flatMap((subdomain) =>
      ["http", "https"].map((protocol) => [
        `${protocol}://${subdomain}youtube.com${path}`,
        type,
      ]),
    ),
  ),
)("correctly identifies %s as a %s", (input, type) => {
  expect(extractParamsFromYoutubeUrl(input)).toMatchObject({ type, id: "foo" });
});
