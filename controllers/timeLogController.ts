import { Request, Response } from 'express';
import TimeLog from '../models/timeLogModel';
import Employee from '../models/employeeModel';
import StatusTimeLog from '../models/statusTimeLogModel';
import {
  getStatusTimeLogId,
  handleAdminUpdates,
  handleEndAction,
  handlePauseAction,
  handleResumeAction,
  handleStatusTimeLog,
} from '../services/timeLogService';
import { getTime, getDate } from '../utils/handleDateTime';

export const getAllTimeLogs = async (req: Request, res: Response) => {
  try {
    const timeLogs = await TimeLog.findAll({
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: StatusTimeLog,
          as: 'statusTimeLog',
          attributes: ['status'],
        },
      ],
    });
    res.status(200).json(
      timeLogs.map(timeLog => ({
        id: timeLog.id,
        date: timeLog.date,
        startTime: timeLog.startTime,
        startPause: timeLog.startPause,
        endPause: timeLog.endPause,
        endTime: timeLog.endTime,
        location: timeLog.location,
        status: timeLog.statusTimeLog?.status,
        employee: {
          id: timeLog.employeeId,
          firstName: timeLog.employee?.firstName,
          lastName: timeLog.employee?.lastName,
          email: timeLog.employee?.email,
        },
      }))
    );
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
    }
  }
};

export const getTimeLogByEmployeeId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const timeLogs = await TimeLog.findAll({
      where: { employeeId: id },
      include: [
        {
          model: StatusTimeLog,
          as: 'statusTimeLog',
          attributes: ['status'],
        },
      ],
    });
    res.status(200).json(
      timeLogs.map(timeLog => ({
        id: timeLog.id,
        date: timeLog.date,
        startTime: timeLog.startTime,
        startPause: timeLog.startPause,
        endPause: timeLog.endPause,
        endTime: timeLog.endTime,
        location: timeLog.location,
        status: timeLog.statusTimeLog?.status,
      }))
    );
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
    }
  }
};

export const createTimeLog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, startTime, endTime, startPause, endPause, location, status } =
    req.body;
  const statusId = await getStatusTimeLogId(status || 'working');
  if (!statusId) {
    throw new Error('Status time log not found');
  }

  try {
    const logToday = await TimeLog.findOne({
      where: {
        employeeId: id,
        date: date ? getDate(date) : getDate(),
      },
    });
    if (logToday && !logToday.endTime) {
      res.status(400).json({
        error: 'You must finish your current log before creating a new one',
      });
      return;
    }

    const timeLog = await TimeLog.create({
      employeeId: id,
      date: date ? getDate(date) : getDate(),
      startTime: startTime ? getTime(startTime) : getTime(),
      startPause: startPause && getTime(startPause),
      endPause: endPause && getTime(endPause),
      endTime: endTime && getTime(endTime),
      location,
      statusId,
    });
    res.status(201).json(timeLog);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
      return;
    }
  }
};

export const updateTimeLog = async (req: Request, res: Response) => {
  const { id, timeLogId } = req.params;
  const {
    action,
    date,
    startTime,
    endTime,
    startPause,
    endPause,
    location,
    status,
  } = req.body;

  try {
    const timeLog = await TimeLog.findOne({
      where: { id: timeLogId, employeeId: id },
    });
    if (!timeLog) {
      res.status(404).json({ error: 'Time log not found' });
      return;
    }

    switch (action) {
      case 'end':
        handleEndAction(timeLog);
        break;
      case 'pause':
        handlePauseAction(timeLog);
        break;
      case 'resume':
        handleResumeAction(timeLog);
        break;
      default:
        handleAdminUpdates(timeLog, {
          date,
          startTime,
          endTime,
          startPause,
          endPause,
          location,
        });
        break;
    }
    await timeLog.save();
    await handleStatusTimeLog(status, timeLog);
    res.status(200).json({ message: 'Time log updated successfully', timeLog });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
    }
  }
};

export const deleteTimeLog = async (req: Request, res: Response) => {
  const { timeLogId } = req.params;
  try {
    const timeLog = await TimeLog.findByPk(timeLogId);
    if (!timeLog) {
      res.status(404).json({ error: 'Time log not found' });
      return;
    }
    await timeLog.destroy();
    res.status(200).json({ message: 'Time log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
