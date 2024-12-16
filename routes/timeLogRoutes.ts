import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createTimeLog,
  deleteTimeLog,
  getAllTimeLogs,
  updateTimeLog,
  getTimeLogById,
} from '../controllers/timeLogController';
import { userAuthorized } from '../middlewares/authMiddleware';

const timeLogRoutes = Router();

timeLogRoutes.post('/', keycloak.protect(), userAuthorized, createTimeLog);
timeLogRoutes.get('/', keycloak.protect(), userAuthorized, getAllTimeLogs);
timeLogRoutes.get('/:id', keycloak.protect(), userAuthorized, getTimeLogById);
timeLogRoutes.put('/:id', keycloak.protect(), userAuthorized, updateTimeLog);
timeLogRoutes.delete('/:id', keycloak.protect('admin'), deleteTimeLog);

export default timeLogRoutes;
