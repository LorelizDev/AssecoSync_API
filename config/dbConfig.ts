import { config } from 'dotenv';

config();

const DB_DEV_NAME: string | undefined = process.env.DB_DEV_NAME;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_HOST: string | undefined = process.env.DB_HOST;
const DB_TEST_NAME: string | undefined = process.env.DB_TEST_NAME;

export { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_TEST_NAME };
