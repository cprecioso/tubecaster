import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import requestCanonicalPlaylists from "../canonical"
import { LoadingCard } from "../components/LoadingCard"
import { PlaylistChooseCard } from "../components/PlaylistChooseCard"
import { PlaylistReference } from "../types"

type Props = {
  playlistReferences: PlaylistReference[]
}

const PlaylistChoosePage: NextPage<Props> = ({ playlistReferences }) => {
  const router = useRouter()

  const playlists = playlistReferences
  useEffect(() => {
    if (playlists.length === 1 && process.browser) {
      const [{ id }] = playlists
      router.push({
        pathname: "/playlist",
        query: { id },
      })
    }
  }, [playlists.length])

  return playlists.length === 1 ? (
    <LoadingCard />
  ) : (
    <PlaylistChooseCard options={playlistReferences} />
  )
}
export default PlaylistChoosePage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const url = query.url as string

  if (!url) throw new Error("URL not found")
  const playlistReferences = await requestCanonicalPlaylists(url)
  const props: Props = { playlistReferences }
  return { props }
}
