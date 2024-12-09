import { Request, Response } from 'express';
import StatusTimeLog from '../models/statusTimeLogModel';

export const getAllStatusTimeLogs = async (req: Request, res: Response) => {
  try {
    const statusTimeLogs = await StatusTimeLog.findAll();
    res.status(200).json(statusTimeLogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStatusTimeLogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const statusTimeLog = await StatusTimeLog.findByPk(id);
    if (statusTimeLog) {
      res.status(200).json(statusTimeLog);
    } else {
      res.status(404).json({ error: 'StatusTimeLog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStatusTimeLog = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const statusTimeLog = await StatusTimeLog.create({ status });
    res.status(201).json(statusTimeLog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStatusTimeLog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const statusTimeLog = await StatusTimeLog.findByPk(id);
    if (statusTimeLog) {
      statusTimeLog.status = status;
      await statusTimeLog.save();
      res.status(200).json(statusTimeLog);
    } else {
      res.status(404).json({ error: 'StatusTimeLog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteStatusTimeLog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const statusTimeLog = await StatusTimeLog.findByPk(id);
    if (statusTimeLog) {
      await statusTimeLog.destroy();
      res.status(200).json({ message: 'StatusTimeLog deleted successfully' });
    } else {
      res.status(404).json({ error: 'StatusTimeLog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
