import { Router } from 'express';
import {
  createVacationBalance,
  getVacationBalanceByYear,
  useVacationDaysController,
  getAllVacationBalances,
} from '../controllers/vacationBalanceController';
import { keycloak } from '../middlewares/keycloak';

const vacationBalanceRoutes = Router();

vacationBalanceRoutes.post(
  '/',
  keycloak.protect('admin'),
  createVacationBalance
);
vacationBalanceRoutes.get(
  '/:employeeId',
  keycloak.protect(),
  getAllVacationBalances
);
vacationBalanceRoutes.get(
  '/:employeeId/year',
  keycloak.protect(),
  getVacationBalanceByYear
);
vacationBalanceRoutes.put(
  '/:employeeId/:year/use',
  keycloak.protect(),
  useVacationDaysController
);

export default vacationBalanceRoutes;
