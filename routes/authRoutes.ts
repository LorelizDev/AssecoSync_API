import { Router } from 'express';
import authController from '../controllers/authController';
import { keycloak } from '../middlewares/keycloak';
const authRoutes = Router();

authRoutes.post('/login', authController.login);
authRoutes.post(
  '/register',
  keycloak.protect('admin'),
  authController.register
);

export default authRoutes;
