import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', localized: true, required: true },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'gallery', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
