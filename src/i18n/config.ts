export const locales = ['es', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value)
}
