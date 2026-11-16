import type { CollectionConfig } from 'payload'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  labels: { singular: 'Categoría de servicio', plural: 'Categorías de servicios' },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', localized: true, required: true },
    { name: 'slug', label: 'Identificador de URL', type: 'text', localized: true, required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', localized: true },
    { name: 'parent', label: 'Categoría superior', type: 'relationship', relationTo: 'service-categories' },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', label: 'Orden', type: 'number', defaultValue: 0 },
    { name: 'active', label: 'Activo', type: 'checkbox', defaultValue: true },
  ],
  // TODO: unicidad de slug localizado, validación de ciclos y reglas de publicación.
}
