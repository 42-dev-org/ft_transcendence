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
        data: any;
    }>;
    findMeAll(uid: string): Promise<{
        status: string;
        results: any;
        data: any;
    }>;
    findAll(): Promise<{
        status: string;
        results: any;
        data: any;
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: any;
    }>;
    update(id: string, updateConversationDto: UpdateConversationDto): Promise<{
        status: string;
        data: any;
    }>;
    remove(id: string): Promise<void>;
    addParticipant(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<any>;
    }>;
    deleteParticipant(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<any>;
    }>;
    addAdmin(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<any>;
    }>;
    deleteAdmin(dto: UpdateUserMembershipInRoomDto): Promise<{
        status: string;
        data: Promise<any>;
    }>;
    addProfileImage(file: MediaFile, cnvId: string, userId: string): Promise<{
        status: string;
        data: any;
    }>;
    deleteProfileImage(cnvId: string): Promise<{
        status: string;
    }>;
}
