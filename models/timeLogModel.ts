import { DataTypes, ForeignKey, Model } from 'sequelize';
import db from '../database/db';
import {
  timeLogInterface,
  timeLogCreationAttributes,
  locationEnum,
} from '../interfaces/timeLogInterface';
import Employee from './employeeModel';
import statusTimeLog from './statusTimeLogModel';

class timeLog
  extends Model<timeLogInterface, timeLogCreationAttributes>
  implements timeLogInterface
{
  public id!: number;
  public employeeId!: ForeignKey<string>;
  public date!: Date | string;
  public startTime!: Date | string;
  public startPause?: Date | string;
  public endPause?: Date | string;
  public endTime?: Date | string;
  public location!: locationEnum;
  public statusId!: ForeignKey<number>;
  public Employee?: Employee;
  public statusTimeLog?: statusTimeLog;
  employee: any;
}

timeLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    startPause: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    endPause: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    location: {
      type: DataTypes.ENUM(...Object.values(locationEnum)),
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'timeLog',
  }
);

timeLog.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
});
timeLog.belongsTo(statusTimeLog, {
  foreignKey: 'statusId',
  as: 'statusTimeLog',
});

export default timeLog;
