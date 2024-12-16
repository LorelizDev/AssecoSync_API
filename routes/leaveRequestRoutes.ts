import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestById,
  getAllLeaveRequests,
  updateLeaveRequest,
} from '../controllers/leaveRequestController';
import { userAuthorized } from '../middlewares/authMiddleware';

const leaveRequestRoutes = Router();

leaveRequestRoutes.post(
  '/',
  keycloak.protect(),
  userAuthorized,
  createLeaveRequest
);
leaveRequestRoutes.get(
  '/',
  keycloak.protect(),
  userAuthorized,
  getAllLeaveRequests
);
leaveRequestRoutes.get(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  getLeaveRequestById
);
leaveRequestRoutes.put(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  updateLeaveRequest
);
leaveRequestRoutes.patch(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  updateLeaveRequest
);
leaveRequestRoutes.delete(
  '/:id',
  keycloak.protect(),
  userAuthorized,
  deleteLeaveRequest
);

export default leaveRequestRoutes;
