"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationOptions = exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    DATABASE_URL: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SCHEMA: Joi.string().required(),
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().valid('development', 'production'),
    LOG_MODE: Joi.string().valid('dev', 'combined', 'long', 'short'),
    JWT_SECRET_TOKEN: Joi.string().required().min(10).max(2048),
    JWT_TOKEN_EXPIRES_DATE: Joi.string().required(),
    MAILER_HOST: Joi.string().required(),
    MAILER_PORT: Joi.number().required(),
    MAILER_USERNAME: Joi.string().required(),
    MAILER_PASSWORD: Joi.string().required(),
    MAILER_DEFAULT_SUBJECT: Joi.string().required(),
    MAILER_DEFAULT_HEADER: Joi.string().required(),
    FORGET_PASSWORD_EXPIRES_DATE: Joi.number().required(),
});
exports.validationOptions = {
    abortEarly: true,
};
//# sourceMappingURL=config.validation.js.map