import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "external_media" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "url" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "services_rels" ADD COLUMN "external_media_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "external_media_id" integer;
  ALTER TABLE "projects_rels" ADD COLUMN "external_media_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "external_media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "external_media_id" integer;
  CREATE INDEX "external_media_updated_at_idx" ON "external_media" USING btree ("updated_at");
  CREATE INDEX "external_media_created_at_idx" ON "external_media" USING btree ("created_at");
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_external_media_fk" FOREIGN KEY ("external_media_id") REFERENCES "public"."external_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_external_media_fk" FOREIGN KEY ("external_media_id") REFERENCES "public"."external_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_external_media_fk" FOREIGN KEY ("external_media_id") REFERENCES "public"."external_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_external_media_fk" FOREIGN KEY ("external_media_id") REFERENCES "public"."external_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_external_media_fk" FOREIGN KEY ("external_media_id") REFERENCES "public"."external_media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_rels_external_media_id_idx" ON "services_rels" USING btree ("external_media_id");
  CREATE INDEX "_services_v_rels_external_media_id_idx" ON "_services_v_rels" USING btree ("external_media_id");
  CREATE INDEX "projects_rels_external_media_id_idx" ON "projects_rels" USING btree ("external_media_id");
  CREATE INDEX "_projects_v_rels_external_media_id_idx" ON "_projects_v_rels" USING btree ("external_media_id");
  CREATE INDEX "payload_locked_documents_rels_external_media_id_idx" ON "payload_locked_documents_rels" USING btree ("external_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_external_media_fk";

  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_external_media_fk";

  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_external_media_fk";

  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_external_media_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_external_media_fk";

  DROP INDEX "services_rels_external_media_id_idx";
  DROP INDEX "_services_v_rels_external_media_id_idx";
  DROP INDEX "projects_rels_external_media_id_idx";
  DROP INDEX "_projects_v_rels_external_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_external_media_id_idx";
  ALTER TABLE "services_rels" DROP COLUMN "external_media_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "external_media_id";
  ALTER TABLE "projects_rels" DROP COLUMN "external_media_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "external_media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "external_media_id";
  DROP TABLE "external_media";`)
}
