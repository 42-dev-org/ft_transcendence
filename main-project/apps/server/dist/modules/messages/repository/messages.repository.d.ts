import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class MessagesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMany(createMessages: Prisma.MessageCreateManyInput[]): Promise<any>;
    create(createMessage: Prisma.MessageCreateInput): Promise<any>;
    findAllInConversation(cnvId: string, userId: string): Promise<any>;
    findOne(id: string, conversation?: boolean): Promise<any>;
    update(id: string, updateMessage: Prisma.MessageUpdateInput): Promise<any>;
    remove(id: string): Promise<any>;
}
