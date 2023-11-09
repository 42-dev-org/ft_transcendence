import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../rbac.casl.factory';
export declare class RbacGuard implements CanActivate {
    private readonly reflector;
    private readonly ability;
    constructor(reflector: Reflector, ability: AbilityFactory);
    canActivate(context: ExecutionContext): boolean;
}
