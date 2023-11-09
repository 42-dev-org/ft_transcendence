import * as Joi from 'joi';

/***
 * @description set the required env vars for server to dire properly
 * */
export const validationSchema = Joi.object({
  // DB VARS
  DATABASE_URL: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SCHEMA: Joi.string().required(),
  // SERVER VARS
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('development', 'production'),
  // LOGGER MODE
  LOG_MODE: Joi.string().valid('dev', 'combined', 'long', 'short'),
  // JWT VARS
  JWT_SECRET_TOKEN: Joi.string().required().min(10).max(2048),
  JWT_TOKEN_EXPIRES_DATE: Joi.string().required(),
  // MAILER VARS
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().required(),
  MAILER_USERNAME: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
  MAILER_DEFAULT_SUBJECT: Joi.string().required(),
  MAILER_DEFAULT_HEADER: Joi.string().required(),
  // FORGET PASS VARS
  FORGET_PASSWORD_EXPIRES_DATE: Joi.number().required(),
});

/**
 * @description set env vars validation options
 *
 * @param abortEarly abort server if some vars not availble in .env file
 */
export const validationOptions = {
  abortEarly: true,
};
