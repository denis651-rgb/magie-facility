import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" ADD COLUMN "whatsapp_greeting" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "whatsapp_welcome" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" DROP COLUMN "whatsapp_greeting";
  ALTER TABLE "site_settings_locales" DROP COLUMN "whatsapp_welcome";`)
}
