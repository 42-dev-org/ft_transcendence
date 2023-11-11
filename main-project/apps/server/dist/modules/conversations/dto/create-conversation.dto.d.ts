import { ConversationTypes } from 'db';
export declare class CreateConversationDto {
    name: string;
    participants: string[];
    admins: string[];
    description: string;
    tags: string[];
    type: ConversationTypes;
}
