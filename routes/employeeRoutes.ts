import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';
import { userAuthorized } from '../middlewares/authMiddleware';

const employeeRoutes = Router();

employeeRoutes.get('/', keycloak.protect('admin'), getAllEmployees);
employeeRoutes.get('/:id', keycloak.protect(), userAuthorized, getEmployeeById);
employeeRoutes.put('/:id', keycloak.protect(), userAuthorized, updateEmployee);
employeeRoutes.delete('/:id', keycloak.protect('admin'), deleteEmployee);

export default employeeRoutes;
