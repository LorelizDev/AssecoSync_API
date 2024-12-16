import { Optional } from 'sequelize';

export interface LeaveRequestInterface {
  id?: number;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  typeId: number;
  statusId: number;
  vacationBalanceId?: number;
}

export interface LeaveRequestCreationAttributes
  extends Optional<LeaveRequestInterface, 'id'> {
  vacationBalanceId?: number;
}
