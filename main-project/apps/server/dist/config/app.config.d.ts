import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CookieOptions } from 'express';
declare const appConfig: (mode?: string) => () => {
    info: {
        name: string;
    };
    corsOption: {
        origin: string[];
    };
    app: {
        port: string | number;
        logger_format: string;
    };
    cookieOptions: CookieOptions;
    MediaConfig: {
        FILES: Map<string, number>;
    };
} | {
    info: {
        name: string;
    };
    cookieOptions: CookieOptions;
    corsOption: CorsOptions;
    app: {
        port: string | number;
        logger_format: string;
    };
    MediaConfig: {
        FILES: Map<string, number>;
    };
};
export default appConfig;
