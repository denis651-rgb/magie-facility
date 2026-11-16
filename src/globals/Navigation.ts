import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    { name: 'headerLinks', type: 'array', fields: [
      { name: 'label', type: 'text', localized: true, required: true },
      { name: 'href', type: 'text', required: true },
    ] },
    { name: 'footerText', type: 'textarea', localized: true },
  ],
}
