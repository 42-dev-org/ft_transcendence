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

@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("42oauth")
  @UseGuards(Auth42Guard)
  async callback(@Req() req: Request, @Res() res: Response) {
    const payload = await this.authService.sign(req.user as IntraSignInPayload);

    res.cookie("token", payload.token);
    res.status(300).redirect("http://localhost:3001");
  }
}
