import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { UsersRepository } from '../../modules/users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/global/mail/mail.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly repository;
    private readonly jwt;
    private readonly mailer;
    private readonly config;
    constructor(repository: UsersRepository, jwt: JwtService, mailer: MailService, config: ConfigService);
    create(dto: CreateUserDto, ip: string): Promise<{
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
        token: string;
    }>;
    login(email: string, password: string): Promise<{
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
        token: string;
    }>;
    forgotPassword(email: string, host: string, protocol: string): Promise<any>;
    resetPassword(resetToken: string, password: string): Promise<string>;
    updatePassword({ oldPassword, newPassword }: {
        oldPassword: any;
        newPassword: any;
    }, uid: string): Promise<string>;
    private hash;
    private compare;
    private generateToken;
}
