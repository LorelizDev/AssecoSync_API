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
  public totalDays!: number;
  public usedDays!: number;
  public carriedOverDays!: number;

  get remainingDays(): number {
    return this.totalDays + this.carriedOverDays - this.usedDays;
  }
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
    totalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    usedDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    carriedOverDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
