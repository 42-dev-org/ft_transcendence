"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonConfs = {
    corsOption: {
        origin: ['*'],
    },
    app: {
        port: process.env.PORT || 3001,
        logger_format: process.env.LOG_MODE || 'combined',
    },
    cookieOptions: {
        maxAge: 1000 * 60 * 72,
    },
    MediaConfig: {
        FILES: (() => {
            const files = new Map();
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
    cookieOptions: {
        maxAge: 1000 * 60 * +process.env.COOKIE_EXPIRES_DATE,
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
        path: '/',
    },
    corsOption: {
        origin: ['http://localhost:3000'],
    },
};
const configs = [devConfig, testConfig, proConfig];
const appConfig = (mode = 'development') => {
    const conf = configs.find((conf) => conf.info.name === mode);
    return () => conf;
};
exports.default = appConfig;
//# sourceMappingURL=app.config.js.map