import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class ConversationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(conversation: Prisma.ConversationCreateInput): Promise<any>;
    findAll(): Promise<any>;
    findMeAll(uid: string): Promise<any>;
    findOne(uid: string): Promise<any>;
    update(uid: string, updates: Prisma.ConversationUpdateInput): Promise<any>;
    delete(uid: string): Promise<any>;
    deleteAll(): Promise<any>;
    deleteParticipant(uid: string, cnvUid: string): Promise<any>;
    deleteAdmin(uid: string, cnvUid: string): Promise<any>;
    addParticipant(uid: string, cnvUid: string): Promise<any>;
    addAdmin(uid: string, cnvUid: string): Promise<any>;
}
