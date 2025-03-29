"use client";

import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import {
  Card,
  Flex,
  IconButton,
  Inset,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMemo, useSyncExternalStore } from "react";
import { useTimeout } from "./hooks";

const useClientBaseUrl = () =>
  useSyncExternalStore(
    () => () => {},
    () => document.baseURI,
    () => null,
  );

export const CopyLinkCard = ({ url }: { url: string }) => {
  const clientBaseUrl = useClientBaseUrl();

  const fullUrl = useMemo(
    () => (clientBaseUrl ? new URL(url, clientBaseUrl).href : url),
    [url, clientBaseUrl],
  );

  const [isDoneMarked, markDone] = useTimeout(2000);

  return (
    <Card>
      <Flex direction="column" gap="2">
        <Text weight="medium">
          Add the following podcast URL to your preferred app:
        </Text>

        <Inset side="bottom" clip="padding-box">
          <TextField.Root
            value={fullUrl}
            readOnly
            onClick={(e) =>
              e.currentTarget.setSelectionRange(0, fullUrl.length)
            }
          >
            <TextField.Slot side="left">
              <Inset side="left">
                <IconButton
                  onClick={async () => {
                    await navigator.clipboard.writeText(fullUrl);
                    markDone();
                  }}
                >
                  {isDoneMarked ? <CheckIcon /> : <ClipboardCopyIcon />}
                </IconButton>
              </Inset>
            </TextField.Slot>
          </TextField.Root>
        </Inset>
      </Flex>
    </Card>
  );
};
