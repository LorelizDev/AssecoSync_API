import Queue from 'bull';
import { closeTimeLogsProcessor } from '../jobs/closeTimeLogsJob';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './redisConfig';

const redisConfig = {
  host: REDIS_HOST || '127.0.0.1',
  port: Number(REDIS_PORT) || 6379,
  password: REDIS_PASSWORD || undefined,
};

const closeTimeLogsQueue = new Queue('close-time-logs', {
  redis: redisConfig,
});

closeTimeLogsQueue.process(closeTimeLogsProcessor);

// Programar trabajos recurrentes (cada 5 minutos)
closeTimeLogsQueue.add({}, { repeat: { cron: '*/5 * * * *' } });

closeTimeLogsQueue.on('completed', job => {
  console.log(`Job completed: ID ${job.id}`);
});

closeTimeLogsQueue.on('failed', (job, err) => {
  console.error(`Job failed: ID ${job.id}`, err);
});

export default closeTimeLogsQueue;
