import { Optional } from 'sequelize';

export interface VacationBalanceInterface {
  id?: number;
  employeeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  carriedOverDays: number; // Días acumulados del año anterior
}

export interface VacationBalanceCreationAttributes
  extends Optional<VacationBalanceInterface, 'id' | 'carriedOverDays'> {}
