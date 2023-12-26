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
import { getPaginationQuery } from "src/helpers/funcs/pagination.helper";
import { PaginationDto } from "src/helpers/dto/pagination.dto";
import { getPaginationResponse } from "../../helpers/funcs/pagination.helper";

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly media: MediaService
  ) {}

  async friendsLeaderboard(user: string) {
    const friends = await this.repository.friendsLeaderborad(user);
    return {
      data: friends,
    };
  }
  findAll() {
    return this.repository.findAll();
  }

  findMeAll(uid: string) {
    return this.repository.findMeAll(uid)
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { lastName, firstName, login } = updateUserDto;
    return this.repository.updateOne({ lastName, firstName, login }, id);
  }

  async acceptFriend(uid: string, user: string) {
    const friendship = await this.repository.getInvitation(uid, user);

    if (!friendship) throw new NotFoundException();

    this.repository.acceptFriend(friendship.uid);
  }

  async getAllFriends(user: string) {
    return this.repository.getAllFriends(user);
  }
  async getAllInvitations(user: string) {
    return this.repository.getAllInvitations(user);
  }
  async getAllUsers(user: string) {
    return this.repository.getAllUsers(user);
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
    const friendship = await this.repository.getBan(user, uid);

    if (!friendship) throw new NotFoundException();

    if (friendship.status !== "Banned") {
      throw new ConflictException();
    }

    if (friendship.bannedBy !== user) throw new ForbiddenException();

    this.repository.unban(friendship.uid);
  }

  async searchForUser(search: string, user: string) {
    const data = await this.repository.searchForUser(search, user);
    return {
      data,
    };
  }

  async getFriends(uid: string) {
    return this.repository.getAllFriends(uid);
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
