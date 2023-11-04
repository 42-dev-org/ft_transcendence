import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { MediaService } from 'src/global/media/providers/media.service';
import { MediaFile } from 'src/shared/types/media';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly media: MediaService,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { country, state, lastName, firstName, phoneNumber, email } =
      updateUserDto;
    return this.repository.updateOne(
      { country, state, lastName, firstName, phoneNumber, email },
      id,
    );
  }

  remove(id: string) {
    return this.repository.deleteOne(id);
  }

  async changeProfilePicture(file: MediaFile, uid: string) {
    const added_file = await this.media.uploadFile(file, uid);
    const data = await this.repository.updateOne(
      {
        profileImage: added_file.url,
      },
      uid,
    );
    return {
      status: 'success',
      data,
    };
  }
  async changeCoverPicture(file: MediaFile, uid: string) {
    const added_file = await this.media.uploadFile(file, uid);
    const data = await this.repository.updateOne(
      {
        coverImage: added_file.url,
      },
      uid,
    );
    return {
      status: 'success',
      data,
    };
    return true;
  }
}
