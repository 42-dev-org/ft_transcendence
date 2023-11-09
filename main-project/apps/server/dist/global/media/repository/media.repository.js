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
exports.MediaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MediaRepository = exports.MediaRepository = class MediaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.media.create({ data });
    }
    async update(uid, data) {
        return this.prisma.media.update({ where: { uid }, data });
    }
    async delete(uid) {
        return this.prisma.media.delete({ where: { uid } });
    }
    async findOne(uid) {
        return this.prisma.media.findUnique({ where: { uid } });
    }
    async findAll(uid) {
        return this.prisma.media.findMany({ where: {} });
    }
    async deleteFileByKey(key) {
        return this.prisma.media.delete({ where: { url: key } });
    }
};
exports.MediaRepository = MediaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaRepository);
//# sourceMappingURL=media.repository.js.map