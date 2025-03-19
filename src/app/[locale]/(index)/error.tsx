"use client";

import { ErrorCard } from "@/components/ErrorCard";
import IndexPage, { Params } from "./page";

export default function ErrorPage({
  error,
  params,
}: {
  error: Error;
  params: Promise<Params>;
}) {
  return (
    <>
      <IndexPage params={params} />
      <ErrorCard error={error.message} />
    </>
  );
}
