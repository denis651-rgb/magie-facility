import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites, ignorePublicDraftRequests, publishedOrAdministrator } from '../access/roles'
import { automaticSlugField, deriveSlugFrom } from '../hooks/automaticSlug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Trabajo', plural: 'Trabajos' },
  admin: { group: 'Contenido', useAsTitle: 'title' },
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
          label: 'Ficha',
          description: 'Resume el trabajo realizado y vincúlalo a los servicios correspondientes.',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
            automaticSlugField,
            { name: 'summary', label: 'Resumen', type: 'textarea', localized: true },
            { name: 'services', label: 'Servicios', type: 'relationship', relationTo: 'services', hasMany: true },
          ],
        },
        {
          label: 'Galería y visibilidad',
          description: 'Selecciona las fotos del trabajo y decide si quieres destacarlo.',
          fields: [
            { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'media', hasMany: true },
            { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
  ],
}
