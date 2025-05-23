import { DEFAULT_LOCALE } from "@/locale";
import { NextRequest, NextResponse } from "next/server";
import { route } from "./lib/util";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL(route(`/${DEFAULT_LOCALE}`), request.url),
  );
}

export const config = {
  matcher: "/",
};
