import { randomUUID } from 'node:crypto'
import type { CollectionBeforeValidateHook, TextField } from 'payload'

export const automaticSlugField: TextField = {
  name: 'slug',
  label: 'Identificador de URL',
  type: 'text',
  localized: true,
  required: true,
  admin: { hidden: true, condition: () => false },
}

export function deriveSlugFrom(source: 'name' | 'title'): CollectionBeforeValidateHook {
  return ({ data, originalDoc }) => {
    if (!data) return data

    const existingSlug = originalDoc?.slug
    if (typeof data.slug === 'string' && data.slug.trim()) return data
    if (typeof existingSlug === 'string' && existingSlug.trim()) {
      return { ...data, slug: existingSlug }
    }

    const label = data[source] ?? originalDoc?.[source]
    if (typeof label !== 'string' || !label.trim()) return data

    const slug = label
      .normalize('NFKD')
      .replace(/\p{M}/gu, '')
      .toLowerCase()
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    return { ...data, slug: slug || `ficha-${randomUUID()}` }
  }
}
