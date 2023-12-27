import { Injectable } from "@nestjs/common";
import { Prisma, $Enums } from "db";
import { PrismaService } from "src/global/prisma/prisma.service";

@Injectable()
export class ConversationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    conversation: Prisma.ConversationCreateInput,
    {
      user,
      uid,
      type,
    }: { user?: string; uid?: string; type: $Enums.ConversationTypes }
  ) {
    if (
      type === "Single" &&
      (await this.prisma.conversation.findFirst({
        where: {
          type: "Single",
          AND: [
            {
              participants: {
                some: {
                  uid,
                },
              },
            },
            {
              participants: {
                some: {
                  uid: user,
                },
              },
            },
          ],
        },
      }))
    )
      return null;
    return this.prisma.conversation.create({
      data: conversation,
      //   include: { Messages: true },
    });
  }

  async userHealthy(uid: string, user: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        uid,
        participants: {
          some: {
            uid: user,
          },
        },
        mut: {
          none: {
            uid: user,
          },
        },
        ban: {
          none: {
            uid: user,
          },
        },
      },
      select: {
        uid: true,
      },
    });

    return !!conversation;
  }

  public async findAll() {
    return this.prisma.conversation.findMany({
      //   include: { Messages: true },
    });
  }

  async conversationType(uid: string) {
    return this.prisma.conversation.findUnique({
      where: { uid },
      select: { type: true },
    });
  }
  async conversationVisibility(uid: string) {
    return this.prisma.conversation.findUnique({
      where: { uid },
      select: { visibility: true },
    });
  }

  public async findMeAll(uid: string, type: $Enums.ConversationTypes) {
    if (type === "Group") {
      return this.prisma.conversation.findMany({
        where: {
          OR: [
            {
              visibility: {
                not: "Private",
              },
            },
            {
              visibility: { equals: "Private" },
              participants: {
                some: {
                  uid,
                },
              },
            },
          ],
          type: "Group",
        },
        //   include: { Messages: true },
        select: {
          name: true,
          profileImage: true,
          uid: true,
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
            select: {
              sender: {
                select: {
                  uid: true,
                  login: true,
                  profileImage: true,
                },
              },
            },
          },
        },
      });
    } else if (type === "Single") {
      return this.prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              uid,
            },
          },
          type: "Single",
        },
        select: {
          uid: true,
          messages: true,
          type: true,

          participants: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
            },
            where: {
              uid: { not: uid },
            },
          },
        },
      });
    }
  }

  async isBanned(uid: string, user: string) {
    const cnv = this.prisma.conversation.findUnique({
      where: {
        uid,
        ban: {
          some: {
            uid: user,
          },
        },
      },
      select: { uid: true },
    });
    return !!cnv;
  }

  async conversationExist(uid: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: { uid },
      select: { uid: true },
    });
    return !!cnv;
  }

  async isMuted(uid: string, user: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid,
        mut: {
          some: {
            userUid: user,
          },
        },
      },
      select: { uid: true },
    });
    return !!cnv;
  }

  async isAdmin(uid: string, user: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid,
        OR: [
          {
            admins: {
              some: {
                uid: user,
              },
            },
          },
          {
            owner: { uid: user },
          },
        ],
      },
      select: { uid: true },
    });
    return !!cnv;
  }

  async isOwner(uid: string, user: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: { uid, owner: { uid: user } },
      select: { uid: true },
    });
    return !!cnv;
  }

  async existsInConversation(uid: string, user: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid,
        participants: {
          some: {
            uid: user,
          },
        },
      },
      select: { uid: true },
    });
    return !!cnv;
  }

  public async findOne(
    uid: string,
    user: string,
    type: $Enums.ConversationTypes
  ) {
    if (type === "Group") {
      return this.prisma.conversation.findUnique({
        where: {
          uid,
          type: "Group",
        },
        //   include: { Messages: true },
        select: {
          name: true,
          profileImage: true,
          participants: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
              uid: true,
            },
          },
          ban: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
              uid: true,
            },
          },
          mut: {
            select: {
              // firstName: true,
              // lastName: true,
              // login: true,
              // profileImage: true,
              // uid: true
              until: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  login: true,
                  profileImage: true,
                  uid: true,
                },
              },
            },
          },
          admins: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
              uid: true,
            },
          },
          owner: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
              uid: true,
            },
          },
          uid: true,
          messages: {
            select: {
              content: true,
              conversation: true,
              conversationUid: true,
              createdAt: true,
              updatedAt: true,
              senderUid: true,
              sender: {
                select: {
                  profileImage: true,
                  firstName: true,
                  lastName: true,
                  login: true,
                  uid: true
                }
              }
            }
          },
        },
      });
    } else if (type === "Single") {
      return this.prisma.conversation.findUnique({
        where: {
          uid,
          type: "Single",
        },
        select: {
          uid: true,
          messages: true,
          type: true,

          participants: {
            select: {
              firstName: true,
              lastName: true,
              login: true,
              profileImage: true,
              uid: true,
            },
            where: {
              uid: { not: user },
            },
          },
        },
      });
    }
  }

  public async update(uid: string, updates: Prisma.ConversationUpdateInput) {
    return this.prisma.conversation.update({
      where: { uid },
      data: updates,
      //   include: { Messages: true },
    });
  }

  public async delete(uid: string) {
    return this.prisma.conversation.delete({ where: { uid } });
  }

  public async deleteAll() {
    return this.prisma.conversation.deleteMany();
  }

  public async deleteParticipant(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: {
        participants: { disconnect: { uid } },
        mut: {
          disconnect: { uid },
        },
      },
    });
  }

  public async deleteAdmin(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { disconnect: { uid } } },
    });
  }

  public async addParticipant(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: {
        uid: cnvUid,
        participants: { none: { uid } },
        ban: { none: { uid } },
      },
      data: { participants: { connect: { uid } } },
    });
  }

  public async muted(uid: string, cnv: string, until: Date) {
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        mut: {
          create: {
            user: { connect: { uid } },
            until,
          },
        },
      },
    });
  }

  public async unmut(uid: string, cnv: string) {
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        mut: {
          delete: {
            uid,
          },
        },
      },
    });
  }

  public async getMut(uid: string, cnv: string) {
    return this.prisma.mutedConversation.findFirst({
      where: { AND: [{ userUid: uid, conversationUid: cnv }] },
    });
  }

  public async ban(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: {
        ban: {
          connect: {
            uid,
          },
        },
        participants: {
          disconnect: {
            uid,
          },
        },
      },
    });
  }

  public async unban(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: {
        ban: {
          disconnect: {
            uid,
          },
        },
      },
    });
  }

  public async addAdmin(uid: string, cnvUid: string) {
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { connect: { uid } } },
    });
  }
}
