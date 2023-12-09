import { PassportModule } from '@nestjs/passport';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/auth.jwt.startegy';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (conf: ConfigService) => {
        return {
          secret: conf.get<string>('JWT_SECRET_TOKEN'),
          signOptions: {
            expiresIn: conf.get<string>('JWT_TOKEN_EXPIRES_DATE'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
