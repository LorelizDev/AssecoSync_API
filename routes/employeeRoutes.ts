import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import { getAllEmployees } from '../controllers/employeeController';
import { getEmployeeById } from '../controllers/employeeController';
import { deleteEmployee } from '../controllers/employeeController';
import { userAuthorized } from '../middlewares/authMiddleware';

const employeeRoutes = Router();

employeeRoutes.get('/', keycloak.protect('admin'), getAllEmployees);
employeeRoutes.get('/:id', keycloak.protect(), userAuthorized, getEmployeeById);
employeeRoutes.delete('/:id', keycloak.protect('admin'), deleteEmployee);

export default employeeRoutes;
