import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GamesGateway } from "../games.gateway";
import GameModel from "./game.model.service";
import { PrismaService } from "src/global/prisma/prisma.service";
import { Body } from "matter-js";
import { Game } from "../game.interface";

const MAX_ROUNDS = 1000;

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesGateway: GamesGateway,
    private prismaService: PrismaService,
    @Inject("GAMES")
    private games: Map<string, Partial<Game>>
  ) {}

  private async updateGameScore(gameId: string, userId: string, score: number) {
    return await this.prismaService.gameOnUsers.update({
      where: {
        gameId_userId: {
          gameId,
          userId,
        },
      },
      data: {
        score,
        winner: score < MAX_ROUNDS ? false : true,
      },
    });
  }

  private async updateGameState(
    ball: Body,
    newVirtualGame: Partial<Game>,
    playerIndex: number
  ) {
    const { gameId } = newVirtualGame;

    newVirtualGame.players[playerIndex].score++;
    this.gamesGateway.server.to(gameId).emit("score", newVirtualGame.players);

    Body.setPosition(ball, {
      x: 300,
      y: 400,
    });
    return false;
  }

  @OnEvent("game.play")
  async play(gameId: string) {
    const game = await this.prismaService.game.findUnique({
      where: { id: gameId },
      include: {
        players: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            score: true,
            winner: true,
            user: {
              select: {
                uid: true,
                lastName: true,
                login: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
    const gameModel = new GameModel();
    const newVirtualGame: Partial<Game> = {
      gameId: gameId,
      gameModel,
      height: 800,
      width: 600,
      players: game.players.map(
        ({
          score,
          winner,
          user: { profileImage, lastName, uid: userId, login },
        }) => ({
          score,
          winner,
          profileImage,
          lastName,
          userId,
          login,
        })
      ),
    };

    const interval = setInterval(async () => {
      const ball = gameModel.engine.world.bodies.find(
        (body) => body.label === "ball"
      );
      const ballPosition = {
        x: ball.position.x,
        y: ball.position.y,
      };
      const paddle1 = gameModel.engine.world.bodies.find(
        (body) => body.label === "paddle1"
      );
      const paddle2 = gameModel.engine.world.bodies.find(
        ({ label }) => label === "paddle2"
      );

      let scorred = false;
      if (ball.position.y > paddle1.position.y) {
        await this.updateGameState(ball, newVirtualGame, 1);
        scorred = true;
      }
      if (ball.position.y < paddle2.position.y) {
        await this.updateGameState(ball, newVirtualGame, 0);
        scorred = true;
      }

      if (
        scorred &&
        (newVirtualGame.players[0].score === MAX_ROUNDS ||
          newVirtualGame.players[1].score === MAX_ROUNDS)
      ) {
        newVirtualGame.players.map(
          async (player) =>
            await this.updateGameScore(gameId, player.userId, player.score)
        );
        const oldGame = this.games.get(gameId);
        if (oldGame) {
          clearInterval(oldGame.interval);
          this.games.delete(gameId);
        }
        await this.prismaService.game.update({
          where: { id: gameId },
          data: {
            status: "ENDING",
          },
        });

        this.gamesGateway.server.to(gameId).emit("game-status", {
          timestamp: new Date(),
          status: "ending",
        });
        // leave room !
        return;
      }
      this.gamesGateway.server.to(gameId).emit("ball-position", ballPosition);
      this.gamesGateway.server.to(gameId).emit("paddle-position", [
        { x: paddle1.position.x, y: paddle1.position.y },
        { x: paddle2.position.x, y: paddle2.position.y },
      ]);
    }, 15);

    newVirtualGame.interval = interval;
    this.games.set(gameId, newVirtualGame);
    this.gamesGateway.server.to(gameId).emit("start-game", {
      players: newVirtualGame.players,
      gameId: newVirtualGame.gameId,
    });
  }
  leave() {}
}