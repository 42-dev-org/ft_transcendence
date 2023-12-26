import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConversationsService } from "../conversations.service";
import { Request } from "express";
import { User } from "db";

@Injectable()
export class UserIsHealthyGuard implements CanActivate {
  constructor(private readonly conversationsService: ConversationsService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const { conversation } = request.body;
    const { uid } = <User>request.user;
    return this.conversationsService.userHealthy(conversation || request.params.id, uid);
  }
}
