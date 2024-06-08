import { PlaylistChooseCard } from "@/components/PlaylistChooseCard";
import { ChannelReference, VideoCollectionType } from "@/lib/types";
import { channelReferenceToPlaylistReferences } from "@/lib/youtube-urls";
import { Locale } from "@/locale";

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
