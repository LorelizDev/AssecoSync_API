import { Request, Response } from 'express';
import TimeLog from '../models/timeLogModel';
import Employee from '../models/employeeModel';
import StatusTimeLog from '../models/statusTimeLogModel';
import {
  getStatusTimeLogId,
  getTimeDurations,
  handleAdminUpdates,
  handleEndAction,
  handlePauseAction,
  handleResumeAction,
  handleStatusTimeLog,
} from '../services/timeLogService';
import { formatTime, formatDate } from '../utils/dateUtils';

export const getAllTimeLogs = async (req: Request, res: Response) => {
  try {
    const isAdmin = (req as any).isAdmin;
    const employeeAuth = (req as any).employee;
    const timeLogs = await TimeLog.findAll({
      where: {
        ...(isAdmin ? {} : { employeeId: employeeAuth.id }),
      },
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
        workTime: getTimeDurations(timeLog).workTime,
        pauseTime: getTimeDurations(timeLog).pauseTime,
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

export const getTimeLogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const timeLog = await TimeLog.findOne({
      where: { id },
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
    if (!timeLog) {
      res.status(404).json({ error: 'Time log not found' });
      return;
    }

    if (
      timeLog.employeeId !== (req as any).employee?.id &&
      !(req as any).isAdmin
    ) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      id: timeLog.id,
      date: timeLog.date,
      startTime: timeLog.startTime,
      startPause: timeLog.startPause,
      endPause: timeLog.endPause,
      endTime: timeLog.endTime,
      location: timeLog.location,
      status: timeLog.statusTimeLog?.status,
      workTime: getTimeDurations(timeLog).workTime,
      pauseTime: getTimeDurations(timeLog).pauseTime,
      employee: {
        id: timeLog.employeeId,
        firstName: timeLog.employee?.firstName,
        lastName: timeLog.employee?.lastName,
        email: timeLog.employee?.email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
    }
  }
};

export const createTimeLog = async (req: Request, res: Response) => {
  const {
    date,
    startTime,
    endTime,
    startPause,
    endPause,
    location,
    status,
    employeeId,
  } = req.body;
  const statusId = await getStatusTimeLogId(status || 'working');
  if (!statusId) {
    throw new Error('Status time log not found');
  }

  try {
    const employeeAuth = (req as any).employee;
    const isAdmin = (req as any).isAdmin;
    const logToday = await TimeLog.findOne({
      where: {
        employeeId: isAdmin ? employeeId : employeeAuth.id,
        date: date ? formatDate(date) : formatDate(),
      },
    });
    if (logToday && !logToday.endTime) {
      res.status(400).json({
        error: 'You must finish your current log before creating a new one',
      });
      return;
    }

    const timeLog = await TimeLog.create({
      employeeId: isAdmin ? employeeId : employeeAuth.id,
      date: date ? formatDate(date) : formatDate(),
      startTime: startTime ? formatTime(startTime) : formatTime(),
      startPause: startPause && formatTime(startPause),
      endPause: endPause && formatTime(endPause),
      endTime: endTime && formatTime(endTime),
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
  const { id } = req.params;
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
    const isAdmin = (req as any).isAdmin;
    const employeeAuth = (req as any).employee;
    const timeLog = await TimeLog.findOne({
      where: {
        id,
        ...(isAdmin ? {} : { employeeId: employeeAuth.id }),
      },
    });
    if (!timeLog) {
      res
        .status(404)
        .json({ error: 'Time log not found or user not authorized' });
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
