type Props = { title: string; description?: string; href: string }
export function ServiceCard({ title, description, href }: Props) {
  return <article><h3><a href={href}>{title}</a></h3>{description && <p>{description}</p>}</article>
}
