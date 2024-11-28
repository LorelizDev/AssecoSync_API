import { Router } from 'express';
import { getAllEmployees } from '../controllers/employeeController';
import { keycloak } from '../middlewares/keycloak';

const employeeRoutes = Router();

employeeRoutes.get('/', keycloak.protect('admin'), getAllEmployees);

export default employeeRoutes;
