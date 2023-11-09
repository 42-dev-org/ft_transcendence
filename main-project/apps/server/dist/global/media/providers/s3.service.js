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
exports.MediaS3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let MediaS3Service = exports.MediaS3Service = class MediaS3Service {
    constructor(conf) {
        this.conf = conf;
        this.s3 = new client_s3_1.S3Client({
            region: this.conf.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.conf.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.conf.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }
    async uploadFile(Body, Key) {
        const args = {
            Bucket: this.conf.get('AWS_BUCKET_NAME'),
            Key,
            Body,
        };
        return await this.s3.send(new client_s3_1.PutObjectCommand(args));
    }
    async deleteFile(Key) {
        return await this.s3.send(new client_s3_1.DeleteObjectCommand({ Key, Bucket: 'robin.dev' }));
    }
};
exports.MediaS3Service = MediaS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaS3Service);
//# sourceMappingURL=s3.service.js.map