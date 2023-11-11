import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, Subject } from '../rbac.casl.factory';
import { PUT_ABILITY } from 'src/shared/constants/rbac.constants';
import { RequirementsRules } from '../decorator/rbac.decorator';
import { Request } from 'express';
import { ForbiddenError } from '@casl/ability';
import { User } from 'db';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly ability: AbilityFactory,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const rules =
      this.reflector.get<RequirementsRules[]>(
        PUT_ABILITY,
        context.getHandler(),
      ) || [];

    const req: Request = context.switchToHttp().getRequest();

    const ability = this.ability.defineAbility(req.user as User);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject as Subject,
        );
      });
    } catch (error) {
      throw new ForbiddenException();
    }

    return true;
  }
}
