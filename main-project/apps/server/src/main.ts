import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { PrismaService } from "./global/prisma/prisma.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bp from "body-parser";
import helmet from "helmet";
// import * as xss from 'xss-clean';
// import * as hpp from 'hpp';
import * as logger from "morgan";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as cp from "cookie-parser";
import { PrismaExceptionFilter } from "./shared/filters/prisma.exception.filter";

const bootstrapCallback = (env: string, port: number) => () => {
  console.log(`* Environment : ${env}`);
  console.log(`* Running on http://localhost:${port} (CTRL + C to quit)`);
};

const onAppShutDown =
  (app: INestApplication, prisma: PrismaService) => async () => {
    try {
      app.close(); // Close the Node.js server
      console.log("\nCTRL^C 💥 Server shutting down...");

      await prisma.$disconnect(); // Disconnect from Prisma
      console.log("\n\nPrisma disconnected 💥.");

      process.exit(0); // Exit the process with a success code
    } catch (error) {
      console.error(`Error during shutdown: ${error}`);
      process.exit(1); // Exit the process with a failure code
    }
  };

async function bootstrap() {
  // create the application with nest factory
  const app = await NestFactory.create(AppModule, {
    cors: { origin: "http://localhost:3001", credentials: true },
  });

  // create configSevice instance
  const confService = app.get(ConfigService);

  // craete prisma service Instance
  const prisma = app.get(PrismaService);

  // start env vars
  const port = confService.get<number>("app.port");
  const corsOption = confService.get<CorsOptions>("corsOption");

  const modeName = confService.get<string>("info.name");
  const logger_format = confService.get<string>("app.logger_format");

  //limit request payload size
  app.use(bp.json({ limit: "1mb" }));
  app.use(bp.urlencoded({ limit: "1mb", extended: true }));

  // add cookie parser middleware
  app.use(cp());

  // protect from data pollution
  // app.use(hpp());

  // csrf attack
  // app.use(csurf());

  // xss attack
  app.use(helmet());
  // app.use(xss());

  // enable CORS
  // app.enableCors(corsOption);

  // add logger
  app.use(logger(logger_format));

  // add global prefix
  app.setGlobalPrefix("/api/v1");

  // add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // add global filters
  app.useGlobalFilters(new PrismaExceptionFilter());

  // handle init signal
  process.on("SIGINT", onAppShutDown(app, prisma));

  // start the application
  await app.listen(port, bootstrapCallback(modeName, port));
}
bootstrap();
