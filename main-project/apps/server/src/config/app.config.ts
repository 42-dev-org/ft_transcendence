import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CookieOptions } from 'express';

const CommonConfs = {
  corsOption: {
    origin: ['*'] as Array<string>,
  },
  app: {
    port: process.env.PORT || 8080,
    logger_format: process.env.LOG_MODE || 'dev',
  },
  cookieOptions: <CookieOptions>{
    maxAge: 1000 * 60 * 72,
  },
  MediaConfig: {
    FILES: (() => {
      const files = new Map<string, number>();
      const mb = 1024 * 1024;

      files.set('image/png', mb * 12);
      files.set('image/jpeg', mb * 12);
      files.set('image/gif', mb * 12);
      files.set('image/webp', mb * 12);
      files.set('audio/mpeg', mb * 36);
      files.set('audio/mp4', mb * 36);
      return files;
    })(),
  },
};

const devConfig = { ...CommonConfs, info: { name: 'development' } };

const testConfig = { ...CommonConfs, info: { name: 'testing' } };

const proConfig = {
  ...CommonConfs,
  info: { name: 'production' },
  cookieOptions: <CookieOptions>{
    maxAge: 1000 * 60 * +process.env.COOKIE_EXPIRES_DATE,
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
    path: '/',
  },
  corsOption: <CorsOptions>{
    origin: ['http://localhost:3001/'] as Array<string>,
  },
};

const configs = [devConfig, testConfig, proConfig];

const appConfig = (mode = 'development') => {
  const conf = configs.find((conf) => conf.info.name === mode);

  return () => conf;
};

export default appConfig;
