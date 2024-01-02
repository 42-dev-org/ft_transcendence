import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/global/auth/auth.module";
import { ConversationsModule } from "../conversations/conversations.module";

@Module({
  imports: [AuthModule, ConversationsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
