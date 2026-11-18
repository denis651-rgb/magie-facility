import type { CollectionConfig } from "payload";

import {
  administratorOnly,
  adminWrites,
  ignorePublicDraftRequests,
  publishedOrAdministrator,
} from "../access/roles";
import { automaticSlugField, deriveSlugFrom } from "../hooks/automaticSlug";

import { aboutFields } from "../blocks/AboutFields";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Página", plural: "Páginas" },
  admin: { hideAPIURL: true, group: "Contenido", useAsTitle: "title" },
  versions: { drafts: true },
  access: {
    ...adminWrites,
    read: publishedOrAdministrator,
    readVersions: administratorOnly,
  },
  hooks: {
    beforeOperation: [ignorePublicDraftRequests],
    beforeValidate: [deriveSlugFrom("title")],
  },
  fields: [
    {
      name: "pageDesign",
      label: "Diseño de página",
      type: "select",
      defaultValue: "standard",
      options: [
        { label: "Página de contenido", value: "standard" },
        { label: "Nosotros", value: "about" },
      ],
    },
    aboutFields,
    {
      name: "showServices",
      label: "Mostrar catálogo de servicios al final",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Añade automáticamente los servicios publicados, sus fotos y el enlace a cada ficha después del contenido de esta página.",
      },
    },
    {
      name: "title",
      label: "Título",
      type: "text",
      localized: true,
      required: true,
    },
    { ...automaticSlugField, unique: true },
    {
      name: "heroImage",
      label: "Imagen principal (opcional)",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      label: "Contenido",
      type: "richText",
      localized: true,
      admin: {
        description:
          "Escribe el texto de la página. Puedes usar títulos, listas y enlaces. Guarda un borrador o publica cuando esté lista.",
      },
    },
    {
      name: "seoTitle",
      label: "Título en buscadores (opcional)",
      type: "text",
      localized: true,
    },
    {
      name: "seoDescription",
      label: "Resumen en buscadores (opcional)",
      type: "textarea",
      localized: true,
    },
  ],
};
