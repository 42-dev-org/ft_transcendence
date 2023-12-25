import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Req,
  UseGuards,
  Get,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/shared/decorators/get-user.decorator";
import { IntraSignInPayload, IntraTokenPayload } from "./types/auth";
import { Auth42Guard } from "./guards/42.guard";
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

class otp {
  code: string;
}
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token');
    res.status(200).send()
  }

  @Get("42")
  @UseGuards(Auth42Guard)
  async callback(@Req() req: Request, @Res() res: Response) {
    const payload = await this.authService.sign(req.user as IntraSignInPayload);

    res.cookie("token", payload.token);
    res.status(300).redirect("http://localhost:3001/profile");
  }

  pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
}
async generateSecret(@Res() res: Response) {
    const secretKey = authenticator.generateSecret();
    console.log("secret : ", secretKey); // save it in user model in db
    // change 'yachehbo@gmail.com' with user email
    const otpUrl = authenticator.keyuri("yachehbo@gmail.com", 'ft_transcendence', secretKey);
    return this.pipeQrCodeStream(res, otpUrl)
}

  @Get("otp")
  @UseGuards(AuthGuard())
  async otp(@Res() res: Response){
    return await this.generateSecret(res);
  }
}
