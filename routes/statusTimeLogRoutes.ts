import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createStatusTimeLog,
  deleteStatusTimeLog,
  getAllStatusTimeLogs,
  getStatusTimeLogById,
  updateStatusTimeLog,
} from '../controllers/statusTimeLogController';

const statusTimeLogRoutes = Router();

statusTimeLogRoutes.get('/', keycloak.protect(), getAllStatusTimeLogs);
statusTimeLogRoutes.post('/', keycloak.protect('admin'), createStatusTimeLog);
statusTimeLogRoutes.get('/:id', keycloak.protect(), getStatusTimeLogById);
statusTimeLogRoutes.put('/:id', keycloak.protect('admin'), updateStatusTimeLog);
statusTimeLogRoutes.delete(
  '/:id',
  keycloak.protect('admin'),
  deleteStatusTimeLog
);

export default statusTimeLogRoutes;
