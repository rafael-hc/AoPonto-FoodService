/*
  Warnings:

  - You are about to drop the column `code` on the `kitchens` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `labels` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `product_types` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `units` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "kitchens_code_key";

-- DropIndex
DROP INDEX "labels_code_key";

-- DropIndex
DROP INDEX "product_types_code_key";

-- DropIndex
DROP INDEX "units_code_key";

-- AlterTable
ALTER TABLE "kitchens" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "labels" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "product_types" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "units" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "user_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("user_id","permission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
