import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import {
  getVacationBalances,
  getVacationBalance,
  createBalance,
  updateBalance,
  deleteBalance,
} from '../controllers/vacationBalanceController';

const vacationBalanceRoutes = Router();

vacationBalanceRoutes.get('/', keycloak.protect('admin'), getVacationBalances);
vacationBalanceRoutes.get('/:id', keycloak.protect(), getVacationBalance);
vacationBalanceRoutes.post('/', keycloak.protect('admin'), createBalance);
vacationBalanceRoutes.put('/:id', keycloak.protect('admin'), updateBalance);
vacationBalanceRoutes.delete('/:id', keycloak.protect('admin'), deleteBalance);

export default vacationBalanceRoutes;
