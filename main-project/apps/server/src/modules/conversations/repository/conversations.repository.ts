import { Injectable } from '@nestjs/common';
import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class ConversationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(conversation: Prisma.ConversationCreateInput) {
    return this.prisma.conversation.create({
      data: conversation,
      //   include: { Messages: true },
    });
  }

  public async findAll() {
    return this.prisma.conversation.findMany({
      //   include: { Messages: true },
    });
  }

  public async findMeAll(uid: string) {
    return this.prisma.conversation.findMany({
      where: { participants: { some: { uid } } },
      //   include: { Messages: true },
    });
  }

  public async findOne(uid: string) {
    return this.prisma.conversation.findUnique({
      where: { uid },
      //   include: { Messages: true },
    });
  }

  public async update(uid: string, updates: Prisma.ConversationUpdateInput) {
    return this.prisma.conversation.update({
      where: { uid },
      data: updates,
      //   include: { Messages: true },
    });
  }

  public async delete(uid: string) {
    return this.prisma.conversation.delete({ where: { uid } });
  }

  public async deleteAll() {
    return this.prisma.conversation.deleteMany();
  }

  public async deleteParticipant(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { participants: { disconnect: { uid } } },
    });
  }

  public async deleteAdmin(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { disconnect: { uid } } },
    });
  }

  public async addParticipant(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { participants: { connect: { uid } } },
    });
  }

  public async addAdmin(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { connect: { uid } } },
    });
  }
}
