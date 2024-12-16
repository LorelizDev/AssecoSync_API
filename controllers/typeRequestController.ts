import { Request, Response } from 'express';
import TypeRequest from '../models/typeRequestModel';

export const getTypeRequests = async (req: Request, res: Response) => {
  try {
    const typeRequests = await TypeRequest.findAll();
    res.status(200).json(typeRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTypeRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const typeRequest = await TypeRequest.findByPk(id);
    if (typeRequest) {
      res.status(200).json(typeRequest);
    } else {
      res.status(404).json({ error: 'Type request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTypeRequest = async (req: Request, res: Response) => {
  const { type, detail } = req.body;
  try {
    const typeRequest = await TypeRequest.create({ type, detail });
    res.status(201).json(typeRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTypeRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, detail } = req.body;
  try {
    const typeRequest = await TypeRequest.findByPk(id);
    if (typeRequest) {
      typeRequest.type = type;
      typeRequest.detail = detail;
      await typeRequest.save();
      res.status(200).json(typeRequest);
    } else {
      res.status(404).json({ error: 'Type request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTypeRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const typeRequest = await TypeRequest.findByPk(id);
    if (typeRequest) {
      await typeRequest.destroy();
      res.status(200).json({ message: 'Type request deleted successfully' });
    } else {
      res.status(404).json({ error: 'Type request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
