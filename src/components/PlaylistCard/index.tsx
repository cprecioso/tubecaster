import { Box, Card, Flex, Inset, Link, Text } from "@radix-ui/themes";
import { PlaylistData } from "../../api/types";
import * as styles from "./styles.css";

export type PlaylistCardData = Pick<
  PlaylistData,
  "thumbnail" | "title" | "playlistLink" | "channelTitle" | "channelLink"
>;

export const PlaylistCard = ({ data }: { data: PlaylistCardData }) => (
  <Card>
    <Flex gap="4">
      <Box width="30%">
        <Inset side="left" clip="padding-box">
          <img
            className={styles.coverImage}
            src={data.thumbnail}
            alt={`Cover for ${data.title}`}
          />
        </Inset>
      </Box>

      <Flex direction="column" justify="center">
        <Text as="p" weight="bold" size="5">
          <Link href={data.playlistLink}>{data.title}</Link>
        </Text>

        <Text as="p">
          from{" "}
          <Link weight="medium" href={data.channelLink}>
            {data.channelTitle}
          </Link>
        </Text>
      </Flex>
    </Flex>
  </Card>
);
