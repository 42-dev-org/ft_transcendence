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
exports.FileValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let FileValidatorPipe = exports.FileValidatorPipe = class FileValidatorPipe {
    constructor(conf) {
        this.conf = conf;
    }
    transform(value) {
        if (!value || !value.buffer)
            return value;
        const files = this.conf.get('MediaConfig').FILES;
        const mimetypes = [...files.keys()];
        if (!mimetypes.includes(value.mimetype)) {
            throw new common_1.BadRequestException(`file type is not supported`);
        }
        if (files.get(value.mimetype) < value.size) {
            throw new common_1.BadRequestException(`file size is greater than ${'dummy'}`);
        }
        const parts = value.mimetype.split('/');
        return { ...value, ext: parts[1], filetype: parts[0] };
    }
};
exports.FileValidatorPipe = FileValidatorPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileValidatorPipe);
//# sourceMappingURL=media.pipe.js.map