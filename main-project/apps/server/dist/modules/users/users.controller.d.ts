import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { MediaFile } from 'src/shared/types/media';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<any>;
    findOne(uid: string): Promise<any>;
    update(uid: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(uid: string): Promise<any>;
    findMe({ uid }: User): Promise<any>;
    deleteMe({ uid }: User): Promise<any>;
    updateMe({ uid }: User, dto: UpdateUserDto): Promise<any>;
    changeProfileImage(user: User, file: MediaFile): Promise<{
        status: string;
        data: any;
    }>;
    changeCoverImage(user: User, file: MediaFile): Promise<true | {
        status: string;
        data: any;
    }>;
}
