"use server";

import { redirect } from "next/navigation";
import assert from "node:assert/strict";
import * as z from "zod";
import * as zfd from "zod-form-data";
import { youtubeUrlToTubecasterUrl } from "../../../api/youtube-urls";

const SearchFormSchema = zfd.formData({
  url: zfd.text().pipe(z.string().url()),
});

export const handleSearchForm = async (formData: FormData) => {
  "use server";

  const { url } = SearchFormSchema.parse(formData);
  const redirectUrl = youtubeUrlToTubecasterUrl(url);
  assert(redirectUrl);
  redirect(redirectUrl);
};
