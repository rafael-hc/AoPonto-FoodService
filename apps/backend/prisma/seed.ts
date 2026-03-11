import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('senha123', 8);

  const adminContact = await prisma.contact.create({
    data: {
      name: 'Administrador Antigravity',
      email: 'admin@aoponto.com.br',
      document: '000.000.000-00',
    },
  });

  await prisma.user.create({
    data: {
      login: 'admin',
      password: passwordHash,
      role: Role.ADMIN,
      contactId: adminContact.id,
    },
  });

  console.log('Seed completed: Admin user created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
