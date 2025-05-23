import { route } from "@/lib/util";
import { ALLOWED_LOCALES } from "@/locale";
import { Box, Container, Flex, Heading, Link, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = { title: "Tubecaster" };

type Params = {
  locale: string;
};

export const dynamicParams = false;
export const generateStaticParams = async (): Promise<Params[]> =>
  Array.from(ALLOWED_LOCALES, (locale) => ({ locale }));

export default async function RootLayout({
  children,
  params,
}: {
  params: Promise<Params>;
  children: ReactNode;
}) {
  const { locale } = await params;
  if (!ALLOWED_LOCALES.has(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />

      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="ruby" radius="small">
            <Container size="2">
              <Flex direction="column" gap="3">
                <header>
                  <Flex gap="3" align={"baseline"} wrap="wrap">
                    <Heading as="h1" size="8">
                      <NextLink
                        href={route(`/${locale}`)}
                        prefetch={false}
                        passHref
                        legacyBehavior
                      >
                        <Link>Tubecaster</Link>
                      </NextLink>
                    </Heading>

                    <Heading as="h2" size="4" weight="regular">
                      Turn YouTube playlists and channels into video podcasts
                    </Heading>
                  </Flex>
                </header>

                <main>{children}</main>

                <footer>
                  <Flex justify="between" wrap="wrap">
                    <Box as="span">
                      Made by{" "}
                      <Link href="https://precioso.design">
                        Carlos Precioso
                      </Link>
                    </Box>

                    <Box as="span">
                      <Link href="https://github.com/cprecioso/tubecaster">
                        Source code
                      </Link>
                    </Box>
                  </Flex>
                </footer>
              </Flex>
            </Container>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
