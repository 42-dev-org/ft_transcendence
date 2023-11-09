import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateUserDto, @Req() req: Request) {
    return this.authService.create(createAuthDto, req.ip);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  // Forgot Password handler
  @Post('forgotPassword')
  async forgotPassword(@Body('email') email: string, @Req() req: Request) {
    // call Forgot password Service
    await this.authService.forgotPassword(email, req.get('host'), req.protocol);

    // return Success Result
    return {
      status: 'success',
    };
  }

  // start reset password handler
  @Post('resetPassword/:resetToken')
  async resetPassword(
    @Body('password') password: string,
    @Param('resetToken') resetToken: string,
    @Res() res: Response,
  ) {
    // Call Reset Password Service
    const token = await this.authService.resetPassword(resetToken, password);

    res.json({
      status: 'success',
      token,
    });
  }

  @Patch('password')
  @UseGuards(AuthGuard())
  async updatePassword(
    @Body() passPayload: { password: string; oldPassword: string },
    @GetUser() { uid },
    @Res() res: Response,
  ) {
    const token = await this.authService.updatePassword(
      passPayload as any,
      uid,
    );

    res.json({
      status: 'success',
      token,
    });
  }
}
