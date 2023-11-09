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
exports.MessagesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../global/prisma/prisma.service");
let MessagesRepository = exports.MessagesRepository = class MessagesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(createMessages) {
        return this.prisma.message.createMany({ data: createMessages });
    }
    async create(createMessage) {
        return this.prisma.message.create({ data: createMessage });
    }
    async findAllInConversation(cnvId, userId) {
        return this.prisma.message.findMany({
            where: {
                AND: [
                    { conversationUid: cnvId },
                    { conversation: { participants: { some: { uid: userId } } } },
                ],
            },
        });
    }
    async findOne(id, conversation = false) {
        return this.prisma.message.findUnique({
            where: { uid: id },
            include: { conversation },
        });
    }
    async update(id, updateMessage) {
        return this.prisma.message.update({
            where: { uid: id },
            data: updateMessage,
        });
    }
    async remove(id) {
        return this.prisma.message.delete({ where: { uid: id } });
    }
};
exports.MessagesRepository = MessagesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesRepository);
//# sourceMappingURL=messages.repository.js.map