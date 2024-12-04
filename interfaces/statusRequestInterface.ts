import { Optional } from 'sequelize';

export interface StatusRequestInterface {
  id?: number;
  status: string;
}

export interface StatusRequestCreationAttributes
  extends Optional<StatusRequestInterface, 'id'> {}
