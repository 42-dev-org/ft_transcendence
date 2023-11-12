import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./repository/users.repository";
import { MediaService } from "src/global/media/providers/media.service";
import { MediaFile } from "src/shared/types/media";
import { $Enums, Prisma } from "db";

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly media: MediaService
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { lastName, firstName, email, phone, login, status } = updateUserDto;
    return this.repository.updateOne(
      { lastName, firstName, phone, email, login, status },
      id
    );
  }

  async acceptFriend(uid: string, user: string) {
    const friendship = await this.repository.getFriendship(uid, user);

    if (!friendship) throw new NotFoundException();
    if (friendship.user2uid !== uid) throw new ForbiddenException();

    this.repository.acceptFriend(friendship.uid);
  }

  async addFriend(uid: string, user: string) {
    const friendship = await this.repository.getFriendship(uid, user);
    if (friendship) throw new ConflictException();
    return this.repository.addFriend(uid, user);
  }

  async ban(uid: string, user: string) {
    const friendship = await this.repository.getFriendship(uid, user);

    if (!friendship) throw new NotFoundException();

    if (friendship.status === "Banned") {
      throw new ConflictException();
    }

    this.repository.ban(friendship.uid, user);
  }

  async unban(uid: string, user: string) {
    const friendship = await this.repository.getFriendship(uid, user);

    if (!friendship) throw new NotFoundException();

    if (friendship.status !== "Banned") {
      throw new ConflictException();
    }

    if (friendship.bannedBy !== user) throw new ForbiddenException();

    this.repository.unban(friendship.uid);
  }

  async getFriends(uid: string, status: $Enums.FriendStatus) {
    return this.repository.getAllFriends(uid, status)
  }

  async removeFriend(uid: string, user: string) {
    return this.repository.removeFriend(uid, user);
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
      uid
    );
    return {
      status: "success",
      data,
    };
  }
}
