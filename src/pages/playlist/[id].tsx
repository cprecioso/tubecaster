import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { LoadingCard } from "../../components/LoadingCard"
import { PlaylistCard } from "../../components/PlaylistCard"
import requestPlaylistData from "../../playlist"
import { PlaylistData } from "../../types"

type Props = {
  playlistData: PlaylistData
}

type Params = { id: string }

const PlaylistPage: NextPage<Props> = ({ playlistData }) => {
  const router = useRouter()

  return router.isFallback ? (
    <LoadingCard />
  ) : (
    <PlaylistCard data={playlistData!} />
  )
}
export default PlaylistPage

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id
  if (!id) throw new Error("Can't find id")

  const props = {
    playlistData: { ...(await requestPlaylistData(id)), items: [] },
  }
  return { props }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
})
