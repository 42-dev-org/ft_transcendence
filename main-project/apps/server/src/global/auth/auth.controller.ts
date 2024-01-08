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
import { IntraSignInPayload, IntraTokenPayload, TwoFactorDto } from "./types/auth";
import { Auth42Guard } from "./guards/42.guard";

import { User } from "db";

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

  // check the status of tow factor enabled or not
  @Get("tfa-status")
  @UseGuards(AuthGuard())
  async twoFactorStatus(@GetUser() user: User)
  {
    return await this.authService.getTwoFactorStatus(user.uid);
  }

  @Get("generate")
  @UseGuards(AuthGuard())
  async generateQrCode(@GetUser() user: User, @Res() res: Response){
    return await this.authService.generateQrCode(user.uid, user.email, res);
  }

  @Post("verify")
  @UseGuards(AuthGuard())
  async verifyTwoFactor(@GetUser() user: User, @Body() dto: TwoFactorDto)
  {
    return await this.authService.verifyTwoFactorToken(user.uid, dto.otp)
  }

  @Post("validate")
  @UseGuards(AuthGuard())
  async validateTwoFactor(@GetUser() user: User, @Body() dto: TwoFactorDto)
  {
    return await this.authService.validateTwoFactor(user.uid, dto.otp)
  }

  @Post("disable")
  @UseGuards(AuthGuard())
  async disableTwoFactor(@GetUser() user: User)
  {
    return await this.authService.disableTwoFactor(user.uid);
  }


}
