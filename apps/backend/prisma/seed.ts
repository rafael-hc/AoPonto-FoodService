import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const passwordHash = await bcrypt.hash('senha123', 12)
  console.log('Seed: Creating initial admin...')

  const adminContact = await prisma.contact.upsert({
    where: { document: '000.000.000-00' },
    update: {},
    create: {
      name: 'Administrador AoPonto',
      email: 'admin@aoponto.com.br',
      document: '000.000.000-00'
    }
  })

  await prisma.user.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      login: 'admin',
      password: passwordHash,
      role: Role.ADMIN,
      contactId: adminContact.id,
      passwordChangeRequired: true
    }
  })

  console.log('Seed: Creating default units...')
  await prisma.unit.upsert({
    where: { initials: 'UN' },
    update: {},
    create: { initials: 'UN', description: 'Unidade' }
  })

  await prisma.unit.upsert({
    where: { initials: 'KG' },
    update: {},
    create: { initials: 'KG', description: 'Quilos' }
  })

  await prisma.unit.upsert({
    where: { initials: 'L' },
    update: {},
    create: { initials: 'L', description: 'Litros' }
  })

  console.log('Seed: Creating default product types...')
  await prisma.productType.upsert({
    where: { id: 'd4e4e297-52e9-4183-8ac3-f48cc75fb89e' },
    update: {},
    create: {
      id: 'd4e4e297-52e9-4183-8ac3-f48cc75fb89e',
      description: 'Produto'
    }
  })

  await prisma.productType.upsert({
    where: { id: 'b0dff670-38ad-4917-8952-1314a6e0d7cb' },
    update: {},
    create: {
      id: 'b0dff670-38ad-4917-8952-1314a6e0d7cb',
      description: 'Complemento'
    }
  })

  console.log('Seed completed: Admin, units and product types created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
