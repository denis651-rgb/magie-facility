import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  fields: [
    { name: 'favicon', label: 'Ícono del sitio', type: 'upload', relationTo: 'media' },
    { name: 'whatsappDefaultMessage', label: 'Mensaje predeterminado de WhatsApp', type: 'textarea', localized: true },
    { name: 'seoDefaultTitle', label: 'Título SEO predeterminado', type: 'text', localized: true },
    { name: 'seoDefaultDescription', label: 'Descripción SEO predeterminada', type: 'textarea', localized: true },
  ],
}
