import { isLocale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";
import {
  serviceSegments,
  projectSegments,
  aboutSegments,
  contactSegments,
  servicePath,
} from "@/lib/menu-routes";
import { publicCatalogPath } from "@/lib/public-pages";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { serviceImage } from "@/lib/public-services";

function safeLink(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section?: string[] }>;
}) {
  const { locale, section = [] } = await params;
  if (!isLocale(locale)) notFound();
  const key = section.join("/");
  const t = publicMessages[locale];
  const names: Record<string, string> = {
    "": t.homeTitle,
    [serviceSegments[locale]]: t.servicesTitle,
    [projectSegments[locale]]: t.projectsTitle,
    [aboutSegments[locale]]: t.aboutTitle,
    [contactSegments[locale]]: t.contactTitle,
  };
  if (key === serviceSegments[locale]) {
    const catalog = await publicCatalogPath(locale);
    if (catalog !== "/" + locale + "/" + key) redirect(catalog);
    return (
      <main className="services-site">
        <section className="catalog-intro">
          <p className="eyebrow">{t.catalogEyebrow}</p>
          <h1>{t.catalogTitle}</h1>
          <p>{t.catalogIntro}</p>
        </section>
        <ServiceCatalog locale={locale} />
      </main>
    );
  }
  if (!Object.hasOwn(names, key)) notFound();
  const home = key === "";
  const about = key === aboutSegments[locale];
  const contact = key === contactSegments[locale];
  const projectsPage = key === projectSegments[locale];
  const payload = await getPayload({ config });
  if (about) {
    const result = await payload.find({
      collection: "pages",
      locale,
      fallbackLocale: false,
      draft: false,
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: {
        and: [
          { pageDesign: { equals: "about" } },
          { _status: { equals: "published" } },
        ],
      },
    });
    const page = result.docs[0];
    if (page?.title && page.slug)
      redirect("/" + locale + "/paginas/" + encodeURIComponent(page.slug));
  }
  if (home) {
    const navigation = await payload.findGlobal({
      slug: "navigation",
      depth: 0,
      overrideAccess: true,
    });
    const selectedID =
      typeof navigation.homePage === "object"
        ? navigation.homePage?.id
        : navigation.homePage;
    if (selectedID) {
      const pages = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale: false,
        draft: false,
        overrideAccess: true,
        depth: 1,
        limit: 1,
        where: {
          and: [
            { id: { equals: selectedID } },
            { _status: { equals: "published" } },
          ],
        },
      });
      const page = pages.docs[0];
      if (page?.title) {
        const image = page.heroImage;
        return (
          <main className="services-site">
            <article className="service-detail">
              <h1>{page.title}</h1>
              {image && (
                <img
                  className="service-cover"
                  src={
                    "/media/paginas/" +
                    page.id +
                    "?media=" +
                    (typeof image === "object" ? image.id : image)
                  }
                  alt={typeof image === "object" ? image.alt : ""}
                />
              )}
              {page.content && (
                <div className="service-copy">
                  <RichText data={page.content} />
                </div>
              )}
            </article>
            {page.showServices && <ServiceCatalog locale={locale} />}{" "}
          </main>
        );
      }
    }
  }
  const company = await payload.findGlobal({
    slug: "company-settings",
    locale,
    fallbackLocale: false,
    depth: 0,
    overrideAccess: true,
  });
  const companyName = company.tradeName || "MAGIE Facility Service C&D";
  const phone = (
    company.whatsapp ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    ""
  ).replace(/\D/g, "");
  const quote = /^[1-9]\d{6,14}$/.test(phone)
    ? buildWhatsAppUrl(phone, t.quoteMessage)
    : undefined;
  const [services, projects] = await Promise.all([
    home || key === serviceSegments[locale]
      ? payload.find({
          collection: "services",
          locale,
          fallbackLocale: false,
          draft: false,
          overrideAccess: true,
          depth: 1,
          pagination: false,
          where: { _status: { equals: "published" } },
          sort: "sortOrder",
        })
      : undefined,
    home || projectsPage
      ? payload.find({
          collection: "projects",
          locale,
          fallbackLocale: false,
          draft: false,
          overrideAccess: true,
          depth: 1,
          pagination: false,
          where: { _status: { equals: "published" } },
          sort: "-createdAt",
        })
      : undefined,
  ]);
  const visibleServices = (services?.docs || []).filter(
    (item) => item.title && item.slug,
  );
  const visibleProjects = (projects?.docs || []).filter((item) => item.title);
  const featuredServices = home
    ? visibleServices.filter((item) => item.featured).slice(0, 6)
    : visibleServices;
  const featuredProjects = home
    ? visibleProjects.filter((item) => item.featured).slice(0, 3)
    : visibleProjects;
  return (
    <main className="services-site">
      <section className="catalog-intro">
        <p className="eyebrow">{companyName}</p>
        <h1>{names[key as keyof typeof names]}</h1>
        {(home || about) &&
          (company.about ? (
            <p className="company-about">{company.about}</p>
          ) : (
            <p>{t.companyIntro}</p>
          ))}
        {quote && (home || contact) && (
          <a
            className="quote-button"
            href={quote}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.quoteWhatsApp}
          </a>
        )}
      </section>

      {(home || key === serviceSegments[locale]) && (
        <section className="connected-section">
          <h2>{t.featuredServices}</h2>
          <div className="service-grid">
            {featuredServices.map((service) => (
              <article className="service-card" key={service.id}>
                {service.coverImage && (
                  <img
                    src={serviceImage(service, service.coverImage)}
                    alt={
                      typeof service.coverImage === "object"
                        ? service.coverImage.alt
                        : ""
                    }
                  />
                )}
                <div>
                  <h3>
                    <Link href={servicePath(locale, service.slug || "")}>
                      {service.title}
                    </Link>
                  </h3>
                  {service.summary && <p>{service.summary}</p>}
                </div>
              </article>
            ))}
          </div>
          {home && (
            <Link
              className="text-link"
              href={"/" + locale + "/" + serviceSegments[locale]}
            >
              {t.allServices}
            </Link>
          )}
          {!featuredServices.length && <p>{t.emptyServices}</p>}
        </section>
      )}

      {(home || projectsPage) && (
        <section className="connected-section">
          <h2>{home ? t.featuredProjects : t.completedProjects}</h2>
          {!featuredProjects.length && <p>{t.emptyProjects}</p>}
          {featuredProjects.map((project) => (
            <article className="project-public" key={project.id}>
              <h3>{project.title}</h3>
              {project.summary && <p>{project.summary}</p>}
              <div className="gallery">
                {project.gallery?.map((image) => (
                  <img
                    key={typeof image === "object" ? image.id : image}
                    src={
                      "/media/trabajos/" +
                      project.id +
                      "?media=" +
                      (typeof image === "object" ? image.id : image)
                    }
                    alt={typeof image === "object" ? image.alt : ""}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="external-links">
                {project.externalMedia?.map((item) =>
                  typeof item === "object" && safeLink(item.url) ? (
                    <a
                      key={item.id}
                      href={safeLink(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title} ↗
                    </a>
                  ) : null,
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {contact && (
        <section className="connected-section contact-grid">
          <div>
            <h2>{t.contactData}</h2>
            {company.phone && (
              <p>
                <strong>{t.phone}</strong>
                <br />
                <a href={"tel:" + company.phone.replace(/[^+\d]/g, "")}>
                  {company.phone}
                </a>
              </p>
            )}
            {company.email && (
              <p>
                <strong>{t.email}</strong>
                <br />
                <a href={"mailto:" + company.email}>{company.email}</a>
              </p>
            )}
            {[
              company.address,
              company.postalCode,
              company.city,
              company.country,
            ].filter(Boolean).length > 0 && (
              <p>
                <strong>{t.address}</strong>
                <br />
                {[
                  company.address,
                  company.postalCode,
                  company.city,
                  company.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>
          {!!company.socialLinks?.length && (
            <div>
              <h2>{t.social}</h2>
              <div className="external-links">
                {company.socialLinks.map((item) =>
                  safeLink(item.url) ? (
                    <a
                      key={item.id}
                      href={safeLink(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.platform} ↗
                    </a>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </section>
      )}
      <footer>{companyName}</footer>
    </main>
  );
}
