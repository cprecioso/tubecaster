import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import {
  ChannelReference,
  PlaylistReference,
  VideoCollectionType,
} from "../../api/types"
import { channelReferenceToPlaylistReferences } from "../../api/youtube-urls"
import { PlaylistChooseCard } from "../../components/PlaylistChooseCard"

type Props = {
  playlistReferences: PlaylistReference[]
}

type Params = { id: string }

const PlaylistChoosePage: NextPage<Props> = ({ playlistReferences }) => (
  <PlaylistChooseCard options={playlistReferences} />
)
export default PlaylistChoosePage

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id
  if (!id) throw new Error("Channel ID not found")

  const channelReference: ChannelReference = {
    type: VideoCollectionType.Channel,
    id,
  }
  const playlistReferences = channelReferenceToPlaylistReferences(
    channelReference
  )

  const props: Props = { playlistReferences }
  return { props }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
})
