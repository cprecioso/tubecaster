import { PlaylistReference } from "@/lib/types";
import { Locale } from "@/locale";
import { Card, Flex, Grid, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";

const OptionButton = ({
  locale,
  option,
}: {
  locale: Locale;
  option: PlaylistReference;
}) => (
  <NextLink href={`/${locale}/playlist/${option.id}`} passHref legacyBehavior>
    <Link>
      <Card>
        <Text align="center" as="div">
          {option.name}
        </Text>
      </Card>
    </Link>
  </NextLink>
);

export const PlaylistChooseCard = ({
  locale,
  options,
}: {
  locale: Locale;
  options: readonly PlaylistReference[];
}) => {
  return (
    <Card>
      <Flex gap="2" direction="column">
        <Text weight="bold">Choose the list you want to convert</Text>

        <Grid columns="3" gap="2">
          {options.map((option, i) => (
            <OptionButton key={i} locale={locale} option={option} />
          ))}
        </Grid>

        <Text as="p">
          If you want the podcast of another playlist from that user, you can
          paste the link of that playlist instead.
        </Text>
      </Flex>
    </Card>
  );
};
