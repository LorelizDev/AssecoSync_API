import express from 'express';
import cors from 'cors';
import session from 'express-session';
import db from './database/db';
import { PORT, SESSION_SECRET } from './config/config';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import departmentRoutes from './routes/departmentRoutes';
import { keycloak } from './middlewares/keycloak';
import leaveRequestRoutes from './routes/leaveRequestRoutes';
import typeRequestRoutes from './routes/typeRequestRoutes';
import statusRequestRoutes from './routes/statusRequestRoutes';
import statusTimeLogRoutes from './routes/statusTimeLogRoutes';
import timeLogRoutes from './routes/timeLogRoutes';

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

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/type-requests', typeRequestRoutes);
app.use('/api/status-requests', statusRequestRoutes);
app.use('/api/log-status', statusTimeLogRoutes);
app.use('/api/logs', timeLogRoutes);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('👍Connection has been established successfully.');

    await db.sync({ alter: true });
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
