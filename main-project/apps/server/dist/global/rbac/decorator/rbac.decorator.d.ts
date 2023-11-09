import { Subject } from '@casl/ability';
import { Actions } from '../enum/rbac.enum';
export interface RequirementsRules {
    action: Actions;
    subject: Subject;
}
export declare const PutAbilities: (...requirements: RequirementsRules[]) => import("@nestjs/common").CustomDecorator<string>;
