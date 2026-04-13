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

  const adminContact = await prisma.contact.create({
    data: {
      name: 'Administrador AoPonto',
      email: 'admin@aoponto.com.br',
      document: '000.000.000-00'
    }
  })

  await prisma.user.create({
    data: {
      login: 'admin',
      password: passwordHash,
      role: Role.ADMIN,
      contactId: adminContact.id,
      passwordChangeRequired: true
    }
  })

  console.log('Seed completed: Admin user created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
