import { DataTypes, Model } from 'sequelize';
import db from '../database/db';
import {
  DepartmentInterface,
  DepartmentCreationAttributes,
} from '../interfaces/departmentInterface';

class Department
  extends Model<DepartmentInterface, DepartmentCreationAttributes>
  implements DepartmentInterface
{
  public id!: number;
  public name!: string;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'departments',
  }
);

export default Department;
