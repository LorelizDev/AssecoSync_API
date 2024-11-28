import express from 'express';
import cors from 'cors';
import session from 'express-session';
import db from './database/db';
import { PORT } from './config';
import Role from './models/roleModel';
import Department from './models/departmentModel';
import Employee from './models/employeeModel';
import authRoutes from './routes/authRoutes';
import { SESSION_SECRET } from './config';
import { keycloak } from './middlewares/keycloak';

export const app = express();
const port = PORT || 8000;

app.use(cors());
app.use(express.json());

export const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

app.get('/', (req, res) => {
  res.send('This is the AssecoSync API');
});

app.use('/auth', authRoutes);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('👍Connection has been established successfully.');

    await Role.sync();
    await Department.sync();
    await Employee.sync();
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
