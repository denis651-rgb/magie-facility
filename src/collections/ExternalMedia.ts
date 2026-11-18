import type { CollectionConfig } from 'payload'

import { administratorOnly, adminWrites } from '../access/roles'

export const ExternalMedia: CollectionConfig = {
  slug: 'external-media',
  labels: { singular: 'Enlace multimedia', plural: 'Enlaces multimedia' },
  admin: { group: 'Contenido', useAsTitle: 'title', hideAPIURL: true },
  access: { ...adminWrites, read: administratorOnly },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'url',
      label: 'Enlace externo',
      type: 'text',
      required: true,
      maxLength: 2048,
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=…',
        description: 'Pega el enlace HTTPS de la publicación. El archivo seguirá alojado en la plataforma original.',
      },
      validate: (value: unknown) => {
        if (typeof value === 'string' && value.length <= 2048 && /^https:\/\//i.test(value) && !/[\s\\]/.test(value)) {
          try {
            const url = new URL(value)
            if (url.hostname && !url.username && !url.password) return true
          } catch {
            // Show the validation message below.
          }
        }
        return 'Introduce un enlace HTTPS completo sin usuario ni contraseña.'
      },
    },
  ],
}
