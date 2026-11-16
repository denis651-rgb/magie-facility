import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo multimedia', plural: 'Archivos multimedia' },
  access: { ...adminWrites, read: administratorOnly },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  admin: { group: 'Contenido', useAsTitle: 'alt' },
  fields: [
    { name: 'alt', label: 'Texto alternativo', type: 'text', localized: true, required: true },
    { name: 'credit', label: 'Crédito', type: 'text' },
  ],
  // TODO: política de tamaño, almacenaje persistente y control de borrado.
}
