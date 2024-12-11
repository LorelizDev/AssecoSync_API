import { config } from 'dotenv';

config();

const DB_EXTERNAL_NAME: string | undefined = process.env.DB_EXTERNAL_NAME;
const DB_EXTERNAL_USER: string | undefined = process.env.DB_EXTERNAL_USER;
const DB_EXTERNAL_PASSWORD: string | undefined =
  process.env.DB_EXTERNAL_PASSWORD;
const DB_EXTERNAL_HOST: string | undefined = process.env.DB_EXTERNAL_HOST;

export {
  DB_EXTERNAL_NAME,
  DB_EXTERNAL_USER,
  DB_EXTERNAL_PASSWORD,
  DB_EXTERNAL_HOST,
};
