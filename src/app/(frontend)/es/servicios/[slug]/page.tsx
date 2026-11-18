import ServiceDetail from "@/components/services/ServiceDetail";
import { publicService } from "@/lib/public-services";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const service = await publicService((await params).slug);
  return {
    title: service?.seoTitle || service?.title,
    description: service?.seoDescription || service?.summary,
  };
}
export default async function ServicePage({ params }: Props) {
  return <ServiceDetail slug={(await params).slug} locale="es" />;
}
