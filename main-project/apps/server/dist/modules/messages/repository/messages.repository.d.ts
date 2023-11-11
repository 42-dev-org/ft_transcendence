import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class MessagesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMany(createMessages: Prisma.MessageCreateManyInput[]): Promise<Prisma.BatchPayload>;
    create(createMessage: Prisma.MessageCreateInput): Promise<{
        uid: string;
        content: string;
        senderUid: string;
        mediaUid: string;
        conversationUid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllInConversation(cnvId: string, userId: string): Promise<{
        uid: string;
        content: string;
        senderUid: string;
        mediaUid: string;
        conversationUid: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, conversation?: boolean): Promise<{
        conversation: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        };
    } & {
        uid: string;
        content: string;
        senderUid: string;
        mediaUid: string;
        conversationUid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateMessage: Prisma.MessageUpdateInput): Promise<{
        uid: string;
        content: string;
        senderUid: string;
        mediaUid: string;
        conversationUid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        uid: string;
        content: string;
        senderUid: string;
        mediaUid: string;
        conversationUid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
