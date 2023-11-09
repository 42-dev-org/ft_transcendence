"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../global/prisma/prisma.module");
const home_module_1 = require("../home/home.module");
const rbac_module_1 = require("../../global/rbac/rbac.module");
const mail_module_1 = require("../../global/mail/mail.module");
const config_1 = require("@nestjs/config");
const config_validation_1 = require("../../config/config.validation");
const app_config_1 = require("../../config/app.config");
const media_module_1 = require("../../global/media/media.module");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../../global/auth/auth.module");
const messages_module_1 = require("../messages/messages.module");
const conversations_module_1 = require("../conversations/conversations.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                cache: true,
                isGlobal: true,
                expandVariables: true,
                envFilePath: './../../../.env',
                validationSchema: config_validation_1.validationSchema,
                validationOptions: config_validation_1.validationOptions,
                load: [(0, app_config_1.default)(process.env.NODE_ENV)],
            }),
            prisma_module_1.PrismaModule,
            home_module_1.HomeModule,
            rbac_module_1.RbacModule,
            mail_module_1.MailModule,
            media_module_1.MediaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            messages_module_1.MessagesModule,
            conversations_module_1.ConversationsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map