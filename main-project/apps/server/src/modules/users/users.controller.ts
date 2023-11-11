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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @PutAbilities({ action: Actions.Manage, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  findAll() {
    return this.usersService.findAll();
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

  @Get('me')
  @PutAbilities({ action: Actions.Read, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  findMe(@GetUser() { uid }: User) {
    return this.usersService.findOne(uid);
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

  @Post('me/cover-image')
  @PutAbilities({ action: Actions.Update, subject: 'User' })
  @UseGuards(AuthGuard(), RbacGuard)
  @UsePipes(FileValidatorPipe)
  @UseInterceptors(FileInterceptor('image'))
  changeCoverImage(@GetUser() user: User, @UploadedFile() file: MediaFile) {
    return this.usersService.changeCoverPicture(file, user.uid);
  }
}
