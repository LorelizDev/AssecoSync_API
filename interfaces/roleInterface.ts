import { Optional } from 'sequelize';

export interface RoleInterface {
  id?: number;
  name: string;
}

export interface EmployeeCreationAttributes
  extends Optional<RoleInterface, 'id'> {}
