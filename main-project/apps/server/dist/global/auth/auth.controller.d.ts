import { AuthService } from './auth.service';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateUserDto, req: Request): Promise<{
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
    forgotPassword(email: string, req: Request): Promise<{
        status: string;
    }>;
    resetPassword(password: string, resetToken: string, res: Response): Promise<void>;
    updatePassword(passPayload: {
        password: string;
        oldPassword: string;
    }, { uid }: {
        uid: any;
    }, res: Response): Promise<void>;
}
