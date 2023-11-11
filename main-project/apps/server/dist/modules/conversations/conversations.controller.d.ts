import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto, UpdateUserMembershipInRoomDto } from './dto/update-conversation.dto';
import { User } from 'db';
import { MediaFile } from 'src/shared/types/media';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    create(createConversationDto: CreateConversationDto): Promise<{
        status: string;
        data: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        };
    }>;
    findMeAll({ uid }: User): Promise<{
        status: string;
        results: number;
        data: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }[];
    }>;
    findAll(): Promise<{
        status: string;
        results: number;
        data: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }[];
    }>;
    addParticipant(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<{
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }>;
    }>;
    deleteParticipant(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<{
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }>;
    }>;
    addAdmin(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<{
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }>;
    }>;
    deleteAdmin(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<{
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        }>;
    }>;
    addProfileImage(file: MediaFile, { uid }: User, cnvUid: string): Promise<{
        status: string;
        data: {
            uid: string;
            createdAt: Date;
            updatedAt: Date;
            mimtype: string;
            size: number;
            url: string;
            name: string;
            uploaderUid: string;
        };
    }>;
    deleteProfileImage(uid: string): Promise<{
        status: string;
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        };
    }>;
    update(id: string, updateConversationDto: UpdateConversationDto): Promise<{
        status: string;
        data: {
            uid: string;
            name: string;
            description: string;
            tags: string[];
            type: import("db").$Enums.ConversationTypes;
            profileImage: string;
        };
    }>;
    remove(id: string): Promise<void>;
}
