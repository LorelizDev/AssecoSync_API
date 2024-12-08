import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createTimeLog,
  deleteTimeLog,
  getAllTimeLogs,
  updateTimeLog,
  getTimeLogByEmployeeId,
} from '../controllers/timeLogController';
import { userAuthorized } from '../middlewares/authMiddleware';

const timeLogRoutes = Router();

timeLogRoutes.get('/', keycloak.protect('admin'), getAllTimeLogs);
timeLogRoutes.get(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  getTimeLogByEmployeeId
); // id: employee id
timeLogRoutes.post('/:id', keycloak.protect(), userAuthorized, createTimeLog);
timeLogRoutes.put(
  '/:id/:timeLogId',
  keycloak.protect(),
  userAuthorized,
  updateTimeLog
);
timeLogRoutes.delete('/:timeLogId', keycloak.protect('admin'), deleteTimeLog);

export default timeLogRoutes;
