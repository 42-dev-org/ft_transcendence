"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityFactory = void 0;
const ability_1 = require("@casl/ability");
const prisma_1 = require("@casl/prisma");
const common_1 = require("@nestjs/common");
const rbac_enum_1 = require("./enum/rbac.enum");
let AbilityFactory = exports.AbilityFactory = class AbilityFactory {
    defineAbility(user) {
        const { can, build } = new ability_1.AbilityBuilder(prisma_1.createPrismaAbility);
        if (user.roles.includes('User')) {
            can(rbac_enum_1.Actions.Manage, 'all');
        }
        else {
            can(rbac_enum_1.Actions.Read, 'User');
            can(rbac_enum_1.Actions.Delete, 'User');
            can(rbac_enum_1.Actions.Update, 'User');
        }
        return build();
    }
};
exports.AbilityFactory = AbilityFactory = __decorate([
    (0, common_1.Injectable)()
], AbilityFactory);
//# sourceMappingURL=rbac.casl.factory.js.map