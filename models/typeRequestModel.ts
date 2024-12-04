import { DataTypes, Model } from 'sequelize';
import db from '../database/db';
import {
  TypeRequestInterface,
  TypeRequestCreationAttributes,
} from '../interfaces/typeRequestInterface';

class TypeRequest
  extends Model<TypeRequestInterface, TypeRequestCreationAttributes>
  implements TypeRequestInterface
{
  public id!: number;
  public type!: string;
  public detail!: string;
}

TypeRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'type_requests',
  }
);

export default TypeRequest;
