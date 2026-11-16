import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navegación',
  fields: [
    { name: 'headerLinks', label: 'Enlaces del encabezado', type: 'array', fields: [
      { name: 'label', label: 'Etiqueta', type: 'text', localized: true, required: true },
      { name: 'href', label: 'Destino', type: 'text', required: true },
    ] },
    { name: 'footerText', label: 'Texto del pie de página', type: 'textarea', localized: true },
  ],
}
