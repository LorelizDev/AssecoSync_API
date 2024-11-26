import express from 'express';
import cors from 'cors';
import db from './database/db';
import { PORT } from './config';
import Role from './models/roleModel';
import Department from './models/departmentModel';

export const app = express();
const port = PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the AssecoSync API');
});

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('👍Connection has been established successfully.');

    await Role.sync();
    await Department.sync();
    console.log('✅ Database synced successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to Database', error);
    throw error;
  }
};

export const server = app.listen(port, () => {
  console.log(`🏃‍♂️ Server running on http://localhost:${port}`);
});

startServer();
