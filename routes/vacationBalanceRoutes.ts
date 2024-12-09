import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  createVacationBalance,
  deleteVacationBalance,
  getVacationBalanceById,
  getAllVacationBalances,
  getVacationBalanceByYear,
  updateVacationBalance,
  useVacationDaysController,
} from '../controllers/vacationBalanceController';

const vacationBalanceRoutes = Router();

// Wrap async route handlers to catch errors
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all vacation balances (requires authentication)
vacationBalanceRoutes.get(
  '/',
  keycloak.protect(),
  asyncHandler(async (req, res) => {
    await getAllVacationBalances(req, res);
  })
);

// Create a new vacation balance (requires admin role)
vacationBalanceRoutes.post(
  '/',
  keycloak.protect('admin'),
  asyncHandler(async (req, res) => {
    await createVacationBalance(req, res);
  })
);

// Get vacation balance by ID (requires authentication)
vacationBalanceRoutes.get(
  '/:id',
  keycloak.protect(),
  asyncHandler(async (req, res) => {
    await getVacationBalanceById(req, res);
  })
);

// Get vacation balance by year for a specific employee (requires authentication)
vacationBalanceRoutes.get(
  '/employee/:employeeId/year/:year',
  keycloak.protect(),
  asyncHandler(async (req, res) => {
    await getVacationBalanceByYear(req, res);
  })
);

// Update a vacation balance (requires admin role)
vacationBalanceRoutes.put(
  '/:id',
  keycloak.protect('admin'),
  asyncHandler(async (req, res) => {
    await updateVacationBalance(req, res);
  })
);

// Use vacation days (could be restricted to the employee or manager)
vacationBalanceRoutes.patch(
  '/:id/use',
  keycloak.protect(),
  asyncHandler(async (req, res) => {
    await useVacationDaysController(req, res);
  })
);

// Delete a vacation balance (requires admin role)
vacationBalanceRoutes.delete(
  '/:id',
  keycloak.protect('admin'),
  asyncHandler(async (req, res) => {
    await deleteVacationBalance(req, res);
  })
);

export default vacationBalanceRoutes;
