import type { GlobalConfig } from 'payload'

import { administratorOnly } from '../access/roles'

export const CompanySettings: GlobalConfig = {
  slug: 'company-settings',
  label: 'Datos de la empresa',
  admin: { group: 'Configuración' },
  access: { read: administratorOnly, update: administratorOnly },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identidad',
          description: 'Información básica de MAGIE.',
          fields: [
            { name: 'tradeName', label: 'Nombre comercial', type: 'text', required: true },
            { name: 'legalName', label: 'Razón social', type: 'text' },
            { name: 'logo', label: 'Logotipo', type: 'upload', relationTo: 'media' },
            { name: 'about', label: 'Presentación', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Redes sociales',
          description: 'Añade el nombre de cada red y la dirección completa del perfil.',
          fields: [
            {
              name: 'socialLinks',
              label: 'Redes sociales',
              type: 'array',
              fields: [
                { name: 'platform', label: 'Red social', type: 'text', required: true },
                {
                  name: 'url',
                  label: 'Enlace directo',
                  type: 'text',
                  required: true,
                  admin: { placeholder: 'https://www.instagram.com/tu-empresa/' },
                  validate: (value: unknown) => {
                    try {
                      if (typeof value === 'string' && /^https?:\/\//i.test(value) && new URL(value).hostname) return true
                    } catch {
                      // Invalid URL.
                    }
                    return 'Introduce un enlace completo que empiece por https:// o http://.'
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contacto',
          description: 'Datos de contacto y ubicación de la empresa.',
          fields: [
            { name: 'phone', label: 'Teléfono', type: 'text' },
            { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
            { name: 'email', label: 'Correo electrónico', type: 'email' },
            { name: 'address', label: 'Dirección', type: 'text' },
            { name: 'postalCode', label: 'Código postal', type: 'text' },
            { name: 'city', label: 'Ciudad', type: 'text' },
            { name: 'country', label: 'País', type: 'text', defaultValue: 'Suiza' },
          ],
        },
      ],
    },
  ],
}
