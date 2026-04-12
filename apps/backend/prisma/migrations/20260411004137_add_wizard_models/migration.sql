-- CreateTable
CREATE TABLE "wizard_questions" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "qtd_respostas_min" SMALLINT NOT NULL DEFAULT 0,
    "qtd_respostas_max" SMALLINT NOT NULL DEFAULT 1,
    "qtd_itens_min" DECIMAL(16,4) NOT NULL DEFAULT 0,
    "qtd_itens_max" DECIMAL(16,4) NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "wizard_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wizard_options" (
    "id" TEXT NOT NULL,
    "wizard_question_id" TEXT NOT NULL,
    "product_detail_id" TEXT,
    "description" TEXT,
    "promo_price" DECIMAL(16,4),
    "max_qty" DECIMAL(16,4) NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "wizard_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_wizards" (
    "id" TEXT NOT NULL,
    "product_detail_id" TEXT NOT NULL,
    "wizard_question_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_wizards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wizard_questions_codigo_key" ON "wizard_questions"("codigo");

-- AddForeignKey
ALTER TABLE "wizard_options" ADD CONSTRAINT "wizard_options_wizard_question_id_fkey" FOREIGN KEY ("wizard_question_id") REFERENCES "wizard_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wizard_options" ADD CONSTRAINT "wizard_options_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "product_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_wizards" ADD CONSTRAINT "product_wizards_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "product_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_wizards" ADD CONSTRAINT "product_wizards_wizard_question_id_fkey" FOREIGN KEY ("wizard_question_id") REFERENCES "wizard_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
