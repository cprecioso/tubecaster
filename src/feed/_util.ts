import * as YT from "../youtube/_types";

export function chooseBiggestThumbnail(thumbnails: YT.Thumbnail.List) {
  let chosen: YT.Thumbnail = {
    url: "",
    width: 0,
    height: 0
  };
  for (const name in thumbnails) {
    const thumbnail = thumbnails[name];
    if (thumbnail.height > chosen.height || thumbnail.width > chosen.width) {
      chosen = thumbnail;
    }
  }
  return chosen;
}
