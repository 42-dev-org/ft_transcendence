import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Subjects, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaQuery } from '@casl/prisma';
import { Actions } from './enum/rbac.enum';
import { User } from 'db';

export type Subject =
  | Subjects<{
      User: User;
    }>
  | 'all';

export type AppAbility = PureAbility<[Actions, Subject], PrismaQuery>;
@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('User')) {
      can(Actions.Manage, 'all');
    } else {
      can(Actions.Read, 'User');
      can(Actions.Delete, 'User');
      can(Actions.Update, 'User');
    }
    return build();
  }
}
