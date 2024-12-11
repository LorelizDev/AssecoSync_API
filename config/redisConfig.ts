import { config } from 'dotenv';

config();

const REDIS_HOST: string | undefined = process.env.REDIS_HOST;
const REDIS_PORT: string | undefined = process.env.REDIS_PORT;
const REDIS_PASSWORD: string | undefined = process.env.REDIS_PASSWORD;

export { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD };
