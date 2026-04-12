-- CreateEnum
CREATE TYPE "WizardContext" AS ENUM ('PRODUCT', 'COMBO');

-- AlterTable
ALTER TABLE "wizard_questions" ADD COLUMN     "context" "WizardContext" NOT NULL DEFAULT 'PRODUCT';
