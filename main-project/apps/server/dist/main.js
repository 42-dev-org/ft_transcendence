"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const prisma_service_1 = require("./global/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bp = require("body-parser");
const helmet_1 = require("helmet");
const logger = require("morgan");
const cp = require("cookie-parser");
const prisma_exception_filter_1 = require("./shared/filters/prisma.exception.filter");
const bootstrapCallback = (env, port) => () => {
    console.log(`* Environment : ${env}`);
    console.log(`* Running on http://localhost:${port} (CTRL + C to quit)`);
};
const onAppShutDown = (app, prisma) => async () => {
    try {
        app.close();
        console.log('\nCTRL^C 💥 Server shutting down...');
        await prisma.$disconnect();
        console.log('\n\nPrisma disconnected 💥.');
        process.exit(0);
    }
    catch (error) {
        console.error(`Error during shutdown: ${error}`);
        process.exit(1);
    }
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const confService = app.get(config_1.ConfigService);
    const prisma = app.get(prisma_service_1.PrismaService);
    const port = confService.get('app.port');
    const corsOption = confService.get('corsOption');
    const modeName = confService.get('info.name');
    const logger_format = confService.get('app.logger_format');
    app.use(bp.json({ limit: '1mb' }));
    app.use(bp.urlencoded({ limit: '1mb', extended: true }));
    app.use(cp());
    app.use((0, helmet_1.default)());
    app.enableCors(corsOption);
    app.use(logger(logger_format));
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    process.on('SIGINT', onAppShutDown(app, prisma));
    await app.listen(port, bootstrapCallback(modeName, port));
}
bootstrap();
//# sourceMappingURL=main.js.map