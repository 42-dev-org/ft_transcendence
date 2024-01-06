import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Prisma, $Enums } from "db";
import { PrismaService } from "src/global/prisma/prisma.service";
import { JoinChat } from "../dto/update-conversation.dto";

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
      await this.prisma.friend.findFirst({
        where: {
          OR: [
            {
              AND: [{ user1uid: uid }, { user2uid: user }],
            },
            {
              AND: [{ user2uid: uid }, { user1uid: user }],
            },
          ],
          status: "Banned",
        },
      })
    )
      return null;
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
      const joined = await this.prisma.conversation.findMany({
        where: {
          OR: [
            {
              participants: {
                some: {
                  uid,
                },
              },
            },
            {
              ban: {
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
          visibility: true,
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
      const open = await this.prisma.conversation.findMany({
        where: {
          AND: [
            {
              participants: {
                none: {
                  uid,
                },
              },
            },
            {
              ban: {
                none: {
                  uid,
                },
              },
            },
            {
              visibility: {
                not: "Private",
              },
            },
          ],
        },
        select: {
          name: true,
          profileImage: true,
          visibility: true,
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
      return {
        public: open,
        my: joined,
      };
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
                  uid: true,
                },
              },
            },
          },
        },
      });
    } else if (type === "Single") {
      const conversation = await this.prisma.conversation.findUnique({
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

      if (
        conversation &&
        (await this.prisma.friend.findFirst({
          where: {
            OR: [
              { user1uid: user, user2uid: conversation.participants[0].uid },
              { user2uid: user, user1uid: conversation.participants[0].uid },
            ],
            status: "Banned",
          },
        }))
      ) {
        throw new ForbiddenException();
      }
      return conversation;
    }
  }

  async getConversation(uid: string) {
    return this.prisma.conversation.findUnique({
      where: {
        uid,
      },
    });
  }

  public async joinMe(user: string, dto: JoinChat) {
    return this.prisma.conversation.update({
      where: {
        uid: dto.conversation,
      },
      data: {
        participants: {
          connect: {
            uid: user,
          },
        },
      },
    });
  }

  public async getOne(uid: string, user: string) {
    return this.prisma.conversation.findUnique({
      where: {
        uid,
        participants: {
          some: {
            uid: user,
          },
        },
      },
      include: {
        participants: true,
      },
    });
  }

  public async isSingleChatHealthy(uid: string, user: string) {
    const friend = await this.prisma.friend.findFirst({
      where: {
        OR: [
          { user1uid: user, user2uid: uid },
          { user2uid: user, user1uid: uid },
        ],
        status: "Banned",
      },
    });
    return !friend;
  }

  public async protect(cnv: string, password: string) {
    if (
      !(await this.prisma.conversation.findFirst({
        where: {
          uid: cnv,
          visibility: {
            not: "Protected",
          },
        },
      }))
    )
      throw new ConflictException();
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        visibility: "Protected",
        password,
      },
    });
  }
  public async unprotect(cnv: string, visibility: $Enums.ChatVisibility) {
    if (
      !(await this.prisma.conversation.findFirst({
        where: {
          uid: cnv,
          visibility: "Protected",
        },
      }))
    )
      throw new ConflictException();
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        visibility,
        password: null,
      },
    });
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
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid: cnvUid,
        AND: [
          {
            participants: {
              some: {
                uid,
              },
            },
          },
          {
            owner: {
              uid: { not: uid },
            },
          },
          {
            admins: {
              none: {
                uid,
              },
            },
          },
          {
            ban: {
              none: {
                uid,
              },
            },
          },
          {
            mut: {
              none: {
                user: {
                  uid,
                },
              },
            },
          },
        ],
      },
    });
    if (!cnv) throw new ConflictException();
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

  public async left(uid: string, cnv: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { uid: cnv },
      select: {
        participants: {
          where: {
            uid,
          },
          select: {
            uid: true,
          },
        },
        admins: {
          where: {
            uid,
          },
          select: {
            uid: true,
          },
        },
        mut: {
          where: {
            userUid: uid,
          },
          select: {
            uid: true,
          },
        },
        ban: {
          where: {
            uid,
          },
          select: {
            uid: true,
          },
        },
        owner: {
          select: {
            uid: true,
          },
        },
      },
    });
    const isAdmin = !!conversation.admins.length;
    const isOwner = !!conversation.owner?.uid;
    const isBanned = !!conversation.ban.length;
    const isMut = !!conversation.mut.length;
    if (isMut || isBanned) {
      throw new ForbiddenException();
    }
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        participants: {
          disconnect: {
            uid,
          },
        },
        ...(isAdmin
          ? {
              admins: {
                disconnect: {
                  uid,
                },
              },
            }
          : {}),
        ...(isOwner
          ? {
              owner: {
                disconnect: {
                  uid,
                },
              },
            }
          : {}),
      },
    });
  }

  public async deleteAdmin(uid: string, cnvUid: string) {
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid: cnvUid,
        admins: {
          some: {
            uid,
          },
        },
      },
    });
    if (!cnv) throw new ConflictException();
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { disconnect: { uid } } },
    });
  }

  public async addParticipant(uid: string, cnvUid: string) {
    const cnv = await this.prisma.conversation.findFirst({
      where: {
        uid: cnvUid,
        participants: {
          some: {
            uid,
          },
        },
      },
    });
    if (cnv) throw new ConflictException();
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
    const mut = await this.prisma.mutedConversation.findFirst({
      where: {
        userUid: uid,
        conversationUid: cnv,
      },
    });
    if (mut) throw new ConflictException();
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
    const mut = await this.prisma.mutedConversation.findFirst({
      where: {
        userUid: uid,
        conversationUid: cnv,
      },
    });
    if (!mut) throw new ConflictException();
    return this.prisma.conversation.update({
      where: { uid: cnv },
      data: {
        mut: {
          delete: {
            uid: mut.uid,
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
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid: cnvUid,
        ban: {
          some: {
            uid,
          },
        },
      },
    });
    if (cnv) throw new ConflictException();
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
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid: cnvUid,
        ban: {
          some: {
            uid,
          },
        },
      },
    });
    if (!cnv) throw new ConflictException();
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
    const cnv = await this.prisma.conversation.findUnique({
      where: {
        uid: cnvUid,
        admins: {
          some: {
            uid,
          },
        },
      },
    });
    if (cnv) throw new ConflictException();
    return this.prisma.conversation.update({
      where: { uid: cnvUid },
      data: { admins: { connect: { uid } } },
    });
  }
}
