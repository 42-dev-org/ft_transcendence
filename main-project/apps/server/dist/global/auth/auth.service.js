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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../../modules/users/repository/users.repository");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let AuthService = exports.AuthService = class AuthService {
    constructor(repository, jwt, mailer, config) {
        this.repository = repository;
        this.jwt = jwt;
        this.mailer = mailer;
        this.config = config;
    }
    async create(dto, ip) {
        const { country, email, firstName, lastName, password } = dto;
        const user = await this.repository.create({
            country,
            email,
            firstName,
            lastName,
            password: await bcrypt.hash(password, 12),
            roles: [],
            status: 'Accepted',
            ip,
        });
        return {
            status: 'success',
            data: user,
            token: await this.generateToken(user),
        };
    }
    async login(email, password) {
        const user = await this.repository.findByEmail(email);
        if (!user || !(await this.compare(password, user.password)))
            throw new common_1.UnauthorizedException();
        return {
            status: 'succes',
            data: user,
            token: await this.generateToken(user),
        };
    }
    async forgotPassword(email, host, protocol) {
        const user = await this.repository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('no user found with email.');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        await this.repository.updateOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpireDate: new Date(Date.now() +
                this.config.get('FORGET_PASSWORD_EXPIRES_DATE') *
                    (60 * 1000)),
        }, user.uid);
        const URL = `${protocol}://${'localhost:3000'}/resetPassword/${resetToken}`;
        return this.mailer.sendEmail({
            from: this.config.get('MAILER_FROM_HEADER'),
            to: email,
            subject: this.config.get('MAILER_SUBJECT_HEADER'),
            text: URL,
        });
    }
    async resetPassword(resetToken, password) {
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const user = await this.repository.findByPasswordResetToken(hashedToken);
        if (!user) {
            throw new common_1.BadRequestException('Token is invalid or expired.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.repository.updateOne({
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpireDate: null,
            passwordChangedAt: new Date(Date.now() - 1000),
        }, user.uid);
        const token = this.generateToken(user);
        return token;
    }
    async updatePassword({ oldPassword, newPassword }, uid) {
        const user = await this.repository.findOne(uid);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            throw new common_1.BadRequestException('password mismatched');
        }
        const password = await bcrypt.hash(newPassword, 12);
        await this.repository.updateOne({
            password,
            passwordChangedAt: new Date(Date.now() - 1000),
        }, uid);
        const token = this.generateToken(user);
        return token;
    }
    async hash(text, salt) {
        return bcrypt.hash(text, salt);
    }
    async compare(candidate, value) {
        return bcrypt.compare(candidate, value);
    }
    async generateToken(user) {
        return this.jwt.sign({ email: user.email, uid: user.uid });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map