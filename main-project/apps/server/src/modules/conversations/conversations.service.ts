import { Injectable } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import {
  ProtectChannel,
  UnProtectChannel,
  UpdateConversationDto,
  UpdateUserMembershipInRoomDto,
} from "./dto/update-conversation.dto";
import { ConversationsRepository } from "./repository/conversations.repository";
import { MediaFile } from "src/shared/types/media";
import { MediaService } from "src/global/media/providers/media.service";

@Injectable()
export class ConversationsService {
  public constructor(
    private readonly repository: ConversationsRepository,
    private readonly media: MediaService
  ) {}

  async isAdmin(uid: string, user: string) {
    return this.repository.isAdmin(uid, user);
  }
  async userExistInConversation(uid: string, user: string) {
    return this.repository.existsInConversation(uid, user);
  }
  async conversationExist(uid: string) {
    return this.repository.conversationExist(uid);
  }
  async isOwner(uid: string, user: string) {
    return this.repository.isOwner(uid, user);
  }
  async isMuted(uid: string, user: string) {
    return this.repository.isMuted(uid, user);
  }

  async conversationType(uid: string) {
    return this.repository.conversationType(uid);
  }

  async userHealthy(uid: string, user: string) {
    return this.repository.userHealthy(uid, user);
  }

  async conversationVisibility(uid: string) {
    return this.repository.conversationVisibility(uid);
  }

  async findMeAllSingleConversations(user: string) {
    return this.repository.findMeAll(user, "Single");
  }

  async findMeAllChannels(user: string) {
    return this.repository.findMeAll(user, "Group");
  }

  // TODO: impl this
  async protectConversation(dto: ProtectChannel) {
    return this.repository.update(
      dto.conversation, {
        visibility: 'Protected',
        password: dto.password
      }
    )
  }

  // TODO: impl this
  async unprotectConversation(dto: UnProtectChannel) {
    return this.repository.update(
      dto.conversation,
      {
        visibility: 'Public',
        password: null
      }
    )
  }

  async unMuteUser(uid: string, user: string) {
    return this.repository.unmut(user, uid);
  }

  async muteUser(uid: string, user: string, until: Date) {
    return this.repository.muted(user, uid, until);
  }

  async create(createConversationDto: CreateConversationDto, user: string) {
    const { participants, name, type, visibility, password } =
      createConversationDto;

    const newConversation = await this.repository.create({
      owner: {
        connect: {
          uid: user,
        },
      },
      name,
      participants: {
        connect: participants.map((uid) => ({ uid })),
      },
      type,
      visibility,
      ...(visibility === "Private"
        ? {
            password,
          }
        : {}),
    });

    return {
      status: "success",
      data: newConversation,
    };
  }

  async findAll() {
    const cnvs = await this.repository.findAll();

    return {
      status: "success",
      results: cnvs.length,
      data: cnvs,
    };
  }

  async findOne(id: string) {
    const cnv = await this.repository.findOne(id);

    return {
      status: "success",
      data: cnv,
    };
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    const { name, visibility } = updateConversationDto;

    const cnv = await this.repository.update(id, {
      name,
      visibility,
    });

    return {
      status: "success",
      data: cnv,
    };
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }

  async addParticipant(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.addParticipant(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }
  async ban(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.ban(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }
  async unabn(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.unban(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }

  async deleteParticipant(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.deleteParticipant(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }

  async addAdmin(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.addAdmin(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }

  async deleteAdmin(uid: string, user: string) {
    const data = this.repository.deleteAdmin(user, uid);
    return {
      status: "success",
      data,
    };
  }

  async addProfileImage(file: MediaFile, cnvId: string, userId: string) {
    const data = await this.media.uploadFile(file, userId);
    await this.repository.update(cnvId, { profileImage: data.url });
    return {
      status: "success",
      data,
    };
  }

  async deleteProfileImage(cnvId: string) {
    await this.repository.update(cnvId, { profileImage: null });

    return {
      status: "success",
    };
  }
}
