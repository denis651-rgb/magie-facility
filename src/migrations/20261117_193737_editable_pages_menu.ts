import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_navigation_menu_items_destination" AS ENUM('home', 'services', 'projects', 'about', 'contact', 'page');
  CREATE TABLE "navigation_menu_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "destination" "enum_navigation_menu_items_destination" DEFAULT 'home' NOT NULL,
    "page_id" integer
  );

  CREATE TABLE "navigation_menu_items_locales" (
    "menu_label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  ALTER TABLE "pages" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "navigation_menu_items" ADD CONSTRAINT "navigation_menu_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_menu_items" ADD CONSTRAINT "navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_menu_items_locales" ADD CONSTRAINT "navigation_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "navigation_menu_items_order_idx" ON "navigation_menu_items" USING btree ("_order");
  CREATE INDEX "navigation_menu_items_parent_id_idx" ON "navigation_menu_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_menu_items_page_idx" ON "navigation_menu_items" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_menu_items_locales_locale_parent_id_unique" ON "navigation_menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_menu_items_locales_parent_id_idx" ON "navigation_menu_items_locales" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "_pages_v_version_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navigation_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_menu_items_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "navigation_menu_items" CASCADE;
  DROP TABLE "navigation_menu_items_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_image_id_media_id_fk";

  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk";

  DROP INDEX "pages_hero_image_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "_pages_v_version_version_hero_image_idx";
  DROP INDEX "_pages_v_version_version_slug_idx";
  ALTER TABLE "pages" DROP COLUMN "hero_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN "content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content";
  DROP TYPE "public"."enum_navigation_menu_items_destination";`)
}
