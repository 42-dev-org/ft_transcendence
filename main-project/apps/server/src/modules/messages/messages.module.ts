import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesRepository } from "./repository/messages.repository";

@Module({
  providers: [MessagesService, MessagesRepository],
  exports: [MessagesService],
})
export class MessagesModule {}
