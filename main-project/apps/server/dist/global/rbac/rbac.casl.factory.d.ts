import { PureAbility } from '@casl/ability';
import { Subjects } from '@casl/prisma';
import { PrismaQuery } from '@casl/prisma';
import { Actions } from './enum/rbac.enum';
import { User } from '@prisma/client';
export type Subject = Subjects<{
    User: User;
}> | 'all';
export type AppAbility = PureAbility<[Actions, Subject], PrismaQuery>;
export declare class AbilityFactory {
    defineAbility(user: User): AppAbility;
}
