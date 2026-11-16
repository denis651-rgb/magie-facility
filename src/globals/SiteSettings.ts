import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'whatsappDefaultMessage', type: 'textarea', localized: true },
    { name: 'seoDefaultTitle', type: 'text', localized: true },
    { name: 'seoDefaultDescription', type: 'textarea', localized: true },
  ],
}
