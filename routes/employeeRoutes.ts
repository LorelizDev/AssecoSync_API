import { Router } from 'express';
import { getAllEmployees } from '../controllers/employeeController';
import { keycloak } from '../middlewares/keycloak';
import { getEmployeeById } from '../controllers/employeeController';

const employeeRoutes = Router();

employeeRoutes.get('/', keycloak.protect('admin'), getAllEmployees);
employeeRoutes.get('/:id', keycloak.protect(), getEmployeeById);

export default employeeRoutes;
