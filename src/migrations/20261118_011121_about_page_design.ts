import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_design" AS ENUM('standard', 'about');
  CREATE TYPE "public"."enum__pages_v_version_page_design" AS ENUM('standard', 'about');
  CREATE TABLE "pages_about_values" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar
  );

  CREATE TABLE "_pages_v_version_about_values" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "_uuid" varchar
  );

  ALTER TABLE "pages" ADD COLUMN "page_design" "enum_pages_page_design" DEFAULT 'standard';
  ALTER TABLE "pages" ADD COLUMN "about_first_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "about_second_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "about_banner_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_banner_subtitle" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_intro_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_intro_text" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_button_label" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_values_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_purpose_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_mission_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_mission" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_vision_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_vision" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "about_approved" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_design" "enum__pages_v_version_page_design" DEFAULT 'standard';
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_first_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_second_image_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_banner_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_banner_subtitle" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_intro_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_intro_text" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_button_label" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_values_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_purpose_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_mission_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_mission" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_vision_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_vision" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_about_approved" boolean DEFAULT false;
  ALTER TABLE "pages_about_values" ADD CONSTRAINT "pages_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_about_values" ADD CONSTRAINT "_pages_v_version_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_about_values_order_idx" ON "pages_about_values" USING btree ("_order");
  CREATE INDEX "pages_about_values_parent_id_idx" ON "pages_about_values" USING btree ("_parent_id");
  CREATE INDEX "pages_about_values_locale_idx" ON "pages_about_values" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_about_values_order_idx" ON "_pages_v_version_about_values" USING btree ("_order");
  CREATE INDEX "_pages_v_version_about_values_parent_id_idx" ON "_pages_v_version_about_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_about_values_locale_idx" ON "_pages_v_version_about_values" USING btree ("_locale");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_about_first_image_id_media_id_fk" FOREIGN KEY ("about_first_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_about_second_image_id_media_id_fk" FOREIGN KEY ("about_second_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_about_first_image_id_media_id_fk" FOREIGN KEY ("version_about_first_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_about_second_image_id_media_id_fk" FOREIGN KEY ("version_about_second_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_about_about_first_image_idx" ON "pages" USING btree ("about_first_image_id");
  CREATE INDEX "pages_about_about_second_image_idx" ON "pages" USING btree ("about_second_image_id");
  CREATE INDEX "_pages_v_version_about_version_about_first_image_idx" ON "_pages_v" USING btree ("version_about_first_image_id");
  CREATE INDEX "_pages_v_version_about_version_about_second_image_idx" ON "_pages_v" USING btree ("version_about_second_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_about_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_about_values" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_about_values" CASCADE;
  DROP TABLE "_pages_v_version_about_values" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_about_first_image_id_media_id_fk";

  ALTER TABLE "pages" DROP CONSTRAINT "pages_about_second_image_id_media_id_fk";

  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_about_first_image_id_media_id_fk";

  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_about_second_image_id_media_id_fk";

  DROP INDEX "pages_about_about_first_image_idx";
  DROP INDEX "pages_about_about_second_image_idx";
  DROP INDEX "_pages_v_version_about_version_about_first_image_idx";
  DROP INDEX "_pages_v_version_about_version_about_second_image_idx";
  ALTER TABLE "pages" DROP COLUMN "page_design";
  ALTER TABLE "pages" DROP COLUMN "about_first_image_id";
  ALTER TABLE "pages" DROP COLUMN "about_second_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN "about_banner_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_banner_subtitle";
  ALTER TABLE "pages_locales" DROP COLUMN "about_intro_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_intro_text";
  ALTER TABLE "pages_locales" DROP COLUMN "about_button_label";
  ALTER TABLE "pages_locales" DROP COLUMN "about_values_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_purpose_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_mission_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_mission";
  ALTER TABLE "pages_locales" DROP COLUMN "about_vision_title";
  ALTER TABLE "pages_locales" DROP COLUMN "about_vision";
  ALTER TABLE "pages_locales" DROP COLUMN "about_approved";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_design";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_first_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_second_image_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_banner_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_banner_subtitle";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_intro_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_intro_text";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_button_label";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_values_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_purpose_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_mission_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_mission";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_vision_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_vision";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_about_approved";
  DROP TYPE "public"."enum_pages_page_design";
  DROP TYPE "public"."enum__pages_v_version_page_design";`)
}
