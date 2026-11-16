import type { Locale } from './config'
export const messages: Record<Locale, { services: string; contact: string; quote: string }> = {
  es: { services: 'Servicios', contact: 'Contacto', quote: 'Solicitar cotización' },
  de: { services: 'Dienstleistungen', contact: 'Kontakt', quote: 'Offerte anfragen' },
}
