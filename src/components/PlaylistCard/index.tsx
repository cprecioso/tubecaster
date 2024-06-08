import { PlaylistData } from "../../api/types";
import { CopyLink } from "./CopyLink";

export const PlaylistCard = ({ data }: { data: PlaylistData }) => (
  <div>
    <header>
      <img src={data.thumbnail} />
      <h3>
        <a href={data.playlistLink}>{data.title}</a>
      </h3>
      <h4>
        from <a href={data.channelLink}>{data.channelTitle}</a>
      </h4>
    </header>
    <main>
      <CopyLink url={`/api/feed/${data.playlistId}`} />
    </main>
  </div>
);
