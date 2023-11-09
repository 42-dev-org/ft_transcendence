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
  UsePipes,
  UploadedFile,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import {
  UpdateConversationDto,
  UpdateUserMembershipInRoomDto,
} from './dto/update-conversation.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PutAbilities } from 'src/global/rbac/decorator/rbac.decorator';
import { Actions } from 'src/global/rbac/enum/rbac.enum';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidatorPipe } from 'src/global/media/pipes/media.pipe';
import { MediaFile } from 'src/shared/types/media';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @PutAbilities({ action: Actions.Create, subject: 'Conversation' })
  @UseGuards(AuthGuard())
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async findMeAll(@GetUser() { uid }: User) {
    return this.conversationsService.findMeAll(uid);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return this.conversationsService.findAll();
  }

  @Patch('add-participant')
  async addParticipant(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.addParticipant(dto);
  }

  @Patch('delete-participant')
  async deleteParticipant(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.deleteParticipant(dto);
  }

  @Patch('add-admin')
  async addAdmin(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.addAdmin(dto);
  }

  @Patch('delete-admin')
  async deleteAdmin(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.deleteAdmin(dto);
  }

  @Patch('add-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(FileValidatorPipe)
  async addProfileImage(
    @UploadedFile() file: MediaFile,
    @GetUser() { uid }: User,
    @Body('uid') cnvUid: string,
  ) {
    return this.conversationsService.addProfileImage(file, cnvUid, uid);
  }

  @Patch('delete-profile-imge')
  async deleteProfileImage(@Body('uid') uid: string) {
    return this.conversationsService.deleteProfileImage(uid);
  }

  @Get(':id')
  @PutAbilities({ action: Actions.Read, subject: 'Conversation' })
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  @PutAbilities({ action: Actions.Update, subject: 'Conversation' })
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @PutAbilities({ action: Actions.Delete, subject: 'Conversation' })
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(id);
  }
}
