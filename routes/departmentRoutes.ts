import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from '../controllers/departmentController';

const departmentRoutes = Router();

departmentRoutes.get('/', keycloak.protect(), getDepartments);
departmentRoutes.post('/', keycloak.protect('admin'), createDepartment);
departmentRoutes.get('/:id', keycloak.protect(), getDepartmentById);
departmentRoutes.put('/:id', keycloak.protect('admin'), updateDepartment);
departmentRoutes.delete('/:id', keycloak.protect('admin'), deleteDepartment);

export default departmentRoutes;
