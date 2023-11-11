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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const conversations_service_1 = require("./conversations.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const update_conversation_dto_1 = require("./dto/update-conversation.dto");
const get_user_decorator_1 = require("../../shared/decorators/get-user.decorator");
const passport_1 = require("@nestjs/passport");
const rbac_decorator_1 = require("../../global/rbac/decorator/rbac.decorator");
const rbac_enum_1 = require("../../global/rbac/enum/rbac.enum");
const platform_express_1 = require("@nestjs/platform-express");
const media_pipe_1 = require("../../global/media/pipes/media.pipe");
let ConversationsController = exports.ConversationsController = class ConversationsController {
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    create(createConversationDto) {
        return this.conversationsService.create(createConversationDto);
    }
    async findMeAll({ uid }) {
        return this.conversationsService.findMeAll(uid);
    }
    async findAll() {
        return this.conversationsService.findAll();
    }
    async addParticipant(dto) {
        return this.conversationsService.addParticipant(dto);
    }
    async deleteParticipant(dto) {
        return this.conversationsService.deleteParticipant(dto);
    }
    async addAdmin(dto) {
        return this.conversationsService.addAdmin(dto);
    }
    async deleteAdmin(dto) {
        return this.conversationsService.deleteAdmin(dto);
    }
    async addProfileImage(file, { uid }, cnvUid) {
        return this.conversationsService.addProfileImage(file, cnvUid, uid);
    }
    async deleteProfileImage(uid) {
        return this.conversationsService.deleteProfileImage(uid);
    }
    findOne(id) {
        return this.conversationsService.findOne(id);
    }
    update(id, updateConversationDto) {
        return this.conversationsService.update(id, updateConversationDto);
    }
    remove(id) {
        return this.conversationsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Create, subject: 'Conversation' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "findMeAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('add-participant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_conversation_dto_1.UpdateUserMembershipInRoomDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "addParticipant", null);
__decorate([
    (0, common_1.Patch)('delete-participant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_conversation_dto_1.UpdateUserMembershipInRoomDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "deleteParticipant", null);
__decorate([
    (0, common_1.Patch)('add-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_conversation_dto_1.UpdateUserMembershipInRoomDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Patch)('delete-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_conversation_dto_1.UpdateUserMembershipInRoomDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.Patch)('add-profile-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UsePipes)(media_pipe_1.FileValidatorPipe),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "addProfileImage", null);
__decorate([
    (0, common_1.Patch)('delete-profile-imge'),
    __param(0, (0, common_1.Body)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "deleteProfileImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Read, subject: 'Conversation' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Update, subject: 'Conversation' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_conversation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, rbac_decorator_1.PutAbilities)({ action: rbac_enum_1.Actions.Delete, subject: 'Conversation' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "remove", null);
exports.ConversationsController = ConversationsController = __decorate([
    (0, common_1.Controller)('conversations'),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
//# sourceMappingURL=conversations.controller.js.map