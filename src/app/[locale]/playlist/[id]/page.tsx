import { CopyLinkCard } from "@/components/CopyLinkCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import requestPlaylistData from "@/lib/playlist";
import { route } from "@/lib/util";
import { Locale } from "@/locale";
import { Flex } from "@radix-ui/themes";

export type Params = {
  locale: Locale;
  id: string;
};

export default async function PlaylistPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const playlistData = await requestPlaylistData(id);

  return (
    <Flex direction="column" gap="3">
      <PlaylistCard data={playlistData} />

      <CopyLinkCard url={route(`/api/feed/${playlistData.playlistId}`)} />
    </Flex>
  );
}
