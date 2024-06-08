import { ChannelReference, VideoCollectionType } from "../../../../api/types";
import { channelReferenceToPlaylistReferences } from "../../../../api/youtube-urls";
import { PlaylistChooseCard } from "../../../../components/PlaylistChooseCard";
import { Locale } from "../../../../locale";

export type Params = {
  locale: Locale;
  id: string;
};

export default function PlaylistChoosePage({
  params: { locale, id },
}: {
  params: Params;
}) {
  const channelReference: ChannelReference = {
    type: VideoCollectionType.Channel,
    id,
  };

  const playlistReferences =
    channelReferenceToPlaylistReferences(channelReference);

  return <PlaylistChooseCard locale={locale} options={playlistReferences} />;
}
