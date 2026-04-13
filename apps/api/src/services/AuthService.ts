import bcrypt from 'bcryptjs';
import type { PrismaClient } from '../../generated/prisma/index.js';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }
}
