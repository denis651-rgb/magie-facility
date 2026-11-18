import "server-only";
import type { Locale } from "@/i18n/config";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Service } from "@/payload-types";

export async function publicServices(locale: Locale = "es") {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    locale,
    fallbackLocale: false,
    overrideAccess: true,
    draft: false,
    depth: 2,
    pagination: false,
    where: { _status: { equals: "published" } },
    sort: "sortOrder",
  });
  return result.docs;
}

export async function publicService(slug: string, locale: Locale = "es") {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    locale,
    fallbackLocale: false,
    overrideAccess: true,
    draft: false,
    depth: 2,
    limit: 1,
    where: {
      and: [{ _status: { equals: "published" } }, { slug: { equals: slug } }],
    },
  });
  const service = result.docs[0];
  return service?.title && service.slug ? service : undefined;
}

export function serviceImage(
  service: Service,
  media: number | Media | null | undefined,
) {
  const id = typeof media === "object" ? media?.id : media;
  return id ? "/es/servicios/imagen/" + service.id + "?media=" + id : undefined;
}

export async function companyContact() {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: "company-settings",
    overrideAccess: true,
    depth: 0,
    locale: "es",
  });
  return {
    name: settings.tradeName || "MAGIE Facility Service C&D",
    whatsapp:
      settings.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  };
}
