import { Request, Response } from 'express';
import StatusRequest from '../models/statusRequestModel';

export const getStatusRequests = async (req: Request, res: Response) => {
  try {
    const statusRequests = await StatusRequest.findAll();
    res.status(200).json(statusRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStatusRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const statusRequest = await StatusRequest.findByPk(id);
    if (statusRequest) {
      res.status(200).json(statusRequest);
    } else {
      res.status(404).json({ error: 'Status request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStatusRequest = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const statusRequest = await StatusRequest.create({ status });
    res.status(201).json(statusRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStatusRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const statusRequest = await StatusRequest.findByPk(id);
    if (statusRequest) {
      statusRequest.status = status;
      await statusRequest.save();
      res.status(200).json(statusRequest);
    } else {
      res.status(404).json({ error: 'Status request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteStatusRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const statusRequest = await StatusRequest.findByPk(id);
    if (statusRequest) {
      await statusRequest.destroy();
      res.status(200).json({ message: 'Status request deleted successfully' });
    } else {
      res.status(404).json({ error: 'Status request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
