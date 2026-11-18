import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { es } from "@payloadcms/translations/languages/es";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ExternalMedia } from "./collections/ExternalMedia";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Projects } from "./collections/Projects";
import { ServiceCategories } from "./collections/ServiceCategories";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { CompanySettings } from "./globals/CompanySettings";
import { Navigation } from "./globals/Navigation";
import { SiteSettings } from "./globals/SiteSettings";
import { defaultLocale, locales, localeLabels } from "./i18n/config";

const srcDir = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    components: {
      beforeDashboard: ["@/components/layout/AdminShortcuts"],
      graphics: {
        Icon: "@/components/layout/AdminBrand#AdminIcon",
        Logo: "@/components/layout/AdminBrand#AdminLogo",
      },
    },
    importMap: { baseDir: srcDir },
  },
  collections: [
    Users,
    Media,
    ExternalMedia,
    ServiceCategories,
    Services,
    Projects,
    Pages,
  ],
  globals: [CompanySettings, Navigation, SiteSettings],
  editor: lexicalEditor(),
  i18n: { fallbackLanguage: "es", supportedLanguages: { es } },
  localization: {
    locales: locales.map((code) => ({ code, label: localeLabels[code] })),
    defaultLocale,
    fallback: false,
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: { outputFile: path.join(srcDir, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.join(srcDir, "migrations"),
    push: false,
  }),
  sharp,
});
