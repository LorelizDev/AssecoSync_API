import Queue from 'bull';
import { closeTimeLogsProcessor } from '../jobs/closeTimeLogsJob';

const closeTimeLogsQueue = new Queue('close-time-logs', {
  redis: { host: '127.0.0.1', port: 6379 },
});

closeTimeLogsQueue.process(closeTimeLogsProcessor);

// Programar trabajos recurrentes (cada 5 minutos)
closeTimeLogsQueue.add({}, { repeat: { cron: '*/5 * * * *' } });

closeTimeLogsQueue.on('completed', job => {
  console.log(`Trabajo completado: ID ${job.id}`);
});

closeTimeLogsQueue.on('failed', (job, err) => {
  console.error(`Trabajo fallido: ID ${job.id}`, err);
});

export default closeTimeLogsQueue;
