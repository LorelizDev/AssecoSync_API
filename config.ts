import { config } from 'dotenv';

config();

const DB_DEV_NAME: string | undefined = process.env.DB_DEV_NAME;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_HOST: string | undefined = process.env.DB_HOST;
const DB_TEST_NAME: string | undefined = process.env.DB_TEST_NAME;
const NODE_ENV: string | undefined = process.env.NODE_ENV;
const PORT: string | undefined = process.env.PORT;
const SESSION_SECRET: string | undefined = process.env.SESSION_SECRET;
const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
const TOKEN_URL: string | undefined = process.env.TOKEN_URL;
const KEYCLOAK_URL: string | undefined = process.env.KEYCLOAK_URL;
const KEYCLOAK_REALM: string | undefined = process.env.KEYCLOAK_REALM;
const KEYCLOAK_ADMIN_URL: string | undefined = process.env.KEYCLOAK_ADMIN_URL;

if (!DB_DEV_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  throw new Error(
    '⚠️  Missing environment variables to database connection ⚠️'
  );
}

if (
  !SESSION_SECRET ||
  !CLIENT_SECRET ||
  !CLIENT_ID ||
  !TOKEN_URL ||
  !KEYCLOAK_URL ||
  !KEYCLOAK_REALM ||
  !KEYCLOAK_ADMIN_URL
) {
  throw new Error(
    '⚠️  Missing environment variables to keycloak connection ⚠️'
  );
}

export {
  DB_DEV_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_TEST_NAME,
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  CLIENT_SECRET,
  CLIENT_ID,
  TOKEN_URL,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_ADMIN_URL,
};
