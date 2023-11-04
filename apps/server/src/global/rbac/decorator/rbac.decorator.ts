import { SetMetadata } from '@nestjs/common';
import { PUT_ABILITY } from 'src/shared/constants/rbac.constants';
import { Subject } from '@casl/ability';
import { Actions } from '../enum/rbac.enum';

export interface RequirementsRules {
  action: Actions;
  subject: Subject;
}

export const PutAbilities = (...requirements: RequirementsRules[]) =>
  SetMetadata(PUT_ABILITY, requirements);
