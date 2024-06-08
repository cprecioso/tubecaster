import { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "picnic";
import { ReactNode } from "react";
import { ALLOWED_LOCALES } from "../../locale";
import "../../styles/global.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = { title: "Tubecaster" };

export default function RootLayout({
  children,
  params: { locale },
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  if (!ALLOWED_LOCALES.has(locale)) notFound();

  return (
    <html lang={locale}>
      <head />

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
