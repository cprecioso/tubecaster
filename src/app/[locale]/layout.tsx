import Link from "next/link";
import "picnic";
import { ReactNode } from "react";
import "../../styles/global.css";

export default function RootLayout({
  children,
  params: { locale },
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  return (
    <html lang={locale}>
      <head>
        <title>Tubecaster</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body>
        <header>
          <h1 className="full">
            <Link href={`/${locale}`} prefetch={false}>
              Tubecaster
            </Link>
          </h1>
          <h2 className="full">
            Turn YouTube playlists and channels into video podcasts
          </h2>
        </header>
        <main>{children}</main>
        <footer className="flex one two-500">
          <span>
            Made by <a href="https://precioso.design">Carlos Precioso</a>
          </span>
          <span>
            <a href="https://github.com/cprecioso/tubecaster">Source</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
