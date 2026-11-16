import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "company_settings_social_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "platform" varchar NOT NULL,
    "url" varchar NOT NULL
  );

  ALTER TABLE "service_categories_locales" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "company_settings_social_links" ADD CONSTRAINT "company_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "company_settings_social_links_order_idx" ON "company_settings_social_links" USING btree ("_order");
  CREATE INDEX "company_settings_social_links_parent_id_idx" ON "company_settings_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_settings_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "company_settings_social_links" CASCADE;
  ALTER TABLE "service_categories_locales" ALTER COLUMN "slug" SET NOT NULL;`)
}
