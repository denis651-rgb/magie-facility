import type { Locale } from "./config";
export const messages: Record<
  Locale,
  { services: string; contact: string; quote: string }
> = {
  es: {
    services: "Servicios",
    contact: "Contacto",
    quote: "Solicitar cotización",
  },
  fr: { services: "Services", contact: "Contact", quote: "Demander un devis" },
  it: {
    services: "Servizi",
    contact: "Contatti",
    quote: "Richiedi un preventivo",
  },
  de: {
    services: "Dienstleistungen",
    contact: "Kontakt",
    quote: "Offerte anfragen",
  },
};
