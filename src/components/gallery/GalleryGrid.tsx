/** Placeholder a sustituir por galería optimizada con Next/Image. */
export function GalleryGrid({ titles }: { titles: string[] }) {
  return <section aria-label="Galería de trabajos">{titles.map((title) => <p key={title}>{title}</p>)}</section>
}
