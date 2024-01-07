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

  // work
  async findByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async getBanned(uid: string) {
    return this.prisma.friend.findMany({
      where: {
        user1uid: uid,
        status: 'Banned'
      },
      select: {
        user2: true,
      },
    });
  }
  async findMeAll(uid: string) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          {
            myFriends: {
              none: {
                // {user2uid: {not: uid}},
                // user1uid: uid,
                // OR: [{ user1uid: uid }, { user2uid: uid }],
                user2uid: uid,
                status: "Banned",
              },
            },
          },
          {
            friendOf: {
              none: {
                status: "Banned",
                // OR: [{ user1uid: uid }, { user2uid: uid }],
                user1uid: uid,
              },
            },
          },
        ],

        uid: { not: uid },
      },
      include: {
        myFriends: true,
        friendOf: true,
      },
    });
  }

  // work
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
            AND: [
              {
                friendOf: {
                  none: {
                    user1uid: user,
                  },
                },
              },
              {
                myFriends: {
                  none: {
                    user2uid: user,
                  },
                },
              },
            ],
          },
          {
            uid: {
              not: user,
            },
          },
        ],
      },
    });
    return getUsers;
  }

  async friendsLeaderborad(user: string) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          { uid: { not: user } },
          {
            OR: [
              {
                friendOf: {
                  some: {
                    status: "Accepted",
                  },
                },
              },
              {
                myFriends: {
                  some: {
                    status: "Accepted",
                  },
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        points: "desc",
      },
    });
  }

  // work
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  // work
  async findOne(uid: string, user: string) {
    const friendShip = await this.prisma.friend.findFirst({where: {
      OR: [
        {user1uid: uid, user2uid: user},
        {user2uid: uid, user1uid: user},
      ],
      status: 'Banned'
    }})
    if (friendShip)
    throw new ForbiddenException()
    return this.prisma.user.findUnique({ where: { uid } });
  }

  // work
  async findAll() {
    return this.prisma.user.findMany();
  }

  // work
  async updateOne(data: Prisma.UserUpdateInput, uid: string) {
    return this.prisma.user.update({ data, where: { uid } });
  }

  // work
  async deleteOne(uid: string) {
    return this.prisma.user.delete({ where: { uid } });
  }

  // work
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  // work
  async acceptFriend(uid: string) {
    return this.prisma.friend.update({
      where: { uid, status: "Pending" },
      data: { status: "Accepted" },
    });
  }

  async getAllInvitations(user: string) {
    return this.prisma.user.findMany({
      where: {
        myFriends: {
          some: {
            user2uid: user,
            status: "Pending",
          },
        },
      },
    });
  }

  async getAllUsers(user: string) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          { uid: { not: user } },
          {
            OR: [
              {
                friendOf: {
                  none: {
                    user1uid: user,
                  },
                },
              },
              {
                myFriends: {
                  none: {
                    user2uid: user,
                  },
                },
              },
            ],
          },
        ],
      },
    });
  }

  // work
  async getAllFriends(user: string) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          { uid: { not: user } },
          {
            OR: [
              {
                friendOf: {
                  some: {
                    status: "Accepted",
                  },
                },
              },
              {
                myFriends: {
                  some: {
                    status: "Accepted",
                  },
                },
              },
            ],
          },
        ],
      },
    });
  }

  // work
  async ban(uid: string, user: string) {
    return this.prisma.friend.update({
      where: { uid, status: { not: "Banned" } },
      data: { status: "Banned", bannedBy: user },
    });
  }

  async createbanned(uid: string, user: string) {
    const a = await this.prisma.friend.create({
      data: {
        user1uid: user,
        user2uid: uid,
        status: "Banned",
        bannedBy: user
      },
    });
  }
  // work
  async unban(uid: string) {
    return this.prisma.friend.delete({
      where: { uid: uid, status: "Banned" },
    });
  }

  // work
  async getInvitation(uid: string, user: string) {

    return this.prisma.friend.findFirst({
      where: {
        user2uid: user,
        user1uid: uid,
        status: "Pending",
      },
    });
  }

  // work
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

  // work
  async addFriend(uid: string, user: string) {
    return this.prisma.friend.create({
      data: {
        user1uid: user,
        user2uid: uid,
      },
    });
  }

  // work
  async getBan(user: string, uid: string) {
    return this.prisma.friend.findFirst({
      where: {
        status: "Banned",
        user1uid: user,
      },
    });
  }

  // work
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
