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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PutAbilities } from 'src/global/rbac/decorator/rbac.decorator';
import { Actions } from 'src/global/rbac/enum/rbac.enum';
import { RbacGuard } from 'src/global/rbac/guard/rbac.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from 'db';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidatorPipe } from 'src/global/media/pipes/media.pipe';
import { MediaFile } from 'src/shared/types/media';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @PutAbilities({ action: Actions.Manage, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  findAll() {
    return this.usersService.findAll();
  }


  @Get('me')
  // @PutAbilities({ action: Actions.Read, subject: 'User' })
  @UseGuards(AuthGuard())
  findMe(@GetUser() { uid }: User, @Req() req: Request) {
    console.log(req.headers)
    return this.usersService.findOne(uid);
  }

  @Post(':uid/add')
  @UseGuards(AuthGuard())
  async addFriend(@Param('uid') uid: string, @GetUser() {uid: user}: User) {
    // console.log(uid)
    // console.log(user)
    return this.usersService.addFriend(uid, user)
  }
  
  @Post(':uid/remove')
  @UseGuards(AuthGuard())
  async removeFriend(@Param('uid') uid: string, @GetUser() {uid: user}: User) {
    return this.usersService.addFriend(uid, user)
  }
  
  @Post(':uid/ban')
  @UseGuards(AuthGuard())
  async banFriend(@Param('uid') uid: string, @GetUser() {uid: user}: User) {
    return this.usersService.ban(uid, user)
  }

  @Post(':uid/unban')
  @UseGuards(AuthGuard())
  async unbanFriend(@Param('uid') uid: string, @GetUser() {uid: user}: User) {
    return this.usersService.unban(uid, user)
  }
  @Post(':uid/accept')
  @UseGuards(AuthGuard())
  async acceptFriend(@Param('uid') uid: string, @GetUser() {uid: user}: User) {
    return this.usersService.acceptFriend(uid, user)
  }

  @Get(':uid')
  @PutAbilities({ action: Actions.Manage, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  findOne(@Param('uid') uid: string) {
    return this.usersService.findOne(uid);
  }

  @Patch(':uid')
  @PutAbilities({ action: Actions.Manage, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @Delete(':uid')
  @PutAbilities({ action: Actions.Manage, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }


  @Delete('me')
  @PutAbilities({ action: Actions.Delete, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  deleteMe(@GetUser() { uid }: User) {
    return this.usersService.remove(uid);
  }

  @Patch('me')
  @PutAbilities({ action: Actions.Update, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  updateMe(@GetUser() { uid }: User, dto: UpdateUserDto) {
    return this.usersService.update(uid, { ...dto });
  }

  @Post('me/profile-image')
  @PutAbilities({ action: Actions.Update, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  @UsePipes(FileValidatorPipe)
  @UseInterceptors(FileInterceptor('image'))
  changeProfileImage(@GetUser() user: User, @UploadedFile() file: MediaFile) {
    return this.usersService.changeProfilePicture(file, user.uid);
  }
}
