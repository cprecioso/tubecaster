"use client";

import { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CopyLink = <T extends string>({ url }: { url: Route<T> }) => {
  const [ref, setRef] = useState<HTMLAnchorElement | null>(null);
  const fullUrl = ref?.href || url;

  const [showDone, setShowDone] = useState(false);
  useEffect(() => {
    if (!showDone) return;

    const timer = setTimeout(() => setShowDone(false), 2000);
    return () => clearTimeout(timer);
  }, [showDone]);

  return (
    <div className="flex one full">
      <pre>
        <Link href={url} ref={setRef}>
          {fullUrl}
        </Link>
      </pre>

      <button
        onClick={async () => {
          await navigator.clipboard.writeText(fullUrl);
          setShowDone(true);
        }}
      >
        {showDone ? "Done" : "Copy the feed link"}
      </button>
    </div>
  );
};
