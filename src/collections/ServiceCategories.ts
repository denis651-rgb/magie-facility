import type { CollectionConfig } from 'payload'

import { activeCategoryOrAdministrator, adminWrites } from '../access/roles'
import { automaticSlugField, deriveSlugFrom } from '../hooks/automaticSlug'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  labels: { singular: 'Categoría de servicio', plural: 'Categorías de servicios' },
  admin: { group: 'Catálogo', useAsTitle: 'name' },
  access: { ...adminWrites, read: activeCategoryOrAdministrator },
  hooks: { beforeValidate: [deriveSlugFrom('name')] },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', localized: true, required: true },
    automaticSlugField,
    { name: 'description', label: 'Descripción', type: 'textarea', localized: true },
    { name: 'parent', label: 'Categoría superior', type: 'relationship', relationTo: 'service-categories' },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', label: 'Orden', type: 'number', defaultValue: 0 },
    { name: 'active', label: 'Activo', type: 'checkbox', defaultValue: true },
  ],
  // TODO: unicidad de slug localizado, validación de ciclos y reglas de publicación.
}
