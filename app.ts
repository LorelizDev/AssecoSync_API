import express from 'express';
import db from './database/db';
import { PORT } from './config';
import cors from 'cors';

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

    await db.sync();
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
