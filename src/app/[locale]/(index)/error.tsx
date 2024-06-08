"use client";

import { useParams } from "next/navigation";
import { ErrorCard } from "../../../components/ErrorCard";
import IndexPage, { Params } from "./page";

export default function ErrorPage({ error }: { error: Error }) {
  const params = useParams<Params>();

  return (
    <>
      <IndexPage params={params} />
      <ErrorCard error={error.message} />
    </>
  );
}
