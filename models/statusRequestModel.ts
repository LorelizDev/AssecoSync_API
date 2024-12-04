import { DataTypes, Model } from 'sequelize';
import db from '../database/db';
import {
  StatusRequestInterface,
  StatusRequestCreationAttributes,
} from '../interfaces/statusRequestInterface';

class StatusRequest
  extends Model<StatusRequestInterface, StatusRequestCreationAttributes>
  implements StatusRequestInterface
{
  public id!: number;
  public status!: string;
}

StatusRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'status_requests',
  }
);

export default StatusRequest;
