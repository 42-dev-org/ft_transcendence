"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutAbilities = void 0;
const common_1 = require("@nestjs/common");
const rbac_constants_1 = require("../../../shared/constants/rbac.constants");
const PutAbilities = (...requirements) => (0, common_1.SetMetadata)(rbac_constants_1.PUT_ABILITY, requirements);
exports.PutAbilities = PutAbilities;
//# sourceMappingURL=rbac.decorator.js.map