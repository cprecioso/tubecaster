import { ReactNode } from "react";

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <div>
        <p>
          Just paste the link to a YouTube channel or playlist in the box above.
          Tubecaster will convert it to a video podcast you can listen to (or
          watch) with your favorite podcast app.
        </p>
        <p>
          No ads. No comments. If your podcast app supports it, you can download
          the videos for later or watch them while on the background. Remember
          to support your favourite channels though!
        </p>
      </div>
    </>
  );
}
