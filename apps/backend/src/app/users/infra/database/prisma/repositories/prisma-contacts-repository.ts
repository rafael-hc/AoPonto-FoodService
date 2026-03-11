import { Contact } from '@/users/domain/entities/contact';
import { ContactsRepository } from '@/users/domain/repositories/contacts-repository';
import { PrismaService } from '../prisma.service';
import { PrismaContactMapper } from '../mappers/prisma-contact-mapper';

export class PrismaContactsRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) return null;

    return PrismaContactMapper.toDomain(contact);
  }

  async findByDocument(document: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findUnique({
      where: { document },
    });

    if (!contact) return null;

    return PrismaContactMapper.toDomain(contact);
  }

  async create(contact: Contact): Promise<void> {
    const data = PrismaContactMapper.toPrisma(contact);

    await this.prisma.contact.create({
      data,
    });
  }

  async save(contact: Contact): Promise<void> {
    const data = PrismaContactMapper.toPrisma(contact);

    await this.prisma.contact.update({
      where: { id: contact.id },
      data,
    });
  }
}
