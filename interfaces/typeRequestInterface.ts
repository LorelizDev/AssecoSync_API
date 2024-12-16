import { Optional } from 'sequelize';

export interface TypeRequestInterface {
  id?: number;
  type: string;
  detail?: string;
}

export interface TypeRequestCreationAttributes
  extends Optional<TypeRequestInterface, 'id'> {}
