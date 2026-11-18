import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'fr';
  ALTER TYPE "public"."_locales" ADD VALUE 'it';
  ALTER TYPE "public"."enum__services_v_published_locale" ADD VALUE 'fr';
  ALTER TYPE "public"."enum__services_v_published_locale" ADD VALUE 'it';
  ALTER TYPE "public"."enum__projects_v_published_locale" ADD VALUE 'fr';
  ALTER TYPE "public"."enum__projects_v_published_locale" ADD VALUE 'it';
  ALTER TYPE "public"."enum__pages_v_published_locale" ADD VALUE 'fr';
  ALTER TYPE "public"."enum__pages_v_published_locale" ADD VALUE 'it';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "service_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "services_benefits" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "services_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_services_v_version_benefits" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_services_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "projects_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_projects_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_about_values" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_about_values" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "company_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_menu_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_header_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('es', 'de');
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "service_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "services_benefits" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "services_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_services_v_version_benefits" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_services_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "projects_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_projects_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_about_values" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_about_values" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "company_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_menu_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_header_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_services_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__services_v_published_locale";
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('es', 'de');
  ALTER TABLE "_services_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__services_v_published_locale" USING "published_locale"::"public"."enum__services_v_published_locale";
  ALTER TABLE "_projects_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__projects_v_published_locale";
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('es', 'de');
  ALTER TABLE "_projects_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__projects_v_published_locale" USING "published_locale"::"public"."enum__projects_v_published_locale";
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_published_locale";
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('es', 'de');
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__pages_v_published_locale" USING "published_locale"::"public"."enum__pages_v_published_locale";`)
}
