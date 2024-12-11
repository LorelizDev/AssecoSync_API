import { Sequelize } from 'sequelize';
import {
  DB_EXTERNAL_HOST,
  DB_EXTERNAL_NAME,
  DB_EXTERNAL_PASSWORD,
  DB_EXTERNAL_USER,
} from '../config/externalDbConfig';

const externalDb = new Sequelize(
  DB_EXTERNAL_NAME!,
  DB_EXTERNAL_USER!,
  DB_EXTERNAL_PASSWORD!,
  {
    host: DB_EXTERNAL_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

export default externalDb;
