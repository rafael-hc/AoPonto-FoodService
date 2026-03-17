-- CreateTable
CREATE TABLE "product_personalized" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "custom_guid" TEXT NOT NULL,
    "version_reg" SMALLINT,
    "version_sync" SMALLINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_personalized_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sizes" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "product_personalized_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "max_parts" SMALLINT NOT NULL DEFAULT 1,
    "custom_guid" TEXT NOT NULL,
    "version_reg" SMALLINT,
    "version_sync" SMALLINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_details" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_size_id" TEXT,
    "sale_price" DECIMAL(16,4) NOT NULL,
    "cost_price" DECIMAL(16,4),
    "current_stock" DECIMAL(16,4) DEFAULT 0,
    "min_stock" DECIMAL(16,4) DEFAULT 0,
    "is_stock_controlled" BOOLEAN NOT NULL DEFAULT false,
    "barcode" VARCHAR(14),
    "custom_guid" TEXT NOT NULL,
    "show_on_desktop" BOOLEAN NOT NULL DEFAULT true,
    "show_on_mobile" BOOLEAN NOT NULL DEFAULT true,
    "show_on_digital_menu" BOOLEAN NOT NULL DEFAULT true,
    "show_on_dino_menu" BOOLEAN NOT NULL DEFAULT true,
    "show_on_totem" BOOLEAN NOT NULL DEFAULT false,
    "paused_at" TIMESTAMP(3),
    "version_reg" SMALLINT,
    "version_sync" SMALLINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_personalized_code_key" ON "product_personalized"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_personalized_custom_guid_key" ON "product_personalized"("custom_guid");

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_code_key" ON "product_sizes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_custom_guid_key" ON "product_sizes"("custom_guid");

-- CreateIndex
CREATE UNIQUE INDEX "product_details_code_key" ON "product_details"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_details_custom_guid_key" ON "product_details"("custom_guid");

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_personalized_id_fkey" FOREIGN KEY ("product_personalized_id") REFERENCES "product_personalized"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_product_size_id_fkey" FOREIGN KEY ("product_size_id") REFERENCES "product_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
