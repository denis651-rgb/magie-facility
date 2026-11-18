import { isLocale } from "@/i18n/config";
import AboutPage from "@/components/about/AboutPage";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { publicPage } from "@/lib/public-pages";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = await publicPage(slug, locale);
  return {
    title: page?.seoTitle || page?.title,
    description: page?.seoDescription || undefined,
  };
}

export default async function ContentPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = await publicPage(slug, locale);
  if (!page) notFound();
  if (page.pageDesign === "about")
    return <AboutPage page={page} locale={locale} />;
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
      {page.showServices && <ServiceCatalog locale={locale} />}
    </main>
  );
}
