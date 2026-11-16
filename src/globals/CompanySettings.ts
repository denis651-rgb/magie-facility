import type { GlobalConfig } from 'payload'

export const CompanySettings: GlobalConfig = {
  slug: 'company-settings',
  label: 'Datos de la empresa',
  fields: [
    { name: 'tradeName', label: 'Nombre comercial', type: 'text', required: true },
    { name: 'legalName', label: 'Razón social', type: 'text' },
    { name: 'logo', label: 'Logotipo', type: 'upload', relationTo: 'media' },
    { name: 'about', label: 'Presentación', type: 'textarea', localized: true },
    { name: 'phone', label: 'Teléfono', type: 'text' },
    { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
    { name: 'email', label: 'Correo electrónico', type: 'email' },
    { name: 'address', label: 'Dirección', type: 'text' },
    { name: 'postalCode', label: 'Código postal', type: 'text' },
    { name: 'city', label: 'Ciudad', type: 'text' },
    { name: 'country', label: 'País', type: 'text', defaultValue: 'Suiza' },
  ],
}
