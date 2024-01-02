import { Module } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { ConversationsController } from "./conversations.controller";
import { ConversationsRepository } from "./repository/conversations.repository";
import { MessagesModule } from "../messages/messages.module";

@Module({
  imports: [MessagesModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsRepository],
  exports: [ConversationsService],
})
export class ConversationsModule {}
