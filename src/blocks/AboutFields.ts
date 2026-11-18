import type { Field } from "payload";

export const aboutFields: Field = {
  name: "about",
  label: "Contenido de Nosotros",
  type: "group",
  admin: { condition: (data) => data.pageDesign === "about" },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Banner y presentación",
          fields: [
            {
              name: "bannerTitle",
              label: "Título del banner",
              type: "text",
              localized: true,
            },
            {
              name: "bannerSubtitle",
              label: "Subtítulo del banner",
              type: "textarea",
              localized: true,
            },
            {
              name: "introTitle",
              label: "Título de la presentación",
              type: "text",
              localized: true,
            },
            {
              name: "introText",
              label: "Presentación de la empresa",
              type: "textarea",
              localized: true,
              admin: {
                description:
                  "Si lo dejas vacío, se muestra el Contenido que ya escribiste en esta página.",
              },
            },
            {
              name: "firstImage",
              label: "Primera fotografía",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "secondImage",
              label: "Segunda fotografía",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "buttonLabel",
              label: "Texto del botón de cotización",
              type: "text",
              localized: true,
            },
          ],
        },
        {
          label: "Valores",
          fields: [
            {
              name: "valuesTitle",
              label: "Título de la sección",
              type: "text",
              localized: true,
            },
            {
              name: "values",
              label: "Valores corporativos",
              type: "array",
              localized: true,
              fields: [
                { name: "label", label: "Valor", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Misión y visión",
          fields: [
            {
              name: "purposeTitle",
              label: "Título destacado",
              type: "textarea",
              localized: true,
            },
            {
              name: "missionTitle",
              label: "Título de misión",
              type: "text",
              localized: true,
            },
            {
              name: "mission",
              label: "Misión",
              type: "textarea",
              localized: true,
            },
            {
              name: "visionTitle",
              label: "Título de visión",
              type: "text",
              localized: true,
            },
            {
              name: "vision",
              label: "Visión",
              type: "textarea",
              localized: true,
            },
            {
              name: "approved",
              label: "Textos corporativos revisados y aprobados",
              type: "checkbox",
              localized: true,
              defaultValue: false,
              admin: {
                description:
                  "Hasta que marques esta opción se mostrará una nota de contenido provisional.",
              },
            },
          ],
        },
      ],
    },
  ],
};
