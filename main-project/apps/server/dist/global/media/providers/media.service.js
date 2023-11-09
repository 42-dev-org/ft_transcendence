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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const media_repository_1 = require("../repository/media.repository");
const media_constant_1 = require("../../../shared/constants/media.constant");
const s3_service_1 = require("./s3.service");
let MediaService = exports.MediaService = class MediaService {
    constructor(repository, s3) {
        this.repository = repository;
        this.s3 = s3;
    }
    async deployFile(key, buffer) {
        await this.s3.uploadFile(buffer, key);
    }
    async uploadFile(file, uid, deploy = true) {
        const key = `${file.filetype}-${uid}-${Date.now()}.${file.ext}`;
        if (deploy)
            await this.s3.uploadFile(file.buffer, key);
        const data = await this.repository.create({
            mimtype: file.mimetype,
            name: file.originalname,
            size: file.size,
            uploader: { connect: { uid } },
            url: media_constant_1.AWS_S3_URL_PREFIX + key,
        });
        return data;
    }
    async deleteFile(key) {
        await this.repository.deleteFileByKey(key);
        await this.s3.deleteFile(key.replace(media_constant_1.AWS_S3_URL_PREFIX, ''));
    }
};
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_repository_1.MediaRepository,
        s3_service_1.MediaS3Service])
], MediaService);
//# sourceMappingURL=media.service.js.map