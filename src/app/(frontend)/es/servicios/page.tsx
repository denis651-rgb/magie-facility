import { redirect } from 'next/navigation';
import { publicCatalogPath } from '@/lib/public-pages';
import { companyContact } from "@/lib/public-services";
import ServiceCatalog from "@/components/services/ServiceCatalog";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const catalogPath = await publicCatalogPath();
  if (catalogPath !== "/es/servicios") redirect(catalogPath);
  const company = await companyContact();
  return (
    <main className="services-site">
      <section className="catalog-intro">
        <p className="eyebrow">Limpieza y mantenimiento</p>
        <h1>Cuidamos tus espacios.</h1>
        <p>
          Descubre nuestros servicios y solicita un presupuesto adaptado a tus
          necesidades.
        </p>
      </section>
      <ServiceCatalog />
      <footer>{company.name}</footer>
    </main>
  );
}
