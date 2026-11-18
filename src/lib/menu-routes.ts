import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";

export const serviceSegments: Record<Locale, string> = {
  es: "servicios",
  de: "dienstleistungen",
  fr: "services",
  it: "servizi",
};
export const projectSegments: Record<Locale, string> = {
  es: "trabajos",
  de: "referenzen",
  fr: "realisations",
  it: "lavori",
};
export const aboutSegments: Record<Locale, string> = {
  es: "nosotros",
  de: "ueber-uns",
  fr: "a-propos",
  it: "chi-siamo",
};
export const contactSegments: Record<Locale, string> = {
  es: "contacto",
  de: "kontakt",
  fr: "contact",
  it: "contatti",
};
export type LanguagePaths = Partial<Record<Locale, string>>;
export type MenuEntry = LanguagePaths & {
  key: string;
  labelES: string;
  labelDE: string;
  labelFR: string;
  labelIT: string;
  section?: string;
};
export function menuLabel(entry: MenuEntry, locale: Locale) {
  return {
    es: entry.labelES,
    de: entry.labelDE,
    fr: entry.labelFR,
    it: entry.labelIT,
  }[locale];
}
export function servicePath(locale: Locale, slug: string) {
  return (
    "/" +
    locale +
    "/" +
    serviceSegments[locale] +
    "/" +
    encodeURIComponent(slug)
  );
}
export function pagePath(locale: Locale, slug: string) {
  return "/" + locale + "/paginas/" + encodeURIComponent(slug);
}
const definitions = [
  { value: "home", paths: { es: "/es", de: "/de", fr: "/fr", it: "/it" } },
  { value: "services", paths: serviceSegments },
  { value: "projects", paths: projectSegments },
  { value: "about", paths: aboutSegments },
  { value: "contact", paths: contactSegments },
] as const;

export const mainRoutes = definitions.map((item) => ({
  value: item.value,
  es: item.value === "home" ? "/es" : "/es/" + item.paths.es,
  de: item.value === "home" ? "/de" : "/de/" + item.paths.de,
  fr: item.value === "home" ? "/fr" : "/fr/" + item.paths.fr,
  it: item.value === "home" ? "/it" : "/it/" + item.paths.it,
  labelES: publicMessages.es[item.value],
  labelDE: publicMessages.de[item.value],
  labelFR: publicMessages.fr[item.value],
  labelIT: publicMessages.it[item.value],
}));
