import Keycloak from 'keycloak-connect';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
} from '../config';
import { memoryStore } from '../app';

const keycloakConfig = {
  realm: KEYCLOAK_REALM!,
  'bearer-only': true,
  'auth-server-url': KEYCLOAK_URL!,
  'ssl-required': 'external',
  resource: CLIENT_ID!,
  'public-client': false,
  credentials: {
    secret: CLIENT_SECRET!,
  },
  'confidential-port': 0,
};

export const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
