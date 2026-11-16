import { Forbidden, type CollectionConfig } from 'payload'

import { administratorOnly, adminWrites, isActiveAdmin } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  auth: { useSessions: true },
  access: { ...adminWrites, admin: administratorOnly, read: administratorOnly, unlock: administratorOnly },
  hooks: {
    beforeLogin: [
      ({ user, req }) => {
        if (!isActiveAdmin(user)) throw new Forbidden(req.t)
      },
    ],
    beforeChange: [
      ({ data }) => (data.active === false ? { ...data, sessions: [] } : data),
    ],
  },
  admin: { group: 'Administración', useAsTitle: 'email' },
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
}
