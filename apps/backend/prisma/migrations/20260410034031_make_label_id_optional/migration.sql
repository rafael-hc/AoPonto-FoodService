-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_label_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "label_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "system_settings" (
    "id" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "value" TEXT,
    "type" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_parameter_key" ON "system_settings"("parameter");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
