import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { UsersRepository } from '../../modules/users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from 'db';
import { JwtPaylod } from './types/auth';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/global/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly jwt: JwtService,
    private readonly mailer: MailService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateUserDto, ip: string) {
    const { country, email, firstName, lastName, password } = dto;

    const user = await this.repository.create({
      country,
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, 12),
      roles: [],
      status: 'Accepted',
      ip,
    });

    return {
      status: 'success',
      data: user,
      token: await this.generateToken(user),
    };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user || !(await this.compare(password, user.password)))
      throw new UnauthorizedException();

    return {
      status: 'succes',
      data: user,
      token: await this.generateToken(user),
    };
  }
  // start forgot password Service
  async forgotPassword(email: string, host: string, protocol: string) {
    // Get user by Email
    const user = await this.repository.findByEmail(email);

    // Check if User exists in db
    if (!user) {
      // Throw NotFound If Not Exists
      throw new NotFoundException('no user found with email.');
    }

    // generate random hex String as a reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // encrypt reset token with sha256
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // save Hashed Reset token and he's expire date to the user Object data
    await this.repository.updateOne(
      {
        passwordResetToken: hashedToken,
        passwordResetTokenExpireDate: new Date(
          Date.now() +
            this.config.get<number>('FORGET_PASSWORD_EXPIRES_DATE') *
              (60 * 1000),
        ),
      },
      user.uid,
    );

    // generate Rest password URL
    const URL = `${protocol}://${'localhost:3000'}/resetPassword/${resetToken}`;

    // Return mail sending promise
    return this.mailer.sendEmail({
      from: this.config.get<string>('MAILER_FROM_HEADER'),
      to: email,
      subject: this.config.get<string>('MAILER_SUBJECT_HEADER'),
      text: URL,
    });
  }

  // start reset pass service
  async resetPassword(resetToken: string, password: string) {
    // encrypt the token provided
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // get User Based On reset token
    const user = await this.repository.findByPasswordResetToken(hashedToken);

    // Check if Token Is Valid
    if (!user) {
      // Throw Bad Request If Token is not valid
      throw new BadRequestException('Token is invalid or expired.');
    }

    // Hash provided password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save new password and delete reset Token and he's Metadata
    await this.repository.updateOne(
      {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpireDate: null,
        passwordChangedAt: new Date(Date.now() - 1000),
      },
      user.uid,
    );

    // Sign JWt Token
    const token = this.generateToken(user);

    // return generated token
    return token;
  }

  async updatePassword({ oldPassword, newPassword }, uid: string) {
    const user = await this.repository.findOne(uid);

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new BadRequestException('password mismatched');
    }

    const password = await bcrypt.hash(newPassword, 12);

    await this.repository.updateOne(
      {
        password,
        passwordChangedAt: new Date(Date.now() - 1000),
      },
      uid,
    );

    const token = this.generateToken(user);

    return token;
  }

  private async hash(text: string, salt: number) {
    return bcrypt.hash(text, salt);
  }

  private async compare(candidate: string, value: string) {
    return bcrypt.compare(candidate, value);
  }

  private async generateToken(user: User) {
    return this.jwt.sign(<JwtPaylod>{ email: user.email, uid: user.uid });
  }
}
