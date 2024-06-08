import { PlaylistData } from "../../api/types";
import { CopyLink } from "./CopyLink";

export const PlaylistCard = ({ data }: { data: PlaylistData }) => (
  <div className="card flex one center">
    <header className="full">
      <img className="full" src={data.thumbnail} />
      <h3>
        <a href={data.playlistLink}>{data.title}</a>
      </h3>
      <h4>
        from <a href={data.channelLink}>{data.channelTitle}</a>
      </h4>
    </header>
    <main className="full">
      <CopyLink playlistId={data.playlistId} />
    </main>
  </div>
);
