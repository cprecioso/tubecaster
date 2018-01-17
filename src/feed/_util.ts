import * as Types from "../youtube/types"

export function chooseBiggestThumbnail(thumbnails: Types.Thumbnail.List) {
  let chosen: Types.Thumbnail = {
    url: "",
    width: 0,
    height: 0
  }
  for (const name in thumbnails) {
    const thumbnail = thumbnails[name]
    if (thumbnail.height > chosen.height || thumbnail.width > chosen.width) {
      chosen = thumbnail
    }
  }
  return chosen
}
