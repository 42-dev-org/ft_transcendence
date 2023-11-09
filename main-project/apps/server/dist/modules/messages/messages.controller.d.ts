import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from '@prisma/client';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, { uid }: User): Promise<{
        status: string;
        data: any;
    }>;
    findAll({ uid }: User, cnvId: string): Promise<{
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
