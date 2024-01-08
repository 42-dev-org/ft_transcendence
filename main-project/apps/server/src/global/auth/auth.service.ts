import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import * as rs from "randomstring";
import { UsersRepository } from "../../modules/users/repository/users.repository";
import { JwtService } from "@nestjs/jwt";
import { User } from "db";
import { IntraSignInPayload, JwtPaylod } from "./types/auth";
import * as bcrypt from "bcrypt";
import { MailService } from "src/global/mail/mail.service";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Request, Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async create(data: IntraSignInPayload) {
    let {
      email,
      first_name: firstName,
      last_name: lastName,
      image,
      kind,
      login,
      phone,
      url,
    } = data;
    const isUser = await this.repository.findByLogin(login);
    if (isUser) login += rs.generate(7);

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
      points: 0,
      twoFactorEnabled: false
    });

    return {
      status: "success",
      data: user,
      token: await this.generateToken(user),
    };
  }

  public async sign(data: IntraSignInPayload) {
    const user = await this.repository.findByEmail(data.email);
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

  // get Status of Two factor enabled 
  async getTwoFactorStatus(userId: string): Promise<boolean>
  {
    const userTwo = await this.prisma.user.findUnique({
      where: {uid: userId},
      select: {
        twoFactorEnabled: true
      }
    })
    return userTwo.twoFactorEnabled;
  }

  pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async saveTwoFactorSecret(userId: string, twoFactorSecret: string)
  {
    await this.prisma.user.update({
      where: {
        uid: userId
      },
      data: {
        twoFactorSecret
      }
    })
  }

  async generateQrCode(userId: string, email: string, @Res() res: Response) {
      const isTwoFactorEnabled = await this.getTwoFactorStatus(userId);
      if(isTwoFactorEnabled)
      {
        throw new HttpException("Two factor already enabled", HttpStatus.BAD_REQUEST);
      }
      const secretKey = authenticator.generateSecret();
      console.log("secret : ", secretKey);
      await this.saveTwoFactorSecret(userId, secretKey);
      const otpUrl = authenticator.keyuri(email, 'ft_transcendence', secretKey);
      return this.pipeQrCodeStream(res, otpUrl)
  }

  async verifyTwoFactorToken(userId: string, otp: string)
  {
    const user = await this.prisma.user.findUnique({
      where: { uid : userId}
    })
    if(user.twoFactorEnabled) throw new HttpException("two factor already enabled", HttpStatus.BAD_REQUEST)
    const secret = user.twoFactorSecret;
    if(!otp || otp.length !== 6) throw new HttpException("Otp lenght must be 6 numbers", HttpStatus.BAD_REQUEST)
    if(!secret) throw new HttpException("You are not enabled to verify the token", HttpStatus.BAD_REQUEST)
    const isValid = authenticator.verify({token : otp, secret})
  if(isValid)
  {
    await this.prisma.user.update({
      where: { uid: userId},
      data: {
        twoFactorEnabled: true
      }
    })
  }
    return isValid;
  }

  async validateTwoFactor(userId: string, otp: string)
  {
    const user = await this.prisma.user.findUnique({
      where: { uid : userId}
    })
    if(!user.twoFactorEnabled) throw new HttpException("two factor not enabled", HttpStatus.BAD_REQUEST)
    const secret = user.twoFactorSecret;
    if(!otp || otp.length !== 6) throw new HttpException("Otp lenght must be 6 numbers", HttpStatus.BAD_REQUEST)
    if(!secret) throw new HttpException("You are not enabled to validate the token", HttpStatus.BAD_REQUEST)
    const isValid = authenticator.verify({token : otp, secret})
    return isValid;
  }

  async disableTwoFactor(userId: string)
  {
    await this.prisma.user.update({
      where: {uid: userId},
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null
      }
    })
  }


}
