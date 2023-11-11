import { Injectable } from '@nestjs/common';
import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MediaCreateInput) {
    return this.prisma.media.create({ data });
  }

  async update(uid: string, data: Prisma.MediaUpdateInput) {
    return this.prisma.media.update({ where: { uid }, data });
  }
  async delete(uid: string) {
    return this.prisma.media.delete({ where: { uid } });
  }
  async findOne(uid: string) {
    return this.prisma.media.findUnique({ where: { uid } });
  }
  async findAll(uid: string) {
    return this.prisma.media.findMany({ where: {} });
  }

  async deleteFileByKey(key: string) {
    return this.prisma.media.delete({ where: { url: key } });
  }
}
