export const locales = ["es", "de", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  de: "Alemán",
  fr: "Francés",
  it: "Italiano",
};
