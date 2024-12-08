import StatusTimeLog from '../models/statusTimeLogModel';
import TimeLog from '../models/timeLogModel';
import { locationEnum } from '../interfaces/timeLogInterface';
import { getDate, getTime } from '../utils/handleDateTime';

export const getStatusTimeLogId = async (status: string) => {
  if (!status) {
    return null;
  }
  const statusTimeLogId = await StatusTimeLog.findOne({ where: { status } });
  if (!statusTimeLogId) {
    throw new Error(`Status time log with name "${status}" not found`);
  }
  return statusTimeLogId.id;
};

export const handleEndAction = (timeLog: TimeLog) => {
  if (timeLog.startPause && !timeLog.endPause) {
    timeLog.endPause = getTime();
  }
  if (!timeLog.endTime) {
    timeLog.endTime = getTime();
  }
};

export const handlePauseAction = (timeLog: TimeLog) => {
  if (!timeLog.startTime) {
    throw new Error('You must start your time log before pausing it');
  }
  timeLog.startPause = getTime();
};

export const handleResumeAction = (timeLog: TimeLog) => {
  if (!timeLog.startPause) {
    throw new Error('You must pause your time log before resuming it');
  }
  timeLog.endPause = getTime();
};

export const handleAdminUpdates = async (
  timeLog: TimeLog,
  updates: {
    date?: Date | string;
    startTime?: Date | string;
    endTime?: Date | string;
    startPause?: Date | string;
    endPause?: Date | string;
    location?: locationEnum;
  }
) => {
  const { date, startTime, endTime, startPause, endPause, location } = updates;
  if (date) timeLog.date = getDate(date);
  if (startTime) timeLog.startTime = getTime(startTime);
  if (startPause) timeLog.startPause = getTime(startPause);
  if (endPause) {
    timeLog.endPause = getTime(endPause);
  }
  if (endTime) {
    if (!timeLog.endPause) {
      timeLog.endPause = getTime(endTime);
    }
    timeLog.endTime = getTime(endTime);
    const statusId = await getStatusTimeLogId('closed');
    if (statusId !== null) {
      timeLog.statusId = statusId;
    }
  }
  if (location) {
    if (locationEnum[location]) {
      timeLog.location = location;
    } else {
      throw new Error(`Invalid location "${location}"`);
    }
  }
};

export const handleStatusTimeLog = async (status: string, timeLog: TimeLog) => {
  let statusId;
  if (status) {
    statusId = await getStatusTimeLogId(status);
  }
  if (!timeLog.endTime && !timeLog.startPause) {
    statusId = await getStatusTimeLogId('working');
  } else if (!timeLog.endTime && timeLog.startPause && !timeLog.endPause) {
    statusId = await getStatusTimeLogId('break');
  } else {
    statusId = await getStatusTimeLogId('closed');
  }
  if (statusId !== null) {
    timeLog.statusId = statusId;
    await timeLog.save();
  }
};
