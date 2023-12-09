import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import {
  UpdateConversationDto,
  UpdateUserMembershipInRoomDto,
} from './dto/update-conversation.dto';
import { ConversationsRepository } from './repository/conversations.repository';
import { MediaFile } from 'src/shared/types/media';
import { MediaService } from 'src/global/media/providers/media.service';

@Injectable()
export class ConversationsService {
  public constructor(
    private readonly repository: ConversationsRepository,
    private readonly media: MediaService,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    const { admins, participants, description, name, tags, type } =
      createConversationDto;

    const newConversation = await this.repository.create({
      name,
      participants: {
        connect: participants.map((uid) => ({ uid })),
      },
      type,
      description: description || '',
      admins: {
        connect: admins.map((uid) => ({ uid })),
      },
      tags,
    });

    return {
      status: 'success',
      data: newConversation,
    };
  }

  async findMeAll(uid: string) {
    const cnvs = await this.repository.findMeAll(uid);
    return {
      status: 'success',
      results: cnvs.length,
      data: cnvs,
    };
  }

  async findAll() {
    const cnvs = await this.repository.findAll();

    return {
      status: 'success',
      results: cnvs.length,
      data: cnvs,
    };
  }

  async findOne(id: string) {
    const cnv = await this.repository.findOne(id);

    return {
      status: 'success',
      data: cnv,
    };
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    const { name, description } = updateConversationDto;

    const cnv = await this.repository.update(id, {
      name,
      description,
    });

    return {
      status: 'success',
      data: cnv,
    };
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }

  async addParticipant(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.addParticipant(dto.user, dto.uid);
    return {
      status: 'success',
      data,
    };
  }

  async deleteParticipant(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.deleteParticipant(dto.user, dto.uid);
    return {
      status: 'success',
      data,
    };
  }

  async addAdmin(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.addAdmin(dto.user, dto.uid);
    return {
      status: 'success',
      data,
    };
  }

  async deleteAdmin(dto: UpdateUserMembershipInRoomDto) {
    const data = this.repository.deleteAdmin(dto.user, dto.uid);
    return {
      status: 'success',
      data,
    };
  }

  async addProfileImage(file: MediaFile, cnvId: string, userId: string) {
    const data = await this.media.uploadFile(file, userId);
    await this.repository.update(cnvId, { profileImage: data.url });
    return {
      status: 'success',
      data,
    };
  }

  async deleteProfileImage(cnvId: string) {
    await this.repository.update(cnvId, { profileImage: null });

    return {
      status: 'success',
    };
  }
}
