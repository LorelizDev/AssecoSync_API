import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createTypeRequest,
  deleteTypeRequest,
  getTypeRequestById,
  getTypeRequests,
  updateTypeRequest,
} from '../controllers/typeRequestController';

const typeRequestRoutes = Router();

// Rutas para TypeRequests
typeRequestRoutes.get('/', keycloak.protect(), getTypeRequests);
typeRequestRoutes.get('/:id', keycloak.protect(), getTypeRequestById);
typeRequestRoutes.post('/', keycloak.protect('admin'), createTypeRequest);
typeRequestRoutes.put('/:id', keycloak.protect('admin'), updateTypeRequest);
typeRequestRoutes.delete('/:id', keycloak.protect('admin'), deleteTypeRequest);

export default typeRequestRoutes;
