import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './rbac.casl.factory';

@Global()
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class RbacModule {}
