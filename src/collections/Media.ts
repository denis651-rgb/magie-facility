import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo multimedia', plural: 'Archivos multimedia' },
  access: { ...adminWrites, read: administratorOnly },
  upload: { pasteURL: false, mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  admin: { hideAPIURL: true, group: 'Contenido', useAsTitle: 'alt' },
  fields: [
    { name: 'alt', label: 'Texto alternativo', type: 'text', localized: true, required: true, admin: { placeholder: 'Ej.: Oficina con escritorios limpios y ordenados' } },
    { name: 'credit', label: 'Crédito', type: 'text', admin: { placeholder: 'Ej.: Foto de MAGIE Facility Service' } },
  ],
  // TODO: política de tamaño, almacenaje persistente y control de borrado.
}
