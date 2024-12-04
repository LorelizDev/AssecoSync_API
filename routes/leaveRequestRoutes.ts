import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestById,
  getLeaveRequests,
  updateLeaveRequest,
} from '../controllers/leaveRequestController';
import { userAuthorized } from '../middlewares/authMiddleware';

const leaveRequestRoutes = Router();

// Rutas para LeaveRequests
leaveRequestRoutes.get('/', keycloak.protect('admin'), getLeaveRequests);
leaveRequestRoutes.get(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  getLeaveRequestById
);
leaveRequestRoutes.post('/', keycloak.protect(), createLeaveRequest);
leaveRequestRoutes.put(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  updateLeaveRequest
);
leaveRequestRoutes.delete(
  '/:id',
  keycloak.protect('admin'),
  deleteLeaveRequest
);

export default leaveRequestRoutes;
