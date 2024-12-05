import { DataTypes, ForeignKey, Model } from 'sequelize';
import db from '../database/db';
import {
  VacationBalanceInterface,
  VacationBalanceCreationAttributes,
} from '../interfaces/vacationBalanceInterface';
import Employee from './employeeModel';

class VacationBalance
  extends Model<VacationBalanceInterface, VacationBalanceCreationAttributes>
  implements VacationBalanceInterface
{
  public id!: number;
  public employeeId!: ForeignKey<string>;
  public year!: number;
  public balance!: number;
}

VacationBalance.init(
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
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'vacation_balances',
  }
);

VacationBalance.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'Employee',
});

export default VacationBalance;
