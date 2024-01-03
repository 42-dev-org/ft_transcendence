import { Module } from "@nestjs/common";
import { PrismaModule } from "src/global/prisma/prisma.module";
import { HomeModule } from "../home/home.module";
import { RbacModule } from "src/global/rbac/rbac.module";
import { MailModule } from "src/global/mail/mail.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  validationSchema,
  validationOptions,
} from "../../config/config.validation";
import appConfig from "../../config/app.config";
import { MediaModule } from "src/global/media/media.module";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../../global/auth/auth.module";
import { MessagesModule } from "../messages/messages.module";
import { ConversationsModule } from "../conversations/conversations.module";
import * as path from "path";
import { GamesModule } from "../game/games.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    EventEmitterModule.forRoot({ global: true }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: path.join(__dirname, "..", "..", "..", ".env"),
      validationSchema,
      validationOptions,
      load: [appConfig(process.env.NODE_ENV)],
    }),
    PrismaModule,
    HomeModule,
    RbacModule,
    MailModule,
    MediaModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}