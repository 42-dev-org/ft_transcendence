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
  Query,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import {
  MutUserDto,
  ProtectChannel,
  UnMutUserDto,
  UnProtectChannel,
  UpdateConversationDto,
  UpdateUserMembershipInRoomDto,
} from "./dto/update-conversation.dto";
import { GetUser } from "src/shared/decorators/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { PutAbilities } from "src/global/rbac/decorator/rbac.decorator";
import { Actions } from "src/global/rbac/enum/rbac.enum";
import { User, $Enums } from "db";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidatorPipe } from "src/global/media/pipes/media.pipe";
import { MediaFile } from "src/shared/types/media";
import { IsGuardAdmin } from "./guards/is-admin.guard";
import { IsOwnerGuard } from "./guards/is-owner.guard";
import { UserIsHealthyGuard } from "./guards/user-in-conversation.guard";

@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createConversationDto: CreateConversationDto,
    @GetUser() { uid }: User
  ) {
    if (
      (createConversationDto.visibility === "Protected" &&
        createConversationDto.password.trim().length == 0) ||
      (createConversationDto.type == "Single" &&
        (createConversationDto.participants.length > 1 ||
          createConversationDto.visibility ||
          createConversationDto.name ||
          createConversationDto.password)) ||
      (createConversationDto.type == "Group" &&
        (!createConversationDto.name || !createConversationDto.visibility))
    ) {
      throw new BadRequestException();
    }
    const cnv = await this.conversationsService.create(
      createConversationDto,
      uid
    );
    if (!cnv) throw new ConflictException();
    return cnv;
  }

  @Get("me")
  @UseGuards(AuthGuard())
  async findMeAll(@GetUser() { uid }: User, @Query("type") type: string) {
    switch (type) {
      case "group":
        return this.conversationsService.findMeAllChannels(uid);
        break;
      case "single":
        return this.conversationsService.findMeAllSingleConversations(uid);
        break;

      default:
        throw new BadRequestException();
        break;
    }
  }

  @UseGuards(IsGuardAdmin)
  @Patch("mut-participant")
  @UseGuards(AuthGuard())
  async mut(@Body() dto: MutUserDto) {
    return this.conversationsService.muteUser(
      dto.conversation,
      dto.user,
      dto.until
    );
  }

  @UseGuards(IsGuardAdmin)
  @Patch("unmut-participant")
  @UseGuards(AuthGuard())
  async unmut(@Body() dto: UnMutUserDto) {
    return this.conversationsService.unMuteUser(dto.conversation, dto.user);
  }

  @UseGuards(IsOwnerGuard)
  @Patch("protect")
  @UseGuards(AuthGuard())
  async protectChannel(@Body() dto: ProtectChannel) {
    return this.conversationsService.protectConversation(dto);
  }

  @UseGuards(IsOwnerGuard)
  @Patch("unprotect")
  @UseGuards(AuthGuard())
  async unprotectChannel(@Body() dto: UnProtectChannel) {
    return this.conversationsService.unprotectConversation(dto);
  }

  @UseGuards(IsGuardAdmin)
  @Patch("ban-participant")
  @UseGuards(AuthGuard())
  async ban(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.ban(dto);
  }

  @UseGuards(IsGuardAdmin)
  @Patch("unban-participant")
  @UseGuards(AuthGuard())
  async unban(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.unabn(dto);
  }

  @UseGuards(IsGuardAdmin)
  @Patch("add-participant")
  @UseGuards(AuthGuard())
  async addParticipant(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.addParticipant(dto);
  }

  @Patch("delete-participant")
  @UseGuards(IsGuardAdmin)
  @UseGuards(AuthGuard())
  async deleteParticipant(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.deleteParticipant(dto);
  }

  @Patch("add-admin")
  @UseGuards(IsOwnerGuard)
  @UseGuards(AuthGuard())
  async addAdmin(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.addAdmin(dto);
  }

  @UseGuards(IsOwnerGuard)
  @Patch("delete-admin")
  @UseGuards(AuthGuard())
  async deleteAdmin(@Body() dto: UpdateUserMembershipInRoomDto) {
    return this.conversationsService.deleteAdmin(dto.conversation, dto.user);
  }

  @Patch("add-profile-image")
  @UseGuards(IsGuardAdmin)
  @UseInterceptors(FileInterceptor("image"))
  @UsePipes(FileValidatorPipe)
  @UseGuards(AuthGuard())
  async addProfileImage(
    @UploadedFile() file: MediaFile,
    @GetUser() { uid }: User,
    @Body("conversation") cnvUid: string
  ) {
    return this.conversationsService.addProfileImage(file, cnvUid, uid);
  }

  @Patch("delete-profile-imge")
  @UseGuards(IsGuardAdmin)
  @UseGuards(AuthGuard())
  async deleteProfileImage(@Body("conversation") uid: string) {
    return this.conversationsService.deleteProfileImage(uid);
  }

  @Get(":id")
  @UseGuards(UserIsHealthyGuard)
  @UseGuards(AuthGuard())
  async findOne(
    @Param("id") conversation: string,
    @GetUser() { uid }: User,
    @Query("type") type: $Enums.ConversationTypes
  ) {
    if (!uid || (type != "Group" && type != "Single"))
      throw new BadRequestException();
    const cnv = await this.conversationsService.findOne(
      conversation,
      uid,
      type
    );
    return cnv;
  }

  @Patch(":id")
  @UseGuards(IsGuardAdmin)
  @UseGuards(AuthGuard())
  update(
    @Param("id") id: string,
    @Body() updateConversationDto: UpdateConversationDto
  ) {
    return this.conversationsService.update(id, updateConversationDto);
  }

  @Delete(":id")
  @UseGuards(IsOwnerGuard)
  @UseGuards(AuthGuard())
  remove(@Param("id") id: string) {
    return this.conversationsService.remove(id);
  }
}
