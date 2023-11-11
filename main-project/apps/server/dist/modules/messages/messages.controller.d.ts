import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from 'db';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, { uid }: User): Promise<{
        status: string;
        data: {
            uid: string;
            content: string;
            senderUid: string;
            mediaUid: string;
            conversationUid: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll({ uid }: User, cnvId: string): Promise<{
        status: string;
        result: number;
        data: {
            uid: string;
            content: string;
            senderUid: string;
            mediaUid: string;
            conversationUid: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: {
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
        };
    }>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<{
        status: string;
        data: {
            uid: string;
            content: string;
            senderUid: string;
            mediaUid: string;
            conversationUid: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
