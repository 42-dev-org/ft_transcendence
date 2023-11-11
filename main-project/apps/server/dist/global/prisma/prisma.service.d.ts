import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'db';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
}
