import { Optional } from 'sequelize';

export interface LeaveRequestInterface {
  id?: number;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  typeId: number;
  statusId: number;
}

export interface LeaveRequestCreationAttributes
  extends Optional<LeaveRequestInterface, 'id'> {}
