/*
  Warnings:

  - You are about to drop the column `product_detail_id` on the `product_wizards` table. All the data in the column will be lost.
  - You are about to drop the column `product_detail_id` on the `wizard_options` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `product_wizards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_wizards" DROP CONSTRAINT "product_wizards_product_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "wizard_options" DROP CONSTRAINT "wizard_options_product_detail_id_fkey";

-- AlterTable
ALTER TABLE "product_wizards" DROP COLUMN "product_detail_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wizard_options" DROP COLUMN "product_detail_id",
ADD COLUMN     "product_id" TEXT;

-- AddForeignKey
ALTER TABLE "wizard_options" ADD CONSTRAINT "wizard_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_wizards" ADD CONSTRAINT "product_wizards_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
