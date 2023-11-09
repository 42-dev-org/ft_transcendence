import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto, UpdateUserMembershipInRoomDto } from './dto/update-conversation.dto';
import { User } from '@prisma/client';
import { MediaFile } from 'src/shared/types/media';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    create(createConversationDto: CreateConversationDto): Promise<{
        status: string;
        data: any;
    }>;
    findMeAll({ uid }: User): Promise<{
        status: string;
        results: any;
        data: any;
    }>;
    findAll(): Promise<{
        status: string;
        results: any;
        data: any;
    }>;
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
    addProfileImage(file: MediaFile, { uid }: User, cnvUid: string): Promise<{
        status: string;
        data: any;
    }>;
    deleteProfileImage(uid: string): Promise<{
        status: string;
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
}
