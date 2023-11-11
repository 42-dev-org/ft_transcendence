import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesRepository } from './repository/messages.repository';
import { MediaService } from 'src/global/media/providers/media.service';
export declare class MessagesService {
    private readonly repository;
    private readonly mediaServices;
    constructor(repository: MessagesRepository, mediaServices: MediaService);
    create(createMessageDto: CreateMessageDto, uid: string): Promise<{
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
    findAll(userId: string, cnvId: string): Promise<{
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
