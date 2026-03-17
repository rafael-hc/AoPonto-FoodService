-- CreateTable
CREATE TABLE "cfops" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT,
    "fullCode" TEXT,

    CONSTRAINT "cfops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchens" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "printer" TEXT NOT NULL,
    "version_reg" INTEGER,
    "version_sync" INTEGER,

    CONSTRAINT "kitchens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labels" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'P',
    "external_id" TEXT NOT NULL,
    "delete_date" TIMESTAMP(3),
    "version_reg" INTEGER,
    "version_sync" INTEGER,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_indicators" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,

    CONSTRAINT "production_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "icms_modalities" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "icms_modalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_origins" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT,
    "fullCode" TEXT,

    CONSTRAINT "product_origins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_types" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_situations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "fullCode" TEXT,

    CONSTRAINT "tax_situations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cofins_tax_situations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullCode" TEXT,
    "aliquot_type_nfce" TEXT,
    "aliquot_type_cfe" TEXT,

    CONSTRAINT "cofins_tax_situations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pis_tax_situations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullCode" TEXT,
    "aliquot_type_nfce" TEXT,
    "aliquot_type_cfe" TEXT,

    CONSTRAINT "pis_tax_situations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "initials" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_configurations" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cfop_id" TEXT NOT NULL,
    "origin_id" TEXT NOT NULL,
    "tax_situation_id" TEXT NOT NULL,
    "icms_rate" DECIMAL(16,4),
    "icms_red_base_rate" DECIMAL(16,4),
    "fcp_rate" DECIMAL(16,4),
    "mva_st_rate" DECIMAL(16,4),
    "red_base_icms_st_rate" DECIMAL(16,4),
    "icms_st_rate" DECIMAL(16,4),
    "fcp_st_rate" DECIMAL(16,4),
    "pis_tax_situation_code" TEXT,
    "cofins_tax_situation_code" TEXT,
    "pis_rate" DECIMAL(16,4),
    "cofins_rate" DECIMAL(16,4),
    "beneficio_fiscal" TEXT,

    CONSTRAINT "tax_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(500),
    "sale_price" DECIMAL(16,4) NOT NULL,
    "cost_price" DECIMAL(16,4),
    "min_stock" INTEGER NOT NULL DEFAULT 0,
    "current_stock" INTEGER NOT NULL DEFAULT 0,
    "method_of_preparation" VARCHAR(5000),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "discontinued" BOOLEAN NOT NULL DEFAULT false,
    "discontinued_char" CHAR(1),
    "ncm" CHAR(8),
    "cest" CHAR(7),
    "custom_code" VARCHAR(15),
    "label_id" TEXT,
    "kitchen_id" TEXT,
    "unit_id" TEXT,
    "product_type_id" TEXT,
    "production_indicator_id" TEXT,
    "cfop_id" TEXT,
    "origin_id" TEXT,
    "icms_modality_id" TEXT,
    "pis_tax_situation_id" TEXT,
    "cofins_tax_situation_id" TEXT,
    "tax_configuration_id" TEXT,
    "is_service_tax_exempt" BOOLEAN NOT NULL DEFAULT false,
    "is_kitchen_item" BOOLEAN NOT NULL DEFAULT true,
    "use_mobile_comanda" BOOLEAN NOT NULL DEFAULT true,
    "use_digital_menu" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cfops_code_key" ON "cfops"("code");

-- CreateIndex
CREATE UNIQUE INDEX "kitchens_code_key" ON "kitchens"("code");

-- CreateIndex
CREATE UNIQUE INDEX "labels_code_key" ON "labels"("code");

-- CreateIndex
CREATE UNIQUE INDEX "labels_external_id_key" ON "labels"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "production_indicators_code_key" ON "production_indicators"("code");

-- CreateIndex
CREATE UNIQUE INDEX "icms_modalities_code_key" ON "icms_modalities"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_origins_code_key" ON "product_origins"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_types_code_key" ON "product_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tax_situations_code_key" ON "tax_situations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cofins_tax_situations_code_key" ON "cofins_tax_situations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "pis_tax_situations_code_key" ON "pis_tax_situations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "units_code_key" ON "units"("code");

-- CreateIndex
CREATE UNIQUE INDEX "units_initials_key" ON "units"("initials");

-- CreateIndex
CREATE UNIQUE INDEX "tax_configurations_code_key" ON "tax_configurations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_tax_configuration_id_key" ON "products"("tax_configuration_id");

-- AddForeignKey
ALTER TABLE "tax_configurations" ADD CONSTRAINT "tax_configurations_cfop_id_fkey" FOREIGN KEY ("cfop_id") REFERENCES "cfops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_configurations" ADD CONSTRAINT "tax_configurations_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "product_origins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_configurations" ADD CONSTRAINT "tax_configurations_tax_situation_id_fkey" FOREIGN KEY ("tax_situation_id") REFERENCES "tax_situations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_kitchen_id_fkey" FOREIGN KEY ("kitchen_id") REFERENCES "kitchens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_production_indicator_id_fkey" FOREIGN KEY ("production_indicator_id") REFERENCES "production_indicators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cfop_id_fkey" FOREIGN KEY ("cfop_id") REFERENCES "cfops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "product_origins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_icms_modality_id_fkey" FOREIGN KEY ("icms_modality_id") REFERENCES "icms_modalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_pis_tax_situation_id_fkey" FOREIGN KEY ("pis_tax_situation_id") REFERENCES "pis_tax_situations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cofins_tax_situation_id_fkey" FOREIGN KEY ("cofins_tax_situation_id") REFERENCES "cofins_tax_situations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_tax_configuration_id_fkey" FOREIGN KEY ("tax_configuration_id") REFERENCES "tax_configurations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
