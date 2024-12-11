import express from 'express';
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

const router = express.Router();
const leaveRequestRoutes = Router();

// Rutas para LeaveRequests
leaveRequestRoutes.get('/', keycloak.protect(), getLeaveRequests);
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
leaveRequestRoutes.delete('/:id', keycloak.protect(), deleteLeaveRequest);

export default leaveRequestRoutes;
