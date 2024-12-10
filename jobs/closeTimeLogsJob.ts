import closeTimeLogsQueue from '../config/queue';
import TimeLog from '../models/timeLogModel';
import { closeTimeLogIfCompleted } from '../services/timeLogService';

export const closeTimeLogsProcessor = async () => {
  console.log('Starting automatic log closing job...');

  const existingJobs = await closeTimeLogsQueue.getRepeatableJobs();
  if (!existingJobs.find(job => job.cron === '*/5 * * * *')) {
    closeTimeLogsQueue.add({}, { repeat: { cron: '*/5 * * * *' } });
  }

  try {
    const openTimeLogs = await TimeLog.findAll({ where: { endTime: null } });

    for (const timeLog of openTimeLogs) {
      await closeTimeLogIfCompleted(timeLog);
    }

    console.log(`Job completed: ${openTimeLogs.length} records processed.`);
  } catch (error) {
    console.error('Error processing the automatic closing job:', error);
    throw error;
  }
};
