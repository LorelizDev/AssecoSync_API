import { Optional } from 'sequelize';

export enum locationEnum {
  office = 'office',
  remote = 'remote',
}

export interface timeLogInterface {
  id: number;
  employeeId: string;
  date: Date | string;
  startTime: Date | string;
  startPause?: Date | string | null;
  endPause?: Date | string | null;
  endTime?: Date | string | null;
  location: locationEnum;
  statusId: number;
}

export interface timeLogCreationAttributes
  extends Optional<timeLogInterface, 'id'> {}
