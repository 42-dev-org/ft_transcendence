import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class MediaRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.MediaCreateInput): Promise<any>;
    update(uid: string, data: Prisma.MediaUpdateInput): Promise<any>;
    delete(uid: string): Promise<any>;
    findOne(uid: string): Promise<any>;
    findAll(uid: string): Promise<any>;
    deleteFileByKey(key: string): Promise<any>;
}
