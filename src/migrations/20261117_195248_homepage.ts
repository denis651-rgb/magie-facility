import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navigation" ADD COLUMN "home_page_id" integer;
  ALTER TABLE "navigation" ADD CONSTRAINT "navigation_home_page_id_pages_id_fk" FOREIGN KEY ("home_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "navigation_home_page_idx" ON "navigation" USING btree ("home_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navigation" DROP CONSTRAINT "navigation_home_page_id_pages_id_fk";

  DROP INDEX "navigation_home_page_idx";
  ALTER TABLE "navigation" DROP COLUMN "home_page_id";`)
}
