import type { GlobalConfig } from "payload";

import { administratorOnly } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuración del sitio",
  admin: { hideAPIURL: true, group: "Configuración" },
  access: { read: administratorOnly, update: administratorOnly },
  fields: [
    {
      name: "whatsappGreeting",
      label: "Saludo del botón de WhatsApp",
      type: "text",
      localized: true,
      admin: { placeholder: "Hola ¿cómo puedo ayudar?" },
    },
    {
      name: "whatsappWelcome",
      label: "Texto del recuadro de atención",
      type: "textarea",
      localized: true,
      admin: {
        placeholder:
          "Nuestro equipo de atención está aquí para responder a tus preguntas. ¡Cuéntanos qué necesitas!",
      },
    },
    {
      name: "favicon",
      label: "Ícono del sitio",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "whatsappDefaultMessage",
      label: "Mensaje predeterminado de WhatsApp",
      type: "textarea",
      localized: true,
    },
    {
      name: "seoDefaultTitle",
      label: "Título SEO predeterminado",
      type: "text",
      localized: true,
    },
    {
      name: "seoDefaultDescription",
      label: "Descripción SEO predeterminada",
      type: "textarea",
      localized: true,
    },
  ],
};
