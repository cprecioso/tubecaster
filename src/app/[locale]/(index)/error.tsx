"use client";

import { ErrorCard } from "../../../components/ErrorCard";
import IndexPage from "./page";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <>
      <IndexPage />
      <ErrorCard error={error.message} />
    </>
  );
}
