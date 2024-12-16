import { Router } from 'express';
import { getExternalEmployee } from '../controllers/externalEmployeeController';
import { keycloak } from '../middlewares/keycloak';

const externalEmployeeRoutes = Router();

externalEmployeeRoutes.get(
  '/:employeeId',
  keycloak.protect('admin'),
  getExternalEmployee
);

export default externalEmployeeRoutes;
