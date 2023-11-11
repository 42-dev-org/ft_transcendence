import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'db';
import { MediaFile } from 'src/shared/types/media';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }[]>;
    findOne(uid: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    update(uid: string, updateUserDto: UpdateUserDto): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    remove(uid: string): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    findMe({ uid }: User): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    deleteMe({ uid }: User): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    updateMe({ uid }: User, dto: UpdateUserDto): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        passwordChangedAt: Date;
        passwordResetToken: string;
        passwordResetTokenExpireDate: Date;
        profileImage: string;
        coverImage: string;
        firstName: string;
        lastName: string;
        country: string;
        state: string;
        roles: "User"[];
        status: "Accepted";
        ip: string;
        phoneNumber: string;
    }>;
    changeProfileImage(user: User, file: MediaFile): Promise<{
        status: string;
        data: {
            uid: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            passwordChangedAt: Date;
            passwordResetToken: string;
            passwordResetTokenExpireDate: Date;
            profileImage: string;
            coverImage: string;
            firstName: string;
            lastName: string;
            country: string;
            state: string;
            roles: "User"[];
            status: "Accepted";
            ip: string;
            phoneNumber: string;
        };
    }>;
    changeCoverImage(user: User, file: MediaFile): Promise<true | {
        status: string;
        data: {
            uid: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            passwordChangedAt: Date;
            passwordResetToken: string;
            passwordResetTokenExpireDate: Date;
            profileImage: string;
            coverImage: string;
            firstName: string;
            lastName: string;
            country: string;
            state: string;
            roles: "User"[];
            status: "Accepted";
            ip: string;
            phoneNumber: string;
        };
    }>;
}
