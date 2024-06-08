import { Card, Skeleton } from "@radix-ui/themes";

export const LoadingCard = () => (
  <Skeleton loading>
    <Card />
  </Skeleton>
);
