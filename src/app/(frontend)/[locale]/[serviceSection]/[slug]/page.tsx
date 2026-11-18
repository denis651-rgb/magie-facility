import ServiceDetail from "@/components/services/ServiceDetail";
import { publicService } from "@/lib/public-services";
import { isLocale } from "@/i18n/config";
import { serviceSegments } from "@/lib/menu-routes";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ locale: string; serviceSection: string; slug: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale, serviceSection, slug } = await params;
  if (!isLocale(locale) || serviceSection !== serviceSegments[locale])
    return {};
  const service = await publicService(slug, locale);
  return {
    title: service?.seoTitle || service?.title,
    description: service?.seoDescription || service?.summary,
  };
}
export default async function ServicePage({ params }: Props) {
  const { locale, serviceSection, slug } = await params;
  if (!isLocale(locale) || serviceSection !== serviceSegments[locale])
    notFound();
  return <ServiceDetail slug={slug} locale={locale} />;
}
