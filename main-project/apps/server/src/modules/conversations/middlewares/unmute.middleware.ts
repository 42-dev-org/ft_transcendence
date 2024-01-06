import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "src/global/prisma/prisma.service";

@Injectable()
export class UnmutMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // do some tasks
    await this.prisma.mutedConversation.deleteMany({
      where: {
        until: {
          lte: new Date(Date.now()),
        },
      },
    });
    next();
  }
}
