import dayjs from 'dayjs';

export const getTime = (time?: Date | string): string => {
  time = time && `2023-01-01T${time}`;
  return dayjs(time ? time : dayjs()).format('HH:mm');
};

export const getDate = (date?: Date | string) =>
  dayjs(date || dayjs()).format('YYYY-MM-DD');
