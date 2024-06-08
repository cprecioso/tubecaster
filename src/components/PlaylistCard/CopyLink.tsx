"use client";

import { useEffect, useState } from "react";

export const CopyLink = ({ playlistId }: { playlistId: string }) => {
  const [podcastLink, setPodcastLink] = useState({
    url: `/api/podcast?id=${playlistId}`,
    text: "Right click (or hold) to copy the link",
    shoxExtraInfo: false,
  });

  useEffect(
    () =>
      setPodcastLink(({ url }) => {
        const newUrl = new URL(url, window.location.href);
        newUrl.protocol = "podcast";
        return { url: newUrl.href, text: newUrl.href, shoxExtraInfo: true };
      }),
    [],
  );

  return (
    <>
      <a href={podcastLink.url}>
        <pre className="full">{podcastLink.text}</pre>
      </a>
      <p className="full">
        <>Copy the link and paste it into your podcast app.</>
        {podcastLink.shoxExtraInfo ? (
          <>
            {" "}
            You can press and hold (or right-click) the link in order to copy it
            more easily.
          </>
        ) : null}
      </p>
    </>
  );
};
