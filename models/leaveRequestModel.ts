import { DataTypes, ForeignKey, Model } from 'sequelize';
import db from '../database/db';
import {
  LeaveRequestInterface,
  LeaveRequestCreationAttributes,
} from '../interfaces/leaveRequestInterface';
import Employee from './employeeModel';
import TypeRequest from './typeRequestModel';
import StatusRequest from './statusRequestModel';

class LeaveRequest
  extends Model<LeaveRequestInterface, LeaveRequestCreationAttributes>
  implements LeaveRequestInterface
{
  public id!: number;
  public employeeId!: ForeignKey<string>;
  public startDate!: Date;
  public endDate!: Date;
  public typeId!: ForeignKey<number>;
  public Type?: TypeRequest;
  public statusId!: ForeignKey<number>;
  public Status?: StatusRequest;
}

LeaveRequest.init(
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'leaveRequests',
  }
);

Employee.beforeCreate(employee => {
  console.log('Creating employee:', employee.toJSON());
});

LeaveRequest.belongsTo(Employee, { foreignKey: 'employeeId', as: 'Employee' });
LeaveRequest.belongsTo(TypeRequest, { foreignKey: 'typeId', as: 'Type' });
LeaveRequest.belongsTo(StatusRequest, { foreignKey: 'statusId', as: 'Status' });

export default LeaveRequest;
