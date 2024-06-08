"use client";

import { ErrorCard } from "../../../components/ErrorCard";
import IndexPage, { Params } from "./page";

export default function ErrorPage({
  params,
  error,
}: {
  params: Params;
  error: Error;
}) {
  return (
    <>
      <IndexPage params={params} />
      <ErrorCard error={error.message} />
    </>
  );
}
