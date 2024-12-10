import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak';
import { getTimeLogStatistics } from '../controllers/statisticsController';

const statisticsRoutes = Router();

statisticsRoutes.get(
  '/timelogs',
  keycloak.protect('admin'),
  getTimeLogStatistics
);

export default statisticsRoutes;
