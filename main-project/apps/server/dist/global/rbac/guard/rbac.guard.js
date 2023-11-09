"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rbac_casl_factory_1 = require("../rbac.casl.factory");
const rbac_constants_1 = require("../../../shared/constants/rbac.constants");
const ability_1 = require("@casl/ability");
let RbacGuard = exports.RbacGuard = class RbacGuard {
    constructor(reflector, ability) {
        this.reflector = reflector;
        this.ability = ability;
    }
    canActivate(context) {
        const rules = this.reflector.get(rbac_constants_1.PUT_ABILITY, context.getHandler()) || [];
        const req = context.switchToHttp().getRequest();
        const ability = this.ability.defineAbility(req.user);
        try {
            rules.forEach((rule) => {
                ability_1.ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
        return true;
    }
};
exports.RbacGuard = RbacGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        rbac_casl_factory_1.AbilityFactory])
], RbacGuard);
//# sourceMappingURL=rbac.guard.js.map