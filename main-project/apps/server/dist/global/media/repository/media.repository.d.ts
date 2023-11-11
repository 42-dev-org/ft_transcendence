import { Prisma } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class MediaRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.MediaCreateInput): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
    update(uid: string, data: Prisma.MediaUpdateInput): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
    delete(uid: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
    findOne(uid: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
    findAll(uid: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }[]>;
    deleteFileByKey(key: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
}
