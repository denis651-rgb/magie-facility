import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { locales, type Locale } from "@/i18n/config";
import {
  mainRoutes,
  pagePath,
  servicePath,
  serviceSegments,
  type MenuEntry,
  type LanguagePaths,
} from "./menu-routes";

function localized(value: unknown, locale: Locale): string {
  if (typeof value === "string") return locale === "es" ? value : "";
  if (!value || typeof value !== "object") return "";
  const text = (value as Record<string, unknown>)[locale];
  return typeof text === "string" ? text : "";
}
const navigationData = cache(async () => {
  const payload = await getPayload({ config });
  const [navigation, pages] = await Promise.all([
    payload.findGlobal({
      slug: "navigation",
      locale: "all",
      fallbackLocale: false,
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: "pages",
      locale: "all",
      fallbackLocale: false,
      overrideAccess: true,
      draft: false,
      depth: 0,
      pagination: false,
      where: { _status: { equals: "published" } },
    }),
  ]);
  const homeID =
    typeof navigation.homePage === "object"
      ? navigation.homePage?.id
      : navigation.homePage;
  return { navigation, pages: pages.docs, homeID };
});
export async function publicPage(slug: string, locale: Locale) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: true,
    depth: 1,
    limit: 1,
    where: {
      and: [{ _status: { equals: "published" } }, { slug: { equals: slug } }],
    },
  });
  const page = result.docs[0];
  return page?.title && page.slug ? page : undefined;
}
export async function publicMenu(): Promise<MenuEntry[]> {
  const { navigation, pages, homeID } = await navigationData();
  if (navigation.menuItems == null)
    return mainRoutes.map((route) => ({
      ...route,
      key: route.value,
      section: route.value,
    }));
  return navigation.menuItems.flatMap((item, index) => {
    const route = mainRoutes.find((route) => route.value === item.destination);
    const id = typeof item.page === "object" ? item.page?.id : item.page;
    const page = pages.find((page) => page.id === id);
    if (!page && (!route || item.page)) return [];
    const paths: LanguagePaths = {};
    for (const locale of locales) {
      if (page) {
        const slug = localized(page.slug, locale);
        if (slug && localized(page.title, locale))
          paths[locale] =
            page.id === homeID ? "/" + locale : pagePath(locale, slug);
      } else if (route) paths[locale] = route[locale];
    }
    const label = (locale: Locale) =>
      localized(item.menuLabel, locale) ||
      (page
        ? localized(page.title, locale)
        : route![
            (
              {
                es: "labelES",
                de: "labelDE",
                fr: "labelFR",
                it: "labelIT",
              } as const
            )[locale]
          ]);
    return [
      {
        ...paths,
        key: item.id || String(index),
        section: item.destination || undefined,
        labelES: label("es"),
        labelDE: label("de"),
        labelFR: label("fr"),
        labelIT: label("it"),
      },
    ];
  });
}
export async function publicLanguageRoutes(): Promise<LanguagePaths[]> {
  const { pages, homeID } = await navigationData();
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: "services",
    locale: "all",
    fallbackLocale: false,
    overrideAccess: true,
    draft: false,
    depth: 0,
    pagination: false,
    where: { _status: { equals: "published" } },
  });
  const groups: LanguagePaths[] = [];
  for (const page of pages) {
    const paths: LanguagePaths = {};
    const canonical: LanguagePaths = {};
    for (const locale of locales) {
      const slug = localized(page.slug, locale);
      if (slug && localized(page.title, locale)) {
        canonical[locale] = pagePath(locale, slug);
        paths[locale] = page.id === homeID ? "/" + locale : canonical[locale];
      }
    }
    groups.push(paths);
    if (page.id === homeID) groups.push(canonical);
  }
  for (const service of services.docs) {
    const paths: LanguagePaths = {};
    for (const locale of locales) {
      const slug = localized(service.slug, locale);
      if (slug && localized(service.title, locale))
        paths[locale] = servicePath(locale, slug);
    }
    groups.push(paths);
  }
  return [...groups, ...mainRoutes];
}
export async function publicCatalogPath(
  locale: Locale = "es",
): Promise<string> {
  const { navigation, pages, homeID } = await navigationData();
  const items = navigation.menuItems || [];
  const preferred = items.find((item) => item.destination === "services");
  for (const item of preferred
    ? [preferred]
    : items.filter((item) => item.page)) {
    const id = typeof item.page === "object" ? item.page?.id : item.page;
    const page = pages.find((page) => page.id === id && page.showServices);
    if (page && localized(page.title, locale) && localized(page.slug, locale))
      return page.id === homeID
        ? "/" + locale
        : pagePath(locale, localized(page.slug, locale));
  }
  return "/" + locale + "/" + serviceSegments[locale];
}
