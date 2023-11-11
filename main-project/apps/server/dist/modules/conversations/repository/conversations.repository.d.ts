import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class ConversationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(conversation: Prisma.ConversationCreateInput): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    findAll(): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }[]>;
    findMeAll(uid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }[]>;
    findOne(uid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    update(uid: string, updates: Prisma.ConversationUpdateInput): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    delete(uid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    deleteAll(): Promise<Prisma.BatchPayload>;
    deleteParticipant(uid: string, cnvUid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    deleteAdmin(uid: string, cnvUid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    addParticipant(uid: string, cnvUid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
    addAdmin(uid: string, cnvUid: string): Promise<{
        uid: string;
        name: string;
        description: string;
        tags: string[];
        type: import("db").$Enums.ConversationTypes;
        profileImage: string;
    }>;
}
