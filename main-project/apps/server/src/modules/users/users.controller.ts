import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  UseInterceptors,
  UsePipes,
  UploadedFile,
  Req,
  Query,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/shared/decorators/get-user.decorator";
import { User, $Enums } from "db";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidatorPipe } from "src/global/media/pipes/media.pipe";
import { MediaFile } from "src/shared/types/media";
import { Request } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @GetUser() { uid }: User,
    @Query("type") type: $Enums.FriendStatus
  ) {
    switch (type) {
      case "Accepted":
        return { data: await this.usersService.getFriends(uid) };
      case "Banned":
        break;
      case "Pending":
        return { data: await this.usersService.getAllInvitations(uid) };
      default:
        throw new BadRequestException("type invalid");
    }
  }

  @Get("search")
  @UseGuards(AuthGuard())
  async searchForFriend(@Query("search") s: string, @GetUser() { uid }: User) {
    return this.usersService.searchForUser(s, uid);
  }

  @Get("all")
  @UseGuards(AuthGuard())
  async giveMeAllUsers(@GetUser() { uid }: User) {
    console.log(uid)
    return this.usersService.findMeAll(uid);
  }

  @Get("leaderboard")
  @UseGuards(AuthGuard())
  async friendsLeaderboard(@GetUser() { uid }: User) {
    return this.usersService.friendsLeaderboard(uid);
  }

  @Get("me")
  @UseGuards(AuthGuard())
  findMe(@GetUser() { uid }: User, @Req() req: Request) {
    return this.usersService.findOne(uid);
  }

  @Post(":uid/add")
  @UseGuards(AuthGuard())
  async addFriend(@Param("uid") uid: string, @GetUser() { uid: user }: User) {
    return this.usersService.addFriend(uid, user);
  }

  @Post(":uid/remove")
  @UseGuards(AuthGuard())
  async removeFriend(
    @Param("uid") uid: string,
    @GetUser() { uid: user }: User
  ) {
    return this.usersService.removeFriend(uid, user);
  }

  @Post(":uid/ban")
  @UseGuards(AuthGuard())
  async banFriend(@Param("uid") uid: string, @GetUser() { uid: user }: User) {
    return this.usersService.ban(uid, user);
  }

  @Post(":uid/unban")
  @UseGuards(AuthGuard())
  async unbanFriend(@Param("uid") uid: string, @GetUser() { uid: user }: User) {
    return this.usersService.unban(uid, user);
  }
  @Post(":uid/accept")
  @UseGuards(AuthGuard())
  async acceptFriend(
    @Param("uid") uid: string,
    @GetUser() { uid: user }: User
  ) {
    return this.usersService.acceptFriend(uid, user);
  }

  @Get(":uid")
  @UseGuards(AuthGuard())
  findOne(@Param("uid") uid: string) {
    return this.usersService.findOne(uid);
  }

  @Patch(":uid")
  @UseGuards(AuthGuard())
  update(@Param("uid") uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @Delete(":uid")
  @UseGuards(AuthGuard())
  remove(@Param("uid") uid: string) {
    return this.usersService.remove(uid);
  }

  @Delete("me")
  @UseGuards(AuthGuard())
  deleteMe(@GetUser() { uid }: User) {
    return this.usersService.remove(uid);
  }

  @Patch("me")
  @UseGuards(AuthGuard())
  updateMe(@GetUser() { uid }: User, dto: UpdateUserDto) {
    return this.usersService.update(uid, { ...dto });
  }

  @Post("me/profile-image")
  @UseGuards(AuthGuard())
  @UsePipes(FileValidatorPipe)
  @UseInterceptors(FileInterceptor("image"))
  changeProfileImage(@GetUser() user: User, @UploadedFile() file: MediaFile) {
    return this.usersService.changeProfilePicture(file, user.uid);
  }
}
