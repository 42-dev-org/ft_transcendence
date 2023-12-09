import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  Req,
  Res,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from 'db';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaFile } from 'src/shared/types/media';
import { FileValidatorPipe } from 'src/global/media/pipes/media.pipe';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMessageDto: CreateMessageDto, @GetUser() { uid }: User) {
    return this.messagesService.create(createMessageDto, uid);
  }

  @Get('conversation/:cnvId')
  @UseGuards(AuthGuard())
  findAll(@GetUser() { uid }: User, @Param('cnvId') cnvId: string) {
    return this.messagesService.findAll(uid, cnvId);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
