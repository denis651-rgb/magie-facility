import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites, ignorePublicDraftRequests, publishedOrAdministrator } from '../access/roles'
import { automaticSlugField, deriveSlugFrom } from '../hooks/automaticSlug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: { group: 'Catálogo', useAsTitle: 'title' },
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
          description: 'Describe el servicio y los beneficios que tendrá para el cliente.',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
            automaticSlugField,
            { name: 'summary', label: 'Resumen', type: 'textarea', localized: true },
            { name: 'description', label: 'Descripción', type: 'richText', localized: true },
            { name: 'benefits', label: 'Beneficios', type: 'array', localized: true, fields: [
              { name: 'text', label: 'Texto', type: 'text', required: true },
            ] },
          ],
        },
        {
          label: 'Catálogo e imágenes',
          description: 'Elige dónde aparece en el catálogo y qué imágenes acompañan la ficha.',
          fields: [
            { name: 'category', label: 'Categoría', type: 'relationship', relationTo: 'service-categories', required: true },
            { name: 'coverImage', label: 'Imagen de portada', type: 'upload', relationTo: 'media' },
            { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'media', hasMany: true },
            { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
            { name: 'sortOrder', label: 'Orden', type: 'number', defaultValue: 0 },
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
