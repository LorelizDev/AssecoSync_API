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
  startPause?: Date | string;
  endPause?: Date | string;
  endTime?: Date | string;
  location: locationEnum;
  statusId: number;
}

export interface timeLogCreationAttributes
  extends Optional<timeLogInterface, 'id'> {}
