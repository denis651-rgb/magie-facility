import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";
import { servicePath } from "@/lib/menu-routes";
import Link from "next/link";
import { publicServices, serviceImage } from "@/lib/public-services";

export default async function ServiceCatalog({
  locale = "es",
}: {
  locale?: Locale;
}) {
  const services = (await publicServices(locale)).filter(
    (service) => service.title && service.slug,
  );
  const t = publicMessages[locale];
  return (
    <section className="connected-section" aria-label={t.services}>
      <h2>{t.servicesTitle}</h2>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            {service.coverImage && (
              <img
                src={serviceImage(service, service.coverImage)}
                alt={
                  typeof service.coverImage === "object"
                    ? service.coverImage.alt
                    : ""
                }
                loading="lazy"
              />
            )}
            <div>
              <h3>
                <Link href={servicePath(locale, service.slug!)}>
                  {service.title}
                </Link>
              </h3>
              {service.summary && <p>{service.summary}</p>}
              <Link
                className="text-link"
                href={servicePath(locale, service.slug!)}
              >
                {t.serviceRead} →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!services.length && <p>{t.emptyServices}</p>}
    </section>
  );
}
