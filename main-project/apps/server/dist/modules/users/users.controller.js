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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const passport_1 = require("@nestjs/passport");
const rbac_decorator_1 = require("../../global/rbac/decorator/rbac.decorator");
const rbac_enum_1 = require("../../global/rbac/enum/rbac.enum");
const rbac_guard_1 = require("../../global/rbac/guard/rbac.guard");
const get_user_decorator_1 = require("../../shared/decorators/get-user.decorator");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const media_pipe_1 = require("../../global/media/pipes/media.pipe");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(uid) {
        return this.usersService.findOne(uid);
    }
    update(uid, updateUserDto) {
        return this.usersService.update(uid, updateUserDto);
    }
    remove(uid) {
        return this.usersService.remove(uid);
    }
    findMe({ uid }) {
        return this.usersService.findOne(uid);
    }
    deleteMe({ uid }) {
        return this.usersService.remove(uid);
    }
    updateMe({ uid }, dto) {
        return this.usersService.update(uid, { ...dto });
    }
    changeProfileImage(user, file) {
        return this.usersService.changeProfilePicture(file, user.uid);
    }
    changeCoverImage(user, file) {
        return this.usersService.changeCoverPicture(file, user.uid);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Manage, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uid'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Manage, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':uid'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Manage, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uid'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Manage, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Read, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findMe", null);
__decorate([
    (0, common_1.Delete)('me'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Delete, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Update, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Post)('me/profile-image'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Update, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    (0, common_1.UsePipes)(media_pipe_1.FileValidatorPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changeProfileImage", null);
__decorate([
    (0, common_1.Post)('me/cover-image'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Update, subject: 'User' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rbac_guard_1.RbacGuard),
    (0, common_1.UsePipes)(media_pipe_1.FileValidatorPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changeCoverImage", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map