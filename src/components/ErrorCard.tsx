import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { FunctionComponent } from "react";

export const ErrorCard: FunctionComponent<{ error: string }> = ({ error }) => (
  <Callout.Root color="ruby">
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>

    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);
