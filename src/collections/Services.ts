import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', localized: true, required: true },
    { name: 'slug', label: 'Identificador de URL', type: 'text', localized: true, required: true },
    { name: 'summary', label: 'Resumen', type: 'textarea', localized: true },
    { name: 'description', label: 'Descripción', type: 'richText', localized: true },
    { name: 'benefits', label: 'Beneficios', type: 'array', localized: true, fields: [
      { name: 'text', label: 'Texto', type: 'text', required: true },
    ] },
    { name: 'category', label: 'Categoría', type: 'relationship', relationTo: 'service-categories', required: true },
    { name: 'coverImage', label: 'Imagen de portada', type: 'upload', relationTo: 'media' },
    { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', label: 'Orden', type: 'number', defaultValue: 0 },
    { name: 'seoTitle', label: 'Título SEO', type: 'text', localized: true },
    { name: 'seoDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
  ],
  // TODO: access (borradores y publicación solo para administradores), validación antes de publicar, slugs y revalidación.
}
