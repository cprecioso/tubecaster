import { Flex } from "@radix-ui/themes";
import requestPlaylistData from "../../../../api/playlist";
import { CopyLinkCard } from "../../../../components/CopyLinkCard";
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

  return (
    <Flex direction="column" gap="3">
      <PlaylistCard data={playlistData} />

      <CopyLinkCard url={`/api/feed/${playlistData.playlistId}`} />
    </Flex>
  );
}
