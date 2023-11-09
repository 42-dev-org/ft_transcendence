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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const conversations_repository_1 = require("./repository/conversations.repository");
const media_service_1 = require("../../global/media/providers/media.service");
let ConversationsService = exports.ConversationsService = class ConversationsService {
    constructor(repository, media) {
        this.repository = repository;
        this.media = media;
    }
    async create(createConversationDto) {
        const { admins, participants, description, name, tags, type } = createConversationDto;
        const newConversation = await this.repository.create({
            name,
            participants: {
                connect: participants.map((uid) => ({ uid })),
            },
            type,
            description: description || '',
            admins: {
                connect: admins.map((uid) => ({ uid })),
            },
            tags,
        });
        return {
            status: 'success',
            data: newConversation,
        };
    }
    async findMeAll(uid) {
        const cnvs = await this.repository.findMeAll(uid);
        return {
            status: 'success',
            results: cnvs.length,
            data: cnvs,
        };
    }
    async findAll() {
        const cnvs = await this.repository.findAll();
        return {
            status: 'success',
            results: cnvs.length,
            data: cnvs,
        };
    }
    async findOne(id) {
        const cnv = await this.repository.findOne(id);
        return {
            status: 'success',
            data: cnv,
        };
    }
    async update(id, updateConversationDto) {
        const { name, description } = updateConversationDto;
        const cnv = await this.repository.update(id, {
            name,
            description,
        });
        return {
            status: 'success',
            data: cnv,
        };
    }
    async remove(id) {
        await this.repository.delete(id);
    }
    async addParticipant(dto) {
        const data = this.repository.addParticipant(dto.user, dto.uid);
        return {
            status: 'success',
            data,
        };
    }
    async deleteParticipant(dto) {
        const data = this.repository.deleteParticipant(dto.user, dto.uid);
        return {
            status: 'success',
            data,
        };
    }
    async addAdmin(dto) {
        const data = this.repository.addAdmin(dto.user, dto.uid);
        return {
            status: 'success',
            data,
        };
    }
    async deleteAdmin(dto) {
        const data = this.repository.deleteAdmin(dto.user, dto.uid);
        return {
            status: 'success',
            data,
        };
    }
    async addProfileImage(file, cnvId, userId) {
        const data = await this.media.uploadFile(file, userId);
        await this.repository.update(cnvId, { profileImage: data.url });
        return {
            status: 'success',
            data,
        };
    }
    async deleteProfileImage(cnvId) {
        await this.repository.update(cnvId, { profileImage: null });
        return {
            status: 'success',
        };
    }
};
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversations_repository_1.ConversationsRepository,
        media_service_1.MediaService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map