import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto, UpdateUserMembershipInRoomDto } from './dto/update-conversation.dto';
import { ConversationsRepository } from './repository/conversations.repository';
import { MediaFile } from 'src/shared/types/media';
import { MediaService } from 'src/global/media/providers/media.service';
export declare class ConversationsService {
    private readonly repository;
    private readonly media;
    constructor(repository: ConversationsRepository, media: MediaService);
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
    findMeAll(uid: string): Promise<{
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
    addProfileImage(file: MediaFile, cnvId: string, userId: string): Promise<{
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
    deleteProfileImage(cnvId: string): Promise<{
        status: string;
    }>;
}
