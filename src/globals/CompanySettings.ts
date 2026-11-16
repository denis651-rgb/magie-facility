import type { GlobalConfig } from 'payload'

export const CompanySettings: GlobalConfig = {
  slug: 'company-settings',
  fields: [
    { name: 'tradeName', type: 'text', required: true },
    { name: 'legalName', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'about', type: 'textarea', localized: true },
    { name: 'phone', type: 'text' },
    { name: 'whatsapp', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'text' },
    { name: 'postalCode', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'country', type: 'text', defaultValue: 'Suiza' },
  ],
}
