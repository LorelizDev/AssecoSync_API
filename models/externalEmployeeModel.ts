import { DataTypes } from 'sequelize';
import externalDb from '../database/externalDb';

const ExternalEmployee = externalDb.define(
  'ExternalEmployee',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    dateJoined: DataTypes.DATE,
    weeklyHours: DataTypes.INTEGER,
    jobTitle: DataTypes.STRING,
    department: DataTypes.STRING,
  },
  {
    tableName: 'employees',
    timestamps: false,
  }
);

export default ExternalEmployee;
