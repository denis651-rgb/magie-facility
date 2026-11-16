import type { CollectionConfig } from 'payload'

/** Colección inicial de acceso al panel; adaptar a políticas finales. */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role', type: 'select', required: true, defaultValue: 'admin',
      options: [
        { label: 'Administrador', value: 'admin' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  // TODO: añadir access basado en usuario y bloqueo de usuarios desactivados.
}
