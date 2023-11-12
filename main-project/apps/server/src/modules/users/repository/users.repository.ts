import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, $Enums } from 'db';
import { PrismaService } from "src/global/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(uid: string) {
    return this.prisma.user.findUnique({ where: { uid } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateOne(data: Prisma.UserUpdateInput, uid: string) {
    return this.prisma.user.update({ data, where: { uid } });
  }

  async deleteOne(uid: string) {
    return this.prisma.user.delete({ where: { uid } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async acceptFriend(uid: string) {
    return this.prisma.friend.update({
      where: { uid },
      data: { status: "Accepted" },
    });
  }

  async getAllFriends(user: string, status: $Enums.FriendStatus) {
    return this.prisma.friend.findMany({
      where: {
        AND: [
          {
            OR: [{ user1uid: user }, { user2uid: user }],
          },
          status && { status },
        ],
      },
    });
  }

  async ban(uid: string, user: string) {
    this.prisma.friend.update({
      where: { uid },
      data: { status: "Banned", bannedBy: user },
    });
  }

  async unban(uid: string) {
    this.prisma.friend.update({
      where: { uid: uid },
      data: { status: "Accepted", bannedBy: null },
    });
  }

  async getFriendship(uid: string, user: string) {
    return this.prisma.friend.findFirst({
      where: {
        OR: [
          { user1uid: uid, user2uid: user },
          { user2uid: uid, user1uid: user },
        ],
      },
    });
  }

  async addFriend(uid: string, user: string) {
    return this.prisma.friend.create({
      data: {
        user1uid: user,
        user2uid: uid,
      },
    });
  }

  async removeFriend(uid: string, user: string) {
    const friendship = await this.prisma.friend.deleteMany({
      where: {
        OR: [
          { user1uid: user, user2uid: uid },
          { user1uid: uid, user2uid: user },
        ],
      },
    });
  }
}
