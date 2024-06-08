import { ChannelReference, VideoCollectionType } from "../../../../api/types";
import { channelReferenceToPlaylistReferences } from "../../../../api/youtube-urls";
import { PlaylistChooseCard } from "../../../../components/PlaylistChooseCard";

export type Params = {
  id: string;
  locale: string;
};

export default function PlaylistChoosePage({
  params: { id },
}: {
  params: Params;
}) {
  const channelReference: ChannelReference = {
    type: VideoCollectionType.Channel,
    id,
  };

  const playlistReferences =
    channelReferenceToPlaylistReferences(channelReference);

  return <PlaylistChooseCard options={playlistReferences} />;
}
