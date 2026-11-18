import { getPayload } from "payload";
import config from "@payload-config";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = Number((await params).id);
  const mediaID = Number(new URL(request.url).searchParams.get("media"));
  if (
    !Number.isSafeInteger(id) ||
    !Number.isSafeInteger(mediaID) ||
    id < 1 ||
    mediaID < 1
  )
    return new Response(null, { status: 404 });
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: "projects",
    overrideAccess: true,
    draft: false,
    depth: 0,
    limit: 1,
    where: {
      and: [{ id: { equals: id } }, { _status: { equals: "published" } }],
    },
  });
  const service = services.docs[0];
  if (!service || ![...(service.gallery || [])].includes(mediaID))
    return new Response(null, { status: 404 });
  const files = await payload.find({
    collection: "media",
    overrideAccess: true,
    depth: 0,
    limit: 1,
    where: { id: { equals: mediaID } },
  });
  const media = files.docs[0];
  if (
    !media?.filename ||
    !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(
      media.mimeType || "",
    )
  )
    return new Response(null, { status: 404 });
  const root = path.resolve(
    payload.collections.media.config.upload.staticDir || "media",
  );
  const file = path.resolve(root, media.filename);
  if (path.dirname(file) !== root) return new Response(null, { status: 404 });
  try {
    return new Response(await readFile(file), {
      headers: {
        "Content-Type": media.mimeType!,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
