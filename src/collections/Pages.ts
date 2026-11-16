import type { CollectionConfig } from 'payload'

/** Los bloques y sus validaciones se añadirán al aprobar el diseño. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
    { name: 'slug', label: 'Identificador de URL', type: 'text', localized: true, required: true },
    { name: 'seoTitle', label: 'Título SEO', type: 'text', localized: true },
    { name: 'seoDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
  ],
}
