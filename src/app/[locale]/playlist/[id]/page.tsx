import requestPlaylistData from "../../../../api/playlist";
import { PlaylistCard } from "../../../../components/PlaylistCard";
import { Locale } from "../../../../locale";

export type Params = {
  locale: Locale;
  id: string;
};

export default async function PlaylistPage({
  params: { id },
}: {
  params: Params;
}) {
  const playlistData = await requestPlaylistData(id);
  return <PlaylistCard data={playlistData} />;
}
