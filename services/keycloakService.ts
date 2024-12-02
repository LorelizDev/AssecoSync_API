// services/authService.ts
import axios from 'axios';
import { Request } from 'express';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
  KEYCLOAK_ADMIN_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_URL,
} from '../config/keycloakConfig';

export const keycloakLogin = async (email: string, password: string) => {
  const response = await axios.post(
    TOKEN_URL!,
    {
      client_id: CLIENT_ID,
      grant_type: 'password',
      username: email,
      password,
      client_secret: CLIENT_SECRET,
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data.access_token;
};

export const extractTokenInfo = (req: Request) => {
  const token = (req as any).kauth?.grant?.access_token.token;
  const tokenContent = (req as any).kauth?.grant?.access_token.content;
  return { token, tokenContent };
};

export const keycloakRegister = async (
  email: string,
  password: string,
  adminToken: string
) => {
  const response = await axios.post(
    `${KEYCLOAK_ADMIN_URL}/users`,
    {
      username: email,
      enabled: true,
      email: email,
      emailVerified: true,
      credentials: [{ type: 'password', value: password, temporary: false }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  if (response.status !== 201) {
    throw new Error('Error creating user in Keycloak');
  }

  const keycloakId = response.headers['location'].split('/').pop();
  return keycloakId;
};

export const deleteKeycloakUser = async (
  keycloakId: string,
  adminToken: string
) => {
  const response = await axios.delete(
    `${KEYCLOAK_ADMIN_URL}/users/${keycloakId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  if (response.status !== 204) {
    throw new Error('Error deleting user from Keycloak');
  }
};

export const changePassword = async () => {
  const urlChangePassword = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth?response_type=code&client_id=${CLIENT_ID}&kc_action=UPDATE_PASSWORD`;
  return urlChangePassword;
};
