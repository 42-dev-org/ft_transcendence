import { Injectable } from '@nestjs/common';
import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(uid: string) {
    return this.prisma.user.findUnique({ where: { uid } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateOne(data: Prisma.UserUpdateInput, uid: string) {
    return this.prisma.user.update({ data, where: { uid } });
  }

  async deleteOne(uid: string) {
    return this.prisma.user.delete({ where: { uid } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findByPasswordResetToken(passwordResetToken: string) {
    return this.prisma.user.findFirst({ where: { passwordResetToken } });
  }
}
