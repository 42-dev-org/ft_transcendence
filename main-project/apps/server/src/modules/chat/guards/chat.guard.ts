import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";

import { parse as cookieParser } from "cookie";
import { PrismaService } from "src/global/prisma/prisma.service";
@Injectable()
export class ChatAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
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
    client.user = user;
    return true;
  }
}
