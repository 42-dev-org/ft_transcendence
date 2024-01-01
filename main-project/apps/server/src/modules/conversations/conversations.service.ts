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
import { $Enums } from "db";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { MessagesService } from "../messages/messages.service";

@Injectable()
export class ConversationsService {
  public constructor(
    private readonly repository: ConversationsRepository,
    private readonly messages: MessagesService
  ) {}

  async sendMessage(dto: CreateMessageDto, uid: string) {
    return this.messages.create(dto, uid);
  }

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

  async protectConversation(dto: ProtectChannel) {
    return this.repository.protect(dto.conversation, dto.password);
  }

  async unprotectConversation(dto: UnProtectChannel) {
    return this.repository.unprotect(dto.conversation, dto.visibility);
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

    if (createConversationDto.type === "Single") {
      const newConversation = await this.repository.create(
        {
          participants: {
            connect: [{ uid: user }, { uid: participants[0] }],
          },
          type,
        },
        { type, uid: user, user: participants[0] }
      );
      return newConversation;
    } else if (createConversationDto.type === "Group") {
      const newConversation = await this.repository.create(
        {
          owner: {
            connect: {
              uid: user,
            },
          },
          name,
          participants: {
            connect: participants
              .map((uid) => ({ uid }))
              .concat([
                {
                  uid: user,
                },
              ]),
          },
          type,
          visibility,
          ...(visibility === "Protected"
            ? {
                password,
              }
            : {}),
        },
        {
          type,
        }
      );
      return newConversation;
    }
  }

  async findAll() {
    const cnvs = await this.repository.findAll();

    return {
      status: "success",
      results: cnvs.length,
      data: cnvs,
    };
  }

  async findOne(id: string, user: string, type: $Enums.ConversationTypes) {
    const cnv = await this.repository.findOne(id, user, type);

    return {
      status: "success",
      data: cnv,
    };
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    const { name } = updateConversationDto;

    const cnv = await this.repository.update(id, {
      name,
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
    const data = await this.repository.addParticipant(
      dto.user,
      dto.conversation
    );
    return {
      status: "success",
      data,
    };
  }
  async ban(dto: UpdateUserMembershipInRoomDto) {
    const data = await this.repository.ban(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }
  async unabn(dto: UpdateUserMembershipInRoomDto) {
    const data = await this.repository.unban(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }

  async deleteParticipant(dto: UpdateUserMembershipInRoomDto) {
    const data = await this.repository.deleteParticipant(
      dto.user,
      dto.conversation
    );
    return {
      status: "success",
      data,
    };
  }

  async addAdmin(dto: UpdateUserMembershipInRoomDto) {
    const data = await this.repository.addAdmin(dto.user, dto.conversation);
    return {
      status: "success",
      data,
    };
  }

  async deleteAdmin(uid: string, user: string) {
    const data = await this.repository.deleteAdmin(user, uid);
    return {
      status: "success",
      data,
    };
  }

  async addProfileImage(file: MediaFile, cnvId: string, userId: string) {
    // const data = await this.media.uploadFile(file, userId);
    // await this.repository.update(cnvId, { profileImage: data.url });
    return {
      status: "success",
      // data,
    };
  }

  async deleteProfileImage(cnvId: string) {
    await this.repository.update(cnvId, { profileImage: null });

    return {
      status: "success",
    };
  }

  async left(uid: string, cnv: string) {
    this.repository.left(uid, cnv);
  }
}
