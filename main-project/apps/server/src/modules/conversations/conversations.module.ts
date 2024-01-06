import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { ConversationsController } from "./conversations.controller";
import { ConversationsRepository } from "./repository/conversations.repository";
import { MessagesModule } from "../messages/messages.module";
import { UnmutMiddleware } from "./middlewares/unmute.middleware";

@Module({
  imports: [MessagesModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsRepository],
  exports: [ConversationsService],
})
export class ConversationsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UnmutMiddleware).forRoutes("*"); // Apply the middleware to all routes in the module
  }
}
