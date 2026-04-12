import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const product = await prisma.product.findUnique({ where: { id: '67d64a86-8e4a-41ea-bef2-2bf53232c554' } })
  console.log('Produto encontrado:', product ? product.name : 'NÃO ENCONTRADO')
  await prisma.$disconnect()
}
main()
