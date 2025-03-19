import * as cheerio from "cheerio";
import assert from "node:assert/strict";

export const fetchCanonicalYoutubeUrl = async (url: string) => {
  const body = await (await fetch(url)).text();
  const $ = cheerio.load(body);
  const href = $("link[rel='canonical']").attr("href");
  assert(href, "Canonical URL not found");
  return href;
};
