import { Module, Scope } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesService } from './services/game.service';
import { Game } from 'db';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmitter } from 'stream';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [
    GamesService,
    GamesGateway,
    EventEmitter2,
    EventEmitter,
    JwtService,
    PrismaService,
    {
      provide: 'GAMES',
      useValue: new Map<string, Partial<Game>>(),
      scope: Scope.DEFAULT
    },
    {
      provide: 'CLIENTS',
      // userId, sockets ids
      useValue: new Map<string, string[]>(),
    },
  ],
})
export class GamesModule {}
