"use server";

import { youtubeUrlToTubecasterUrl } from "@/lib/youtube-urls";
import { Locale } from "@/locale";
import { redirect } from "next/navigation";
import assert from "node:assert/strict";
import * as z from "zod";
import * as zfd from "zod-form-data";

const SearchFormSchema = zfd.formData({
  url: zfd.text().pipe(z.string().url()),
});

export const handleSearchForm = async (locale: Locale, formData: FormData) => {
  "use server";

  const { url } = SearchFormSchema.parse(formData);
  const redirectUrl = youtubeUrlToTubecasterUrl(locale, url);
  assert(redirectUrl);
  redirect(redirectUrl);
};
