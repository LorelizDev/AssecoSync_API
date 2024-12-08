import dayjs from 'dayjs';

export const getDateTime = (time?: Date | string, date?: Date | string) => {
  date = getDate(date);
  time = time && `${date}T${time}`;
  return dayjs(time ? time : dayjs()).toDate();
};

export const getDate = (date?: Date | string) =>
  dayjs(date || dayjs()).format('YYYY-MM-DD');

export const formatTime = (time?: Date | string) =>
  dayjs(time || dayjs()).format('HH:mm');

export const calculateWorkTime = (
  startTime: Date | string,
  endTime: Date | string | null,
  startPause: Date | string | null,
  endPause: Date | string | null
): number => {
  const start = dayjs(getDateTime(startTime));
  const end = dayjs(endTime ? getDateTime(endTime) : dayjs());

  const totalWorkTime = end.diff(start, 'hours', true);
  const pauseDuration = calculatePauseTime(startPause, endPause);

  return totalWorkTime - pauseDuration / 60;
};

export const calculatePauseTime = (
  startPause: Date | string | null,
  endPause: Date | string | null
): number => {
  if (!startPause) return 0;

  const start = dayjs(getDateTime(startPause));
  const end = dayjs(endPause ? getDateTime(endPause) : dayjs());

  return end.diff(start, 'minutes');
};
