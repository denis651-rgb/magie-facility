import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo multimedia', plural: 'Archivos multimedia' },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  admin: { useAsTitle: 'alt' },
  fields: [
    { name: 'alt', label: 'Texto alternativo', type: 'text', localized: true, required: true },
    { name: 'credit', label: 'Crédito', type: 'text' },
  ],
  // TODO: access, política de tamaño, almacenaje persistente y control de borrado.
}
