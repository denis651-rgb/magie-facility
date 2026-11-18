"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  mainRoutes as routes,
  menuLabel,
  type LanguagePaths,
  type MenuEntry,
} from "@/lib/menu-routes";

import { isLocale, locales } from "@/i18n/config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { publicMessages } from "@/i18n/public-messages";

export default function PublicHeader({
  name,
  phone,
  menu,
  languageRoutes,
}: {
  name: string;
  phone?: string;
  menu: MenuEntry[];
  languageRoutes: LanguagePaths[];
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : "es";
  const t = publicMessages[locale];
  const whatsapp = phone ? buildWhatsAppUrl(phone, t.quoteMessage) : undefined;
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const [open, setOpen] = useState(false);
  const current = menu.find(
    (route) =>
      pathname === route[locale] ||
      (route[locale] !== undefined &&
        route.es !== "/es" &&
        pathname.startsWith(route[locale] + "/")),
  );
  const alternatives = languageRoutes.find(
    (group) => group[locale] === pathname,
  );
  return (
    <header className="public-header">
      <div className="public-header__inner">
        <Link
          href={"/" + locale}
          className="public-brand"
          onClick={() => setOpen(false)}
          aria-label={name + " · " + t.home}
        >
          <img src="/images/magie-logo.jpg" alt="" width={66} height={66} />
          <span>
            <strong>MAGIE</strong>
            <small>FACILITY SERVICE C&amp;D</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="public-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? t.close : t.menu}{" "}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div
          id="public-navigation"
          className={"public-navigation" + (open ? " is-open" : "")}
        >
          <nav aria-label={t.mainNavigation}>
            {menu
              .filter((route) => route[locale])
              .map((route) => (
                <Link
                  key={route.key}
                  href={route[locale]!}
                  aria-current={current === route ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {menuLabel(route, locale)}
                </Link>
              ))}
          </nav>
          <div className="header-actions">
            <nav className="language-switch" aria-label={t.language}>
              {locales.map((code) =>
                alternatives?.[code] ? (
                  <Link
                    key={code}
                    href={alternatives[code]!}
                    lang={code}
                    hrefLang={code}
                    aria-current={locale === code ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {code.toUpperCase()}
                  </Link>
                ) : (
                  <span
                    key={code}
                    aria-disabled="true"
                    title={t.unavailableTranslation}
                  >
                    {code.toUpperCase()}
                  </span>
                ),
              )}
            </nav>
            <a
              className="header-quote"
              href={whatsapp || routes[4][locale]}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
            >
              {t.quote} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
