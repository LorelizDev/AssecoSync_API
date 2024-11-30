import { config } from 'dotenv';
import * as dbConfig from './dbConfig';
import * as keycloakConfig from './keycloakConfig';

config();

const NODE_ENV: string | undefined = process.env.NODE_ENV;
const PORT: string | undefined = process.env.PORT;
const SESSION_SECRET: string | undefined = process.env.SESSION_SECRET;

if (
  !dbConfig.DB_DEV_NAME ||
  !dbConfig.DB_USER ||
  !dbConfig.DB_PASSWORD ||
  !dbConfig.DB_HOST
) {
  throw new Error(
    '⚠️  Missing environment variables to database connection ⚠️'
  );
}

if (
  !keycloakConfig.CLIENT_SECRET ||
  !keycloakConfig.CLIENT_ID ||
  !keycloakConfig.TOKEN_URL ||
  !keycloakConfig.KEYCLOAK_URL ||
  !keycloakConfig.KEYCLOAK_REALM ||
  !keycloakConfig.KEYCLOAK_ADMIN_URL
) {
  throw new Error(
    '⚠️  Missing environment variables to keycloak connection ⚠️'
  );
}

if (!SESSION_SECRET) {
  throw new Error('⚠️  Missing environment variable SESSION_SECRET ⚠️');
}

export { NODE_ENV, PORT, SESSION_SECRET };
