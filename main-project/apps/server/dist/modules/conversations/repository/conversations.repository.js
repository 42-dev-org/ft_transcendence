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
exports.ConversationsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../global/prisma/prisma.service");
let ConversationsRepository = exports.ConversationsRepository = class ConversationsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(conversation) {
        return this.prisma.conversation.create({
            data: conversation,
        });
    }
    async findAll() {
        return this.prisma.conversation.findMany({});
    }
    async findMeAll(uid) {
        return this.prisma.conversation.findMany({
            where: { participants: { some: { uid } } },
        });
    }
    async findOne(uid) {
        return this.prisma.conversation.findUnique({
            where: { uid },
        });
    }
    async update(uid, updates) {
        return this.prisma.conversation.update({
            where: { uid },
            data: updates,
        });
    }
    async delete(uid) {
        return this.prisma.conversation.delete({ where: { uid } });
    }
    async deleteAll() {
        return this.prisma.conversation.deleteMany();
    }
    async deleteParticipant(uid, cnvUid) {
        return this.prisma.conversation.update({
            where: { uid: cnvUid },
            data: { participants: { disconnect: { uid } } },
        });
    }
    async deleteAdmin(uid, cnvUid) {
        return this.prisma.conversation.update({
            where: { uid: cnvUid },
            data: { admins: { disconnect: { uid } } },
        });
    }
    async addParticipant(uid, cnvUid) {
        return this.prisma.conversation.update({
            where: { uid: cnvUid },
            data: { participants: { connect: { uid } } },
        });
    }
    async addAdmin(uid, cnvUid) {
        return this.prisma.conversation.update({
            where: { uid: cnvUid },
            data: { admins: { connect: { uid } } },
        });
    }
};
exports.ConversationsRepository = ConversationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationsRepository);
//# sourceMappingURL=conversations.repository.js.map