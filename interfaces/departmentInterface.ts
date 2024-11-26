import { Optional } from 'sequelize';

export interface DepartmentInterface {
  id?: number;
  name: string;
}

export interface DepartmentCreationAttributes
  extends Optional<DepartmentInterface, 'id'> {}
