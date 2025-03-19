import { PlaylistChooseCard } from "@/components/PlaylistChooseCard";
import { ChannelReference, VideoCollectionType } from "@/lib/types";
import { channelReferenceToPlaylistReferences } from "@/lib/youtube-urls";
import { Locale } from "@/locale";

export type Params = {
  locale: Locale;
  id: string;
};

export default async function PlaylistChoosePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, id } = await params;

  const channelReference: ChannelReference = {
    type: VideoCollectionType.Channel,
    id,
  };

  const playlistReferences =
    channelReferenceToPlaylistReferences(channelReference);

  return <PlaylistChooseCard locale={locale} options={playlistReferences} />;
}
