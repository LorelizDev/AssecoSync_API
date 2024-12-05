import { Request, Response } from 'express';
import {
  initializeVacationBalance,
  getVacationBalance,
  useVacationDays,
  getYearlyBalances,
} from '../services/vacationBalanceService';

export const createVacationBalance = async (req: Request, res: Response) => {
  const { employeeId, year, totalDays } = req.body;

  try {
    const balance = await initializeVacationBalance(
      employeeId,
      year,
      totalDays
    );
    res.status(201).json(balance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVacationBalanceByYear = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  const { year } = req.query;

  try {
    const balance = await getVacationBalance(employeeId, Number(year));
    res.status(200).json(balance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const useVacationDaysController = async (
  req: Request,
  res: Response
) => {
  const { employeeId, year } = req.params;
  const { days } = req.body;

  try {
    const updatedBalance = await useVacationDays(
      employeeId,
      Number(year),
      days
    );
    res.status(200).json(updatedBalance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllVacationBalances = async (req: Request, res: Response) => {
  const { employeeId } = req.params;

  try {
    const balances = await getYearlyBalances(employeeId);
    res.status(200).json(balances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
