import { Suspense } from "react";
import { ChannelReference, VideoCollectionType } from "../../../../api/types";
import { channelReferenceToPlaylistReferences } from "../../../../api/youtube-urls";
import { LoadingCard } from "../../../../components/LoadingCard";
import { PlaylistChooseCard } from "../../../../components/PlaylistChooseCard";

const PlaylistChoosePageContent = async ({ id }: { id: string }) => {
  const channelReference: ChannelReference = {
    type: VideoCollectionType.Channel,
    id,
  };

  const playlistReferences =
    channelReferenceToPlaylistReferences(channelReference);

  return <PlaylistChooseCard options={playlistReferences} />;
};

export default function PlaylistChoosePage({
  params: { id },
}: {
  params: { id: string; locale: string };
}) {
  return (
    <Suspense fallback={<LoadingCard />}>
      <PlaylistChoosePageContent id={id} />
    </Suspense>
  );
}
