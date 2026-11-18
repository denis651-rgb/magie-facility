import { headers } from "next/headers";
import { isLocale } from "@/i18n/config";
import { publicMenu, publicLanguageRoutes } from "@/lib/public-pages";
import PublicHeader from "@/components/layout/PublicHeader";
import { companyContact } from "@/lib/public-services";
import "./services.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MAGIE FACILITY SERVICE C&D",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const [company, menu, languageRoutes] = await Promise.all([
    companyContact(),
    publicMenu(),
    publicLanguageRoutes(),
  ]);
  const phone = company.whatsapp.replace(/\D/g, "");
  const requestedLocale = (await headers()).get("x-magie-locale") || "es";
  const locale = isLocale(requestedLocale) ? requestedLocale : "es";
  return (
    <html lang={locale}>
      <body>
        <PublicHeader
          name={company.name}
          phone={/^[1-9]\d{6,14}$/.test(phone) ? phone : undefined}
          menu={menu}
          languageRoutes={languageRoutes}
        />
        {children}
      </body>
    </html>
  );
}
