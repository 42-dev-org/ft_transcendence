import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChatDto: UpdateChatDto): string;
    remove(id: string): string;
}
