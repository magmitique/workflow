import bcrypt from 'bcryptjs';
import type { PrismaClient } from '../../generated/prisma/index.js';
import type { UserCreateInput, UserUpdateInput } from '@apio/shared';

const SALT_ROUNDS = 12;

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async list() {
    return this.prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: 'asc' },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  async create(data: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: hashedPassword,
      },
      select: userSelect,
    });
  }

  async update(id: string, data: UserUpdateInput) {
    const updateData: Record<string, unknown> = {};
    if (data.email !== undefined) updateData.email = data.email;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: userSelect,
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
