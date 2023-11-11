import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { JwtPaylod } from '../types/auth';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UsersRepository, conf: ConfigService);
    validate(payload: JwtPaylod & {
        iat: number;
    }): Promise<{
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
}
export {};
