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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const messages_repository_1 = require("./repository/messages.repository");
const media_service_1 = require("../../global/media/providers/media.service");
let MessagesService = exports.MessagesService = class MessagesService {
    constructor(repository, mediaServices) {
        this.repository = repository;
        this.mediaServices = mediaServices;
    }
    async create(createMessageDto, uid) {
        const { content, conversationId } = createMessageDto;
        const data = await this.repository.create({
            content,
            conversation: { connect: { uid: conversationId } },
            sender: { connect: { uid } },
        });
        return {
            status: 'success',
            data,
        };
    }
    async findAll(userId, cnvId) {
        const data = await this.repository.findAllInConversation(cnvId, userId);
        return {
            status: 'success',
            result: data.length,
            data,
        };
    }
    async findOne(id) {
        const data = await this.repository.findOne(id);
        return {
            status: 'success',
            data,
        };
    }
    async update(id, updateMessageDto) {
        const { content } = updateMessageDto;
        const data = await this.repository.update(id, { content });
        return {
            status: 'success',
            data,
        };
    }
    async remove(id) {
        await this.repository.remove(id);
        return {
            status: 'success',
        };
    }
};
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [messages_repository_1.MessagesRepository,
        media_service_1.MediaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map