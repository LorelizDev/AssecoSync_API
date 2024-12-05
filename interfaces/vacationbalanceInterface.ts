import { Optional } from 'sequelize';

export interface VacationBalanceInterface {
  id?: number;
  employeeId: string;
  year: number;
  balance: number;
}

export interface VacationBalanceCreationAttributes
  extends Optional<VacationBalanceInterface, 'id'> {}
