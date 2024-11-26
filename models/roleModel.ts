import { DataTypes, Model } from 'sequelize';
import db from '../database/db';
import {
  RoleInterface,
  EmployeeCreationAttributes,
} from '../interfaces/roleInterface';

class Role
  extends Model<RoleInterface, EmployeeCreationAttributes>
  implements RoleInterface
{
  public id!: number;
  public name!: string;
}

Role.init(
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
    tableName: 'roles',
  }
);

export default Role;
