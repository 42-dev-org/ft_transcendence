import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { parse as cookieParser } from "cookie";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/global/auth/strategy/auth.jwt.startegy";
import { PrismaService } from "src/global/prisma/prisma.service";
import { ConversationsService } from "../conversations/conversations.service";
import { ForbiddenException, HttpException, UseGuards } from "@nestjs/common";
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

type MySocket = Socket & { user: User };

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
  async handleDisconnect(client: MySocket) {
    this.users.delete(client?.user?.uid);
  }

  async handleConnection(client: Socket) {
    try {
      const cookies = cookieParser(client.handshake.headers["cookie"] ?? "");
      const authToken = cookies["token"];
      if (!authToken) throw new ForbiddenException("missing auth-token.");

      const payload: { email: string } = await this.jwtService.verifyAsync(
        authToken,
        { secret: process.env.JWT_SECRET_TOKEN }
      );

      const user = await this.prismaService.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) throw new ForbiddenException("User does not exist.");
      (client as MySocket).user = user;

      this.users.set(user.uid, client);
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
      client.disconnect();
    }
  }

  @SubscribeMessage("sendPrivateMessage")
  @UseGuards(ChatAuthGuard)
  async sendMessageToUser(
    @ConnectedSocket() client: MySocket,
    @MessageBody() data: any
  ) {
    try {
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
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
    }
  }

  @SubscribeMessage("joinRoom")
  @UseGuards(ChatAuthGuard)
  async joinRoom(
    @ConnectedSocket() client: MySocket,
    @MessageBody() data: JoinChannel
  ) {
    try {
      if (
        !(await this.conversationsService.userHealthy(
          data.conversation,
          client.user.uid
        ))
      ) {
        throw new ForbiddenException("User is not healthy");
      }
      const room = data.conversation as string;
      client.join(room);
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
    }
  }

  @SubscribeMessage("sendMessageInRoom")
  @UseGuards(ChatAuthGuard)
  async sendMessageInRoom(
    @ConnectedSocket() client: MySocket,
    @MessageBody() data: SendRoomMessageDto
  ) {
    try {
      const room = data.conversation as string;
      let user: User = (client as any).user;
      if (
        !(await this.conversationsService.userHealthy(
          data.conversation,
          client.user.uid
        ))
      ) {
        throw new ForbiddenException("User is not healthy");
      }

      const message = await this.conversationsService.sendMessage(
        {
          content: data.message,
          conversation: data.conversation,
        },
        user.uid
      );
      client.emit("newmessageingroup", message);
      client.to(room).emit("newmessageingroup", message);
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
    }
  }

  @SubscribeMessage("removeUserFromRoom")
  @UseGuards(ChatAuthGuard)
  async removeUserFromRoom(
    @ConnectedSocket() client: MySocket,
    @MessageBody("uid") uid: string,
    @MessageBody("conversation") conversation: string
  ) {
    try {
      const room = conversation;
      if (
        !(await this.conversationsService.isAdmin(
          conversation,
          client.user.uid
        ))
      ) {
        throw new WsException("Your not admin");
      }
      const tmp = this.users.get(uid);
      if (tmp) tmp.leave(room);
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
    }
  }

  @SubscribeMessage("leaveRoom")
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinChannel
  ) {
    try {
      const room = data.conversation as string;
      client.leave(room);
    } catch (error) {
      if (error instanceof HttpException) client.emit("error", error.message);
      else client.emit("error", "Error Occured.");
    }
  }
}
