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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { PutAbilities } from "src/global/rbac/decorator/rbac.decorator";
import { Actions } from "src/global/rbac/enum/rbac.enum";
import { RbacGuard } from "src/global/rbac/guard/rbac.guard";
import { GetUser } from "src/shared/decorators/get-user.decorator";
import { User, $Enums } from "db";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidatorPipe } from "src/global/media/pipes/media.pipe";
import { MediaFile } from "src/shared/types/media";
import { Request } from "express";
import { PaginationDto } from "src/helpers/dto/pagination.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard(), RbacGuard)
  @UseGuards(AuthGuard())
  findAll(
    @GetUser() { uid }: User,
    @Query("type") type: $Enums.FriendStatus,
  ) {
    return this.usersService.getFriends(uid, type || "Pending");
  };
  // param => https://localhost/api/v1/useres?type=Banned
  // 
  @Get("search")
  @UseGuards(AuthGuard())
  async searchForFriend(
    @Query("search") s: string,
    @GetUser() {uid}: User
  ) {
    return this.usersService.searchForUser(s, uid);
  }

  @Get("me")
  // @PutAbilities({ action: Actions.Read, subject: 'User' })
  @UseGuards(AuthGuard())
  findMe(@GetUser() { uid }: User, @Req() req: Request) {
    return this.usersService.findOne(uid);
  }

  @Post(":uid/add")
  @UseGuards(AuthGuard())
  async addFriend(@Param("uid") uid: string, @GetUser() { uid: user }: User) {
    // console.log(uid)
    // console.log(user)
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
  @UseGuards(AuthGuard(), RbacGuard)
  findOne(@Param("uid") uid: string) {
    return this.usersService.findOne(uid);
  }

  @Patch(":uid")
  @UseGuards(AuthGuard(), RbacGuard)
  update(@Param("uid") uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @Delete(":uid")
  @UseGuards(AuthGuard(), RbacGuard)
  remove(@Param("uid") uid: string) {
    return this.usersService.remove(uid);
  }

  @Delete("me")
  @UseGuards(AuthGuard(), RbacGuard)
  deleteMe(@GetUser() { uid }: User) {
    return this.usersService.remove(uid);
  }

  @Patch("me")
  @UseGuards(AuthGuard(), RbacGuard)
  updateMe(@GetUser() { uid }: User, dto: UpdateUserDto) {
    return this.usersService.update(uid, { ...dto });
  }

  @Post("me/profile-image")
  @UseGuards(AuthGuard(), RbacGuard)
  @UsePipes(FileValidatorPipe)
  @UseInterceptors(FileInterceptor("image"))
  changeProfileImage(@GetUser() user: User, @UploadedFile() file: MediaFile) {
    return this.usersService.changeProfilePicture(file, user.uid);
  }
}
