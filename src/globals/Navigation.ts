import type { GlobalConfig } from "payload";

import { administratorOnly } from "../access/roles";
import { mainRoutes } from "../lib/menu-routes";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Menú del sitio",
  admin: {
    hideAPIURL: true,
    group: "Configuración",
    description:
      "Añade las páginas que quieres mostrar y arrastra las filas para ordenar el menú.",
  },
  access: { read: administratorOnly, update: administratorOnly },
  fields: [
    {
      name: "homePage",
      label: "Página principal",
      type: "relationship",
      relationTo: "pages",
      filterOptions: { _status: { equals: "published" } },
      admin: {
        description:
          "Elige la página publicada que se mostrará al abrir el sitio.",
      },
    },
    {
      name: "menuItems",
      label: "Opciones del menú",
      type: "array",
      labels: { singular: "Opción", plural: "Opciones" },
      defaultValue: mainRoutes.map((route) => ({ destination: route.value })),
      fields: [
        {
          name: "destination",
          label: "Página",
          type: "select",
          required: true,
          defaultValue: "home",
          options: [
            ...mainRoutes.map((route) => ({
              label: route.labelES,
              value: route.value,
            })),
            { label: "Una página que he creado", value: "page" },
          ],
        },
        {
          name: "page",
          label: "Página publicada",
          type: "relationship",
          relationTo: "pages",
          filterOptions: { _status: { equals: "published" } },
          admin: {
            description:
              "Elige una página creada para mostrar su contenido. Si lo dejas vacío, se abrirá la sección original.",
          },
        },
        {
          name: "menuLabel",
          label: "Texto del menú (opcional)",
          type: "text",
          localized: true,
          admin: {
            description:
              "Déjalo vacío para usar automáticamente el nombre de la página.",
          },
        },
      ],
    },
    {
      name: "headerLinks",
      label: "Enlaces anteriores",
      type: "array",
      admin: { hidden: true },
      fields: [
        { name: "label", type: "text", localized: true, required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "footerText",
      label: "Texto del pie de página",
      type: "textarea",
      localized: true,
    },
  ],
};
