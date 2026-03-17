import { Prisma, type Contact as PrismaContact } from '@prisma/client'
import { Contact } from '@/parties/domain/entities/contact'

export const PrismaContactMapper = {
  toDomain(raw: PrismaContact): Contact {
    return new Contact({
      id: raw.id,
      name: raw.name,
      active: raw.active,
      document: raw.document,
      email: raw.email,
      phone: raw.phone,
      mobile: raw.mobile,
      birthDate: raw.birthDate,
      address: raw.address,
      number: raw.number,
      complement: raw.complement,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      zipcode: raw.zipcode,
      creditLimit: Number(raw.creditLimit),
      currentBalance: Number(raw.currentBalance),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(contact: Contact): Prisma.ContactCreateInput {
    return {
      id: contact.id,
      name: contact.name,
      active: contact.active,
      document: contact.document,
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      birthDate: contact.birthDate,
      address: contact.address,
      number: contact.number,
      complement: contact.complement,
      neighborhood: contact.neighborhood,
      city: contact.city,
      state: contact.state,
      zipcode: contact.zipcode,
      creditLimit: new Prisma.Decimal(contact.creditLimit ?? 0),
      currentBalance: new Prisma.Decimal(contact.currentBalance ?? 0),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
      deletedAt: contact.deletedAt
    }
  }
}
