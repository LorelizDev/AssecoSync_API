import dayjs from 'dayjs';
import { parseDateTime } from './dateUtils';

export const calculateWorkDuration = (
  startTime: Date | string,
  endTime: Date | string | null,
  startPause: Date | string | null,
  endPause: Date | string | null
): number => {
  const start = dayjs(parseDateTime(startTime));
  const end = dayjs(endTime ? parseDateTime(endTime) : dayjs());

  const totalWorkTime = end.diff(start, 'hours', true);
  const pauseDuration = calculatePauseDuration(startPause, endPause);

  return totalWorkTime - pauseDuration / 60;
};

export const calculatePauseDuration = (
  startPause: Date | string | null,
  endPause: Date | string | null
): number => {
  if (!startPause) return 0;

  const start = dayjs(parseDateTime(startPause));
  const end = dayjs(endPause ? parseDateTime(endPause) : dayjs());

  return end.diff(start, 'minutes');
};

export const getTimeInterval = (
  timeField: Date | string,
  dateField: Date | string,
  interval: number
) => {
  const fullDate = parseDateTime(timeField, dateField);
  const time = dayjs(fullDate);
  const timeInterval = time
    .minute(Math.floor(time.minute() / interval) * interval)
    .second(0)
    .format('HH:mm');
  return timeInterval;
};
