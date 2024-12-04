import { Request, Response } from 'express';
import {
  createVacationBalance,
  getAllVacationBalances,
  getVacationBalanceById,
  updateVacationBalance,
  deleteVacationBalance,
} from '../services/vacationBalanceService';

export const getVacationBalances = async (req: Request, res: Response) => {
  try {
    const balances = await getAllVacationBalances();
    res.json(balances);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVacationBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const balance = await getVacationBalanceById(Number(id));
    res.json(balance);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createBalance = async (req: Request, res: Response) => {
  try {
    const balance = await createVacationBalance(req.body);
    res.status(201).json(balance);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBalance = await updateVacationBalance(Number(id), req.body);
    res.json(updatedBalance);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteVacationBalance(Number(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
