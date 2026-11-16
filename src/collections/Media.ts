import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  admin: { useAsTitle: 'alt' },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true },
    { name: 'credit', type: 'text' },
  ],
  // TODO: access, política de tamaño, almacenaje persistente y control de borrado.
}
