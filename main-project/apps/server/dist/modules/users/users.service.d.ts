import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { MediaService } from 'src/global/media/providers/media.service';
import { MediaFile } from 'src/shared/types/media';
export declare class UsersService {
    private readonly repository;
    private readonly media;
    constructor(repository: UsersRepository, media: MediaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<any>;
    changeProfilePicture(file: MediaFile, uid: string): Promise<{
        status: string;
        data: any;
    }>;
    changeCoverPicture(file: MediaFile, uid: string): Promise<true | {
        status: string;
        data: any;
    }>;
}
