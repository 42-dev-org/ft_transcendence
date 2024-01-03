import { Module, Scope } from "@nestjs/common";
import { GamesGateway } from "./games.gateway";
import { GamesService } from "./services/game.service";
import { Game } from "db";
import { PrismaService } from "src/global/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [],
  providers: [
    GamesService,
    GamesGateway,
    JwtService,
    PrismaService,
    {
      provide: "GAMES",
      useValue: new Map<string, Partial<Game>>(),
      scope: Scope.DEFAULT,
    },
    {
      provide: "CLIENTS",
      // userId, sockets ids
      useValue: new Map<string, string[]>(),
    },
  ],
})
export class GamesModule {}
