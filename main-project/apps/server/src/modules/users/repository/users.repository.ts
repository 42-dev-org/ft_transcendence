import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, $Enums } from "db";
import { PrismaService } from "src/global/prisma/prisma.service";
import { PaginationDto } from "../../../helpers/dto/pagination.dto";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async searchForUser(search: string, user: string) {
    const getUsers = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { firstName: { contains: search } },
              { lastName: { contains: search } },
              { login: { contains: search } },
            ],
          },
          {
            friendOf: {
              none: { OR: [{ user1uid: user }, { user2uid: user }] },
            },
          },
          {
            uid: {
              not: user,
            },
          },
        ],
      },
    });
    console.log(search);
    return getUsers;
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
    const query = {
      where: {
        AND: [
          {
            OR: [{ user1uid: user }, { user2uid: user }],
          },
          status && { status },
        ],
      },
    };

    return this.prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                friendOf: {
                  some: {
                    OR: [
                      { user1uid: user, status },
                      { user2uid: user, status },
                    ],
                  },
                },
              },
              {
                myFriends: {
                  some: {
                    OR: [
                      { user1uid: user, status },
                      { user2uid: user, status },
                    ],
                  },
                },
              },
            ],
          },
          { uid: { not: user } },
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
