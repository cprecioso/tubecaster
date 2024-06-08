import Link from "next/link";
import { FunctionComponent } from "react";
import { PlaylistReference } from "../../api/types";

const OptionButton: FunctionComponent<{
  option: PlaylistReference;
}> = ({ option }) => (
  <li>
    <Link href={`/playlist/${option.id}`}>{option.name}</Link>
  </li>
);

export const PlaylistChooseCard: FunctionComponent<{
  options: readonly PlaylistReference[];
}> = ({ options }) => {
  return (
    <>
      <div>
        <h3>Choose the list you want to convert:</h3>
        <div>
          <ul>
            {options.map((option, i) => (
              <OptionButton key={i} option={option} />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p>
          If you want the podcast of another playlist from that user, you can
          paste the link of that playlist instead.
        </p>
      </div>
    </>
  );
};
