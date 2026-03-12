import { Contact } from '@/users/domain/entities/contact';
import { ContactsRepository } from '@/users/domain/repositories/contacts-repository';
import { PrismaService } from '../prisma.service';
import { PrismaContactMapper } from '../mappers/prisma-contact-mapper';
import { DateUtils } from '@/shared/utils/date-utils';

export class PrismaContactsRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findFirst({
      where: { id, deletedAt: null },
    });

    if (!contact) return null;

    return PrismaContactMapper.toDomain(contact);
  }

  async findByDocument(document: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findFirst({
      where: { document, deletedAt: null },
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

  async delete(contact: Contact): Promise<void> {
    await this.prisma.contact.update({
      where: { id: contact.id },
      data: {
        deletedAt: DateUtils.getBrasiliaDate(),
        active: false
      },
    });
  }
}
