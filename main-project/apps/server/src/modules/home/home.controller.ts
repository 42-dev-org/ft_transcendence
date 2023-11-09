import {
  Controller,
  Get,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from 'src/global/mail/mail.service';
import { FileValidatorPipe } from 'src/global/media/pipes/media.pipe';
import { MediaService } from 'src/global/media/providers/media.service';
import { MediaFile } from 'src/shared/types/media';

@Controller('home')
export class HomeController {
  constructor(
    private readonly mail: MailService,
    private readonly media: MediaService,
  ) {}
  @Get()
  @UseGuards(AuthGuard())
  // @UseGuards(RbacGuard)
  // @UseInterceptors(FileInterceptor('image'))
  // @UsePipes(FileValidatorPipe)
  async hello(@UploadedFile() file: MediaFile) {
    // await this.mail.sendEmail({
    //   from: 'anas.jaidi@icloud.com',
    //   to: 'ajaidi2020@gmail.com',
    //   subject: 'message',
    //   text: 'hi',
    // });
    // const data = await this.media.uploadFile(file, 'anas-jaiai');
    // return data;
    return 'hello';
  }
}
