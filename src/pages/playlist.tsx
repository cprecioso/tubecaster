import { GetServerSideProps, NextPage } from "next"
import React from "react"
import { PlaylistCard } from "../components/PlaylistCard"
import requestPlaylistData from "../playlist"
import { PlaylistData } from "../types"

type Props = {
  playlistData: PlaylistData
}

const PlaylistPage: NextPage<Props> = ({ playlistData }) => (
  <PlaylistCard data={playlistData} />
)
export default PlaylistPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string
  const playlistData: PlaylistData = {
    ...(await requestPlaylistData(id)),
    items: [],
  }
  const props: Props = { playlistData }
  return { props }
}
