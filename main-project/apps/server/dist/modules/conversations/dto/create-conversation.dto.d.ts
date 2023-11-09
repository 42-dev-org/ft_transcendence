import { ConversationTypes } from '@prisma/client';
export declare class CreateConversationDto {
    name: string;
    participants: string[];
    admins: string[];
    description: string;
    tags: string[];
    type: ConversationTypes;
}
