import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { AnyNaptrRecord } from "dns";
import { Server, Socket } from "socket.io";
import { parse as cookieParser } from "cookie";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/global/auth/strategy/auth.jwt.startegy";
import { PrismaService } from "src/global/prisma/prisma.service";
import { ConversationsService } from "../conversations/conversations.service";
import { UseGuards } from "@nestjs/common";
import { ChatAuthGuard } from "./guards/chat.guard";
import { User } from "db";

export class SendPrivateMessageDto {
  to: string;
  message: string;
  conversation: string;
}

export class SendRoomMessageDto {
  message: string;
  conversation: string;
}

export class JoinChannel {
  conversation: string;
}

@WebSocketGateway({
  namespace: "chat",
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users: Map<string, Socket> = new Map();

  constructor(
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
    private prismaService: PrismaService,
    private readonly conversationsService: ConversationsService
  ) {}

  @UseGuards(ChatAuthGuard)
  async handleDisconnect(client: Socket) {
    let user: User = (client as any).user;
    console.log("Client Disconnected!");
    // for (let [key, value] of this.users.entries()) {
    //   if (key === user.uid) {
    //     this.users.delete(key);
    //     break;
    //   }
    // }
  }

  async handleConnection(client: Socket) {
    try {
      console.log("Client Connected!");
      const cookies = cookieParser(client.handshake.headers["cookie"] ?? "");
      const authToken = cookies["token"];
      if (!authToken) throw new WsException("missing auth-token.");

      const payload: { email: string } = await this.jwtService.verifyAsync(
        authToken,
        { secret: process.env.JWT_SECRET_TOKEN }
      );

      const user = await this.prismaService.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) throw new WsException("User does not exist.");
      console.log(user);
      this.users.set(user.uid, client);
    } catch (err) {
      console.log(err);
      let msg = "Something went wrong.";
      if (err instanceof WsException) msg = err.message;
      client.emit("error", msg);
      client.disconnect();
    }
  }

  @SubscribeMessage("sendPrivateMessage")
  @UseGuards(ChatAuthGuard)
  async sendMessageToUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ) {
    const to = data.to as string;

    const to_client = this.users.get(to);
    let user: User = (client as any).user;

    const message = await this.conversationsService.sendMessage(
      {
        content: data.message,
        conversation: data.conversation,
      },
      user.uid
    );

    if (to_client) {
      to_client.emit("newmessage", message);
    }
    client.emit("newmessage", message);
  }

  @SubscribeMessage("joinRoom")
  @UseGuards(ChatAuthGuard)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinChannel
  ) {
    console.log(data);
    const room = data.conversation as string;
    client.join(room);
  }

  @SubscribeMessage("sendMessageInRoom")
  @UseGuards(ChatAuthGuard)
  async sendMessageInRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendRoomMessageDto
  ) {
    console.log(data);
    const room = data.conversation as string;
    let user: User = (client as any).user;
    const message = await this.conversationsService.sendMessage(
      {
        content: data.message,
        conversation: data.conversation,
      },
      user.uid
    );
    client.emit("newmessageingroup", message);
    client.to(room).emit("newmessageingroup", message);
  }

  @SubscribeMessage("leaveRoom")
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinChannel
  ) {
    const room = data.conversation as string;
    client.leave(room);
  }
}
