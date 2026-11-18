import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";
import { publicCatalogPath } from "@/lib/public-pages";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import {
  companyContact,
  publicService,
  serviceImage,
} from "@/lib/public-services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default async function ServiceDetail({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const t = publicMessages[locale];
  const [service, company, catalogPath] = await Promise.all([
    publicService(slug, locale),
    companyContact(),
    publicCatalogPath(locale),
  ]);
  if (!service) notFound();
  const phone = company.whatsapp.replace(/\D/g, "");
  const whatsapp = /^[1-9]\d{6,14}$/.test(phone)
    ? buildWhatsAppUrl(phone, t.quoteService + " " + service.title + ".")
    : undefined;
  return (
    <main className="services-site">
      <article className="service-detail">
        <Link href={catalogPath} className="text-link">
          ← {t.backCatalog}
        </Link>
        <p className="eyebrow">
          {typeof service.category === "object" && service.category?.name}
        </p>
        <h1>{service.title}</h1>
        {service.summary && <p className="lead">{service.summary}</p>}
        {service.coverImage && (
          <img
            className="service-cover"
            src={serviceImage(service, service.coverImage)}
            alt={
              typeof service.coverImage === "object"
                ? service.coverImage.alt
                : ""
            }
          />
        )}
        {service.description && (
          <div className="service-copy">
            <RichText data={service.description} />
          </div>
        )}
        {!!service.benefits?.length && (
          <section>
            <h2>{t.benefits}</h2>
            <ul>
              {service.benefits.map((item, index) => (
                <li key={item.id || index}>{item.text}</li>
              ))}
            </ul>
          </section>
        )}
        {!!service.gallery?.length && (
          <section>
            <h2>{t.gallery}</h2>
            <div className="gallery">
              {service.gallery.map((image) => (
                <img
                  key={typeof image === "object" ? image.id : image}
                  src={serviceImage(service, image)}
                  alt={typeof image === "object" ? image.alt : ""}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}
        {!!service.externalMedia?.length && (
          <section>
            <h2>{t.moreService}</h2>
            <div className="external-links">
              {service.externalMedia.map((item) => {
                if (typeof item !== "object" || !/^https:\/\//i.test(item.url))
                  return null;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title} ↗
                  </a>
                );
              })}
            </div>
          </section>
        )}
        <section className="quote-box">
          <h2>{t.quoteTitle}</h2>
          <p>{t.quoteDescription}</p>
          {whatsapp ? (
            <a
              className="quote-button"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.quoteWhatsApp}
            </a>
          ) : (
            <p>{t.missingWhatsApp}</p>
          )}
        </section>
      </article>
      <footer>{company.name}</footer>
    </main>
  );
}
