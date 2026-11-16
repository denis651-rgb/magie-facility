import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites, ignorePublicDraftRequests, publishedOrAdministrator } from '../access/roles'
import { automaticSlugField, deriveSlugFrom } from '../hooks/automaticSlug'

/** Los bloques y sus validaciones se añadirán al aprobar el diseño. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { group: 'Contenido', useAsTitle: 'title' },
  versions: { drafts: true },
  access: { ...adminWrites, read: publishedOrAdministrator, readVersions: administratorOnly },
  hooks: {
    beforeOperation: [ignorePublicDraftRequests],
    beforeValidate: [deriveSlugFrom('title')],
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
    automaticSlugField,
    { name: 'seoTitle', label: 'Título SEO', type: 'text', localized: true },
    { name: 'seoDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
  ],
}
