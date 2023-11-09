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
    }): Promise<any>;
}
export {};
