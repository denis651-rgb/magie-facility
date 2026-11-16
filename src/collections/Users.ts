import type { CollectionConfig } from 'payload'

/** Colección inicial de acceso al panel; adaptar a políticas finales. */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    {
      name: 'role', label: 'Rol', type: 'select', required: true, defaultValue: 'admin',
      options: [
        { label: 'Administrador', value: 'admin' },
      ],
    },
    { name: 'active', label: 'Activo', type: 'checkbox', defaultValue: true },
  ],
  // TODO: añadir access basado en usuario y bloqueo de usuarios desactivados.
}
