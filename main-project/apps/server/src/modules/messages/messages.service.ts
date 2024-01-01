import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessagesRepository } from "./repository/messages.repository";
import { Media } from "db";
import { MediaFile } from "src/shared/types/media";
import { MediaService } from "src/global/media/providers/media.service";
import { Response } from "express";
import { IncomingMessage } from "http";

@Injectable()
export class MessagesService {
  public constructor(
    private readonly repository: MessagesRepository,
  ) {}

  async create(createMessageDto: CreateMessageDto, uid: string) {
    const { content, conversation } = createMessageDto;

    const data = await this.repository.create({
      content,
      conversation: { connect: { uid: conversation } },
      sender: { connect: { uid } },
    });
    return {
      status: "success",
      data,
    };
  }

  async findAll(userId: string, cnvId: string) {
    const data = await this.repository.findAllInConversation(cnvId, userId);
    return {
      status: "success",
      result: data.length,
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.repository.findOne(id);
    return {
      status: "success",
      data,
    };
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const { content } = updateMessageDto;
    const data = await this.repository.update(id, { content });
    return {
      status: "success",
      data,
    };
  }

  async remove(id: string) {
    await this.repository.remove(id);
    return {
      status: "success",
    };
  }
}
