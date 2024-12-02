import { DataTypes, Model } from 'sequelize';
import db from '../database/db';
import {
  statusTimeLogInterface,
  statusTimeLogCreationAttributes,
} from '../interfaces/statusTimeLog';

class statusTimeLog
  extends Model<statusTimeLogInterface, statusTimeLogCreationAttributes>
  implements statusTimeLogInterface
{
  public id!: number;
  public status!: string;
}

statusTimeLog.init(
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
    tableName: 'statusTimeLog',
  }
);

export default statusTimeLog;
