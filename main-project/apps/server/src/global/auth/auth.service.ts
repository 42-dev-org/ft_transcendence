import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersRepository } from "../../modules/users/repository/users.repository";
import { JwtService } from "@nestjs/jwt";
import { User } from "db";
import { IntraSignInPayload, JwtPaylod } from "./types/auth";
import * as bcrypt from "bcrypt";
import { MailService } from "src/global/mail/mail.service";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly jwt: JwtService,
    private readonly mailer: MailService,
    private readonly config: ConfigService
  ) {}

  async create(data: IntraSignInPayload) {
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      image,
      kind,
      login,
      phone,
      url,
    } = data;

    const user = await this.repository.create({
      email,
      firstName,
      lastName,
      roles: [],
      url,
      profileImage: image.link,
      kind,
      login,
      phone,
    });

    return {
      status: "success",
      data: user,
      token: await this.generateToken(user),
    };
  }

  public async sign(data: IntraSignInPayload) {
    const user = await this.repository.findByLogin(data.login);
    if (user)
      return {
        status: "success",
        data: user,
        token: await this.generateToken(user),
      };
    return this.create(data);
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
