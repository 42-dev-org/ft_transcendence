import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import * as cookieParser from 'cookie-parser';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from 'src/global/prisma/prisma.service';
  import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
  import { Inject, Injectable } from '@nestjs/common';
  import GameModel from './services/game.model.service';
  import { Body } from 'matter-js';
  import { Game } from './game.interface';
  import { JwtStrategy } from 'src/global/auth/strategy/auth.jwt.startegy';

  const parseCookie = str =>
  str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    queue: string[];
  
    @WebSocketServer()
    server: Server;
    constructor(
      private jwtService: JwtService,
      private jwtStrategy: JwtStrategy,
      private prismaService: PrismaService,
      private eventEmitter: EventEmitter2,
      @Inject('GAMES')
      private games: Map<string, Game>,
      @Inject('CLIENTS')
      private clients: Map<string, string[]>,
      
    ) {
      this.queue = [];
      this.clients = new Map<string, string[]>();
    }

    async handleConnection(client: Socket) {
      try {
        console.log("Client Connected!")
        const coockies = parseCookie(client.handshake.headers['cookie'] ?? '')  
        const authToken = coockies['token'];
        if (!authToken) throw new WsException('missing auth-token.');
  
        const payload: { email: string } = await this.jwtService.verifyAsync(
          authToken,
          { secret:  process.env.JWT_SECRET_TOKEN},
        );

        const user = await this.prismaService.user.findUnique({
          where: { email: payload.email },
        });
        if (!user) throw new WsException('User does not exist.');

        if (!this.clients.has(user.uid)) {
          this.clients.set(user.uid, []);
        }
        client.user = user;
        client.inGame = false;
        this.clients.set(user.uid, [...this.clients.get(user.uid), client.id]);
        console.log("clients tabs: ", this.clients)
      } catch (err) {
        console.log(err)
        let msg = 'Something went wrong.';
        if (err instanceof WsException) msg = err.message;
        client.emit('error', msg);
        client.disconnect();
      }
    }
    // // leave queue leave game in case of disconnect
    async handleDisconnect(client: Socket) {

      console.log("Client Disconnected!")
      if (client.user) {
        const userId = client.user.uid;
  
        const tabs = (this.clients.get(userId) ?? []).filter(
          (socketId) => socketId != client.id,
        );
        this.clients.set(userId, tabs);
        const [deletePendingGames, startingGames] =
          await this.prismaService.$transaction([
            this.prismaService.game.deleteMany({
              where: {
                status: 'WAITING',
                players: {
                  some: { userId: client.user.uid },
                },
              },
            }),
            this.prismaService.game.findMany({
              where: {
                status: 'STARTING',
                players: {
                  some: { userId: client.user.uid },
                },
              },
              include: {
                players: {
                  select: {
                    gameId: true,
                    userId: true,
                  },
                },
              },
            }),
          ]);
        if (!client.inGame) return;
        startingGames.map(async ({ id, players }) => {
          const playerGame = players.filter(
            ({ userId }) => userId != client.user.uid,
          )[0];
  
          const odlGame = this.games.get(id);
          if (odlGame) {
            clearInterval(this.games.get(id).interval);
            this.games.delete(id);
          }
          await this.prismaService.game.update({
            where: { id },
            data: {
              status: 'ENDING',
            },
          });
          await this.prismaService.gameOnUsers.update({
            where: {
              gameId_userId: {
                ...playerGame,
              },
            },
            data: {
              score: 10,
              winner: true,
            },
          });
        });
      }
      // TODO: if the client hangout u should remove all pending games !
      // TODO: if game started u should mark it as ending and give points to other player!
    }
  
    // leave queue from client side
    @SubscribeMessage('leave-queue')
    async leaveQueue(client: Socket) {
      if (this.queue.length == 1) {
        // if (this.queue.includes(client.user.id)) {
        this.queue.pop();
        console.log(
          'the client that have been leave the queue is: ',
          client.user.login,
        );
        const game = await this.prismaService.game.deleteMany({
          where: {
            status: 'WAITING',
            players: {
              some: { userId: client.user.uid },
            },
          },
        });
      }
    }
  
    // Listening for 'join-game' WebSocket event
    @SubscribeMessage('join-game')
    async joinGame(client: Socket, payload: any) {
      console.log("join game")
      if (this.queue.includes(client.user.uid)) {
        client.emit('game-status', { timestamp: new Date(), status: 'in_queue' });
        return;
      }
      const playing = await this.prismaService.game.count({
        where: {
          players: { some: { userId: client.user.uid } },
          status: 'STARTING',
        },
      });
      if (playing) {
        client.emit('game-status', { timestamp: new Date(), status: 'started' });
        return;
      }
      this.queue.push(client.user.uid);
      console.log("queue members: ", client.user.firstName)
      // Check if the queue has one player
      if (this.queue.length == 1) {
        // If only one player is in the queue, create a new game and join the user to it
        const newGame = await this.prismaService.game.create({
          data: {
            players: {
              create: {
                score: 0,
                winner: false,
                userId: client.user.uid,
              },
            },
          },
        });
        client.join(newGame.id);
      }
      // If two players are in the queue, find a pending game with the first player
      else if (this.queue.length == 2) {
        const pendingGame = await this.prismaService.game.findFirst({
          where: {
            status: 'WAITING',
            players: {
              some: {
                userId: this.queue[0],
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
        if (pendingGame) {
          await this.prismaService.game.update({
            where: { id: pendingGame.id },
            data: {
              players: {
                create: {
                  score: 0,
                  winner: false,
                  userId: client.user.uid,
                },
              },
              status: 'STARTING',
            },
          });
          client.inGame = true;
          client.join(pendingGame.id);
          this.eventEmitter.emit('game.play', pendingGame.id);
        }
        // Remove both players from the queue
        this.queue.pop();
        this.queue.pop();
      }
    }
  
    @SubscribeMessage('leave-game')
    async leaveGame(client: Socket) {
      const startingGames = await this.prismaService.game.findMany({
        where: {
          status: 'STARTING',
          players: {
            some: { userId: client.user.uid },
          },
        },
        include: {
          players: {
            select: {
              gameId: true,
              userId: true,
            },
          },
        },
      });
  
      startingGames.map(async ({ id, players }) => {
        const playerGame = players.filter(
          ({ userId }) => userId != client.user.uid,
        )[0];
  
        client.to(id).emit('game-status', {
          timestamp: new Date(),
          status: 'player-left',
        });
        clearInterval(this.games.get(id).interval);
        this.games.delete(id);
        await this.prismaService.game.update({
          where: { id },
          data: {
            status: 'ENDING',
          },
        });
        await this.prismaService.gameOnUsers.update({
          where: {
            gameId_userId: {
              ...playerGame,
            },
          },
          data: {
            score: 10,
            winner: true,
          },
        });
      });
    }
  
    // // Server-side implementation
    // @SubscribeMessage('join-invite')
    // async joinInvite(client: Socket, payload: { roomId: string }, @ConnectedSocket() socket: Socket) {
    //   try {
    //     // Perform database operations to join the user to the game
    //     // ...
  
    //     // Emit a success response to the client
    //     socket.emit('join-invite-response', { success: true });
    //   } catch (error) {
    //     // Handle errors and emit a failure response to the client
    //     socket.emit('join-invite-response', { success: false, error: error.message });
    //   }
    // }
  
    async isUserInGame(userId: string): Promise<boolean> {
      try {
        const gameCount = await this.prismaService.game.count({
          where: {
            players: {
              some: {
                userId,
              },
            },
            OR: [
              { status: 'INVITING' },
              { status: 'STARTING' },
            ],
          },
        });
        return gameCount > 0;
      } catch (error) {
        console.error('Error checking user game status:', error);
        throw new Error('Failed to check user game status.');
      }
    }
  
    @SubscribeMessage('invite')
    async invite(client: Socket, payload: { userId: string }) {
      const { userId } = payload;
  
      const newGame = await this.prismaService.game.create({
        data: {
          status: 'INVITING',
          players: {
            create: {
              score: 0,
              winner: false,
              userId: client.user.uid,
            },
          },
        },
      });
  
      const displayName = client.user.lastName
      const activeTabs = this.clients.get(userId) ?? [];
      console.log("Tabs: ", activeTabs.length);
      this.server.to(activeTabs).emit('invite', { displayName });
      return newGame.id;
    }
  
    @SubscribeMessage('join-invite')
    async joinInvite(client: Socket, payload: { roomId?: string, accepted: boolean }) {
  
      const { user, inGame } = client;
  
      // check if the invited User is inGame or not
  
      if (inGame) {
        client.emit('invitation-failed', { error: "You are already in game!" });
        return;
      }
  
      // const recieverInGame = await this.isUserInGame(userId);
  
      const game = await this.prismaService.game.findFirst({
        where: { id: payload.roomId },
        include: { _count: true },
      });
      if (payload.accepted == true && game._count.players !== 2) {
        const updatedGame = this.prismaService.game.update({
          where: { id: payload.roomId },
          data: {
            status: 'STARTING',
            players: {
              create: {
                score: 0,
                winner: false,
                userId: client.user.uid
              },
            },
          },
        });
        this.eventEmitter.emit('game.play', (await updatedGame).id);
      };
    }
  
    @SubscribeMessage('reject-invite')
    async rejectInvite(client: Socket) {
  
    }
  
    @SubscribeMessage('move-paddle')
    async paddlePosition(
      client: Socket,
      { roomId, direction }: { direction: 'right' | 'left'; roomId: string },
    ) {
      const game = await this.prismaService.game.findUnique({
        where: {
          id: roomId,
        },
        include: {
          players: {
            orderBy: { createdAt: 'asc' },
            select: {
              userId: true,
            },
          },
        },
      });
      console.log(game?.players, roomId, direction);
      if (!game || game.players.length != 2) return;
  
      const paddleLabel =
        game.players[0].userId === client.user.uid ? 'paddle1' : 'paddle2';
      const odlGame = this.games.get(roomId);
      if (!odlGame) return;
  
      const { gameModel } = odlGame;
      const paddle = gameModel.engine.world.bodies.find(
        (body) => body.label === paddleLabel,
      );
  
      const paddleWidth = gameModel.map(120, 600, gameModel.width);
  
      const calcDeltaX: Record<
        'left' | 'right',
        (gameModel: GameModel) => number
      > = {
        left: (gameModel: GameModel) =>
          Math.max(-10, -paddle.position.x + paddleWidth / 2),
        right: (gameModel: GameModel) =>
          Math.min(10, gameModel.width - (paddle.position.x + paddleWidth / 2)),
      };
  
      const deltaX = calcDeltaX[direction](gameModel);
  
      // Use Body.setPosition to update the position in the physics engine
      Body.setPosition(paddle, {
        x: paddle.position.x + deltaX,
        y: paddle.position.y,
      });
  
      const paddle1 = gameModel.engine.world.bodies.find(
        ({ label }) => label === 'paddle1',
      );
      const paddle2 = gameModel.engine.world.bodies.find(
        ({ label }) => label === 'paddle2',
      );
      this.server.to(roomId).emit('paddle-position', [
        { x: paddle1.position.x, y: paddle1.position.y },
        { x: paddle2.position.x, y: paddle2.position.y },
      ]);
    }
  }
  