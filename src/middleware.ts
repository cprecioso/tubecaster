import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "./locale";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/" + DEFAULT_LOCALE, request.url));
}

export const config = {
  matcher: "/",
};
