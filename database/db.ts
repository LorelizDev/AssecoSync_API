import { Sequelize } from 'sequelize';
import {
  DB_HOST,
  DB_DEV_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_TEST_NAME,
  NODE_ENV,
} from '../config';

const isTest: boolean = NODE_ENV === 'test';
const dbName: string = isTest ? DB_TEST_NAME! : DB_DEV_NAME!;

const db = new Sequelize(dbName, DB_USER!, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // Desactiva los registros de SQL
  define: {
    timestamps: false,
  },
});

export default db;
