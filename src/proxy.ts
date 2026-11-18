import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./i18n/config";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];
  const headers = new Headers(request.headers);
  headers.set("x-magie-locale", isLocale(segment) ? segment : "es");
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: ["/", "/es/:path*", "/de/:path*", "/fr/:path*", "/it/:path*"],
};
