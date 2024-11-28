import { DataTypes, ForeignKey, Model } from 'sequelize';
import db from '../database/db';
import { EmployeeInterface } from '../interfaces/employeeInterface';
import Department from './departmentModel';
import Role from './roleModel';

class Employee extends Model<EmployeeInterface> implements EmployeeInterface {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public dateJoined!: Date;
  public jobTitle!: string;
  public departmentId!: ForeignKey<number>;
  public weeklyHours!: number;
  public roleId!: ForeignKey<number>;
  public avatar?: string;
  public Department?: Department;
  public Role?: Role;
}

Employee.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dateJoined: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weeklyHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'employees',
  }
);

Employee.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'Department',
});
Employee.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'Role',
});

export default Employee;
