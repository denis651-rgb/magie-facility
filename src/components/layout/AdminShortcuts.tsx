import Link from 'next/link'

const shortcuts = [
  {
    href: '/admin/collections/services/create',
    title: 'Nuevo servicio',
    detail: 'Añade una ficha al catálogo.',
  },
  {
    href: '/admin/collections/projects/create',
    title: 'Registrar trabajo',
    detail: 'Documenta un trabajo y añade sus fotos.',
  },
  {
    href: '/admin/globals/company-settings',
    title: 'Datos de la empresa',
    detail: 'Actualiza el contacto, logotipo y redes sociales.',
  },
]

export default function AdminShortcuts() {
  return (
    <section className="magie-shortcuts" aria-labelledby="magie-shortcuts-title">
      <h2 id="magie-shortcuts-title">Acciones frecuentes</h2>
      <div className="magie-shortcuts__grid">
        {shortcuts.map(({ href, title, detail }) => (
          <Link key={href} href={href} className="magie-shortcuts__link">
            <strong>{title}</strong>
            <span>{detail}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
