"use client";

import { Button, Inset, TextField } from "@radix-ui/themes";
import { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

const SearchFieldInput = () => {
  const { pending } = useFormStatus();

  return (
    <TextField.Root
      size="3"
      type="url"
      name="url"
      placeholder="YouTube URL"
      disabled={pending}
      required
    >
      <TextField.Slot side="right">
        <Inset side="right">
          <Button type="submit" size="1" loading={pending}>
            Get podcast
          </Button>
        </Inset>
      </TextField.Slot>
    </TextField.Root>
  );
};

const SearchField = ({
  action,
}: {
  action: ComponentPropsWithoutRef<"form">["action"];
}) => (
  <form action={action}>
    <SearchFieldInput />
  </form>
);

export default SearchField;
