import { Injectable } from '@nestjs/common';
import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class MessagesRepository {
  public constructor(private readonly prisma: PrismaService) {}

  async createMany(createMessages: Prisma.MessageCreateManyInput[]) {
    return this.prisma.message.createMany({ data: createMessages });
  }

  async create(createMessage: Prisma.MessageCreateInput) {
    return this.prisma.message.create({ data: createMessage , select: {
      sender: true,
      content: true,
      conversationUid: true,
      createdAt: true,
      updatedAt: true,
      uid: true,
      senderUid: true,
    }});
  }

  async findAllInConversation(cnvId: string, userId: string) {
    return this.prisma.message.findMany({
      where: {
        AND: [
          { conversationUid: cnvId },
          { conversation: { participants: { some: { uid: userId } } } },
        ],
      },
    });
  }

  async findOne(id: string, conversation = false) {
    return this.prisma.message.findUnique({
      where: { uid: id },
      include: { conversation },
    });
  }

  async update(id: string, updateMessage: Prisma.MessageUpdateInput) {
    return this.prisma.message.update({
      where: { uid: id },
      data: updateMessage,
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({ where: { uid: id } });
  }
}
