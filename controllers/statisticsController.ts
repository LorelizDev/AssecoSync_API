import { Request, Response } from 'express';
import { groupTimesByInterval } from '../services/statisticsTimeLogService';
import timeLog from '../models/timeLogModel';
import { TimeLogsStats } from '../interfaces/timeLogsStatsInterface';

export const getTimeLogStatistics = async (req: Request, res: Response) => {
  try {
    const { field, interval } = req.query;

    if (
      !field ||
      !['startTime', 'endTime', 'startPause', 'endPause'].includes(
        field as string
      )
    ) {
      res.status(400).json({
        message:
          "The 'field' parameter is required and must be one of: startTime, endTime, startPause, endPause.",
      });
      return;
    }

    const timeLogs = await timeLog.findAll({
      attributes: ['startTime', 'endTime', 'startPause', 'endPause', 'date'],
      raw: true,
    });

    const statusTimeLog = groupTimesByInterval(
      timeLogs,
      field as keyof TimeLogsStats,
      Number(interval)
    );

    res.status(200).json(statusTimeLog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Error calculating statistics',
        message: error.message,
      });
    }
  }
};
