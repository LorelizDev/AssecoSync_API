import { config } from 'dotenv';

config();

const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
const TOKEN_URL: string | undefined = process.env.TOKEN_URL;
const KEYCLOAK_URL: string | undefined = process.env.KEYCLOAK_URL;
const KEYCLOAK_REALM: string | undefined = process.env.KEYCLOAK_REALM;
const KEYCLOAK_ADMIN_URL: string | undefined = process.env.KEYCLOAK_ADMIN_URL;

export {
  CLIENT_SECRET,
  CLIENT_ID,
  TOKEN_URL,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_ADMIN_URL,
};
