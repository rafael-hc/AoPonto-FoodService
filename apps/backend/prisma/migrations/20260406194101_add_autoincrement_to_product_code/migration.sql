-- AlterTable
CREATE SEQUENCE products_code_seq;
ALTER TABLE "products" ALTER COLUMN "code" SET DEFAULT nextval('products_code_seq');
ALTER SEQUENCE products_code_seq OWNED BY "products"."code";
