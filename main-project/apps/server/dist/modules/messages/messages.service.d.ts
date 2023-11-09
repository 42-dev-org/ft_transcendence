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
        data: any;
    }>;
    findAll(userId: string, cnvId: string): Promise<{
        status: string;
        result: any;
        data: any;
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: any;
    }>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<{
        status: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
