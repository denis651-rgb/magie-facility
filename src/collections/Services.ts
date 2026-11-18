import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites, ignorePublicDraftRequests, publishedOrAdministrator } from '../access/roles'
import { automaticSlugField, deriveSlugFrom } from '../hooks/automaticSlug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: { hideAPIURL: true, group: 'Catálogo', useAsTitle: 'title' },
  versions: { drafts: true },
  access: { ...adminWrites, read: publishedOrAdministrator, readVersions: administratorOnly },
  hooks: {
    beforeOperation: [ignorePublicDraftRequests],
    beforeValidate: [deriveSlugFrom('title')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenido',
          description: 'Escribe el título, selecciona una categoría y explica en qué consiste el servicio. Puedes guardar un borrador y completarlo más tarde.',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
            automaticSlugField,
            { name: 'category', label: 'Categoría', type: 'relationship', relationTo: 'service-categories', required: true, admin: { description: 'Selecciona el grupo al que pertenece este servicio.' } },
            { name: 'summary', label: 'Resumen', type: 'textarea', localized: true },
            { name: 'description', label: 'Descripción', type: 'richText', localized: true },
            { name: 'benefits', label: 'Beneficios', type: 'array', localized: true, fields: [
              { name: 'text', label: 'Texto', type: 'text', required: true },
            ] },
          ],
        },
        {
          label: 'Fotos y visibilidad',
          description: 'Selecciona una foto principal y, si tienes más fotos del servicio, agrégalas a la galería.',
          fields: [
            { name: 'coverImage', label: 'Imagen de portada', type: 'upload', relationTo: 'media' },
            { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'media', hasMany: true },
            { name: 'externalMedia', label: 'Enlaces multimedia', type: 'relationship', relationTo: 'external-media', hasMany: true, admin: { description: 'Selecciona los enlaces que quieras asociar a esta ficha.' } },
            { name: 'featured', label: 'Destacar en el sitio', type: 'checkbox', defaultValue: false, admin: { description: 'Marca esta opción si quieres que el servicio pueda aparecer entre los destacados.' } },
            { name: 'sortOrder', label: 'Orden', type: 'number', defaultValue: 0, admin: { hidden: true, disableBulkEdit: true, disableListColumn: true, disableListFilter: true } },
          ],
        },
        {
          label: 'Buscadores',
          description: 'Este texto puede aparecer cuando alguien encuentra el servicio en Google. Completarlo es opcional.',
          fields: [
            { name: 'seoTitle', label: 'Título en buscadores', type: 'text', localized: true },
            { name: 'seoDescription', label: 'Resumen en buscadores', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
  // TODO: validación antes de publicar, slugs y revalidación.
}
