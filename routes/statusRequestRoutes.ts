import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createStatusRequest,
  deleteStatusRequest,
  getStatusRequestById,
  getStatusRequests,
  updateStatusRequest,
} from '../controllers/statusRequestController';

const statusRequestRoutes = Router();

// Rutas para StatusRequests
statusRequestRoutes.get('/', keycloak.protect(), getStatusRequests);
statusRequestRoutes.get('/:id', keycloak.protect(), getStatusRequestById);
statusRequestRoutes.post('/', keycloak.protect('admin'), createStatusRequest);
statusRequestRoutes.put('/:id', keycloak.protect('admin'), updateStatusRequest);
statusRequestRoutes.delete(
  '/:id',
  keycloak.protect('admin'),
  deleteStatusRequest
);

export default statusRequestRoutes;
