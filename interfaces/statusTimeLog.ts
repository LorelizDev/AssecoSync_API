import { Optional } from 'sequelize';

export interface statusTimeLogInterface {
  id: number;
  status: string;
}

export interface statusTimeLogCreationAttributes
  extends Optional<statusTimeLogInterface, 'id'> {}
