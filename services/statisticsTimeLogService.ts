import { TimeLogsStats } from '../interfaces/timeLogsStatsInterface';
import { calculatePercentagesByInterval } from '../utils/statisticsUtils';
import { getTimeInterval } from '../utils/timeCalculation';

// Función para agrupar horas en intervalos
export const groupTimesByInterval = (
  timeLogs: TimeLogsStats[],
  field: keyof TimeLogsStats,
  interval: number
) => {
  const hours: Record<string, number> = {};
  const totalRecords = timeLogs.length;

  timeLogs.forEach(log => {
    const timeField = log[field];
    const dateField = log.date;

    if (!timeField || !dateField) return;

    const timeInterval = getTimeInterval(timeField, dateField, interval);

    if (!hours[timeInterval]) {
      hours[timeInterval] = 0;
    }
    hours[timeInterval]++;
  });

  return calculatePercentagesByInterval(hours, totalRecords);
};
