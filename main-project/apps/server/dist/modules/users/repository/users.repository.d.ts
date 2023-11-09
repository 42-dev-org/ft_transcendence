import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<any>;
    findOne(uid: string): Promise<any>;
    findAll(): Promise<any>;
    updateOne(data: Prisma.UserUpdateInput, uid: string): Promise<any>;
    deleteOne(uid: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findByPasswordResetToken(passwordResetToken: string): Promise<any>;
}
