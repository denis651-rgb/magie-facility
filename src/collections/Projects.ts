import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Trabajo', plural: 'Trabajos' },
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
    { name: 'slug', label: 'Identificador de URL', type: 'text', localized: true, required: true },
    { name: 'summary', label: 'Resumen', type: 'textarea', localized: true },
    { name: 'services', label: 'Servicios', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
  ],
}
