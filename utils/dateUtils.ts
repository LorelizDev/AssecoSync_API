import dayjs from 'dayjs';

export const parseDateTime = (time?: Date | string, date?: Date | string) => {
  date = formatDate(date);
  time = time && `${date}T${time}`;
  return dayjs(time ? time : dayjs()).toDate();
};

export const formatDate = (date?: Date | string) =>
  dayjs(date || dayjs()).format('YYYY-MM-DD');

export const formatTime = (time?: Date | string) =>
  dayjs(time || dayjs()).format('HH:mm');
