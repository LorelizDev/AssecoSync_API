import { Request, Response } from 'express';
import VacationBalance from '../models/vacationBalanceModel';

// Crear un nuevo balance de vacaciones
export const createVacationBalance = async (req: Request, res: Response) => {
  try {
    const { employeeId, year, totalDays, usedDays, carriedOverDays } = req.body;
    const vacationBalance = await VacationBalance.create({
      employeeId,
      year,
      totalDays,
      usedDays,
      carriedOverDays,
    });
    return res.status(201).json(vacationBalance);
  } catch (error) {
    console.error('Error creating vacation balance:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Obtener todos los balances de vacaciones
export const getAllVacationBalances = async (_req: Request, res: Response) => {
  try {
    const vacationBalances = await VacationBalance.findAll();
    return res.status(200).json(vacationBalances);
  } catch (error) {
    console.error('Error fetching vacation balances:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Obtener balance de vacaciones por año
export const getVacationBalanceByYear = async (req: Request, res: Response) => {
  try {
    const { employeeId, year } = req.params;
    const vacationBalance = await VacationBalance.findOne({
      where: { employeeId, year },
    });

    if (!vacationBalance) {
      return res
        .status(404)
        .json({ message: 'Vacation balance not found for the given year' });
    }

    return res.status(200).json(vacationBalance);
  } catch (error) {
    console.error('Error fetching vacation balance by year:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Usar días de vacaciones
export const useVacationDaysController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { daysUsed } = req.body;

    const vacationBalance = await VacationBalance.findByPk(id);
    if (!vacationBalance) {
      return res.status(404).json({ message: 'Vacation balance not found' });
    }

    const remainingDays =
      vacationBalance.totalDays +
      vacationBalance.carriedOverDays -
      vacationBalance.usedDays;
    if (daysUsed > remainingDays) {
      return res
        .status(400)
        .json({ message: 'The requested days exceed the available balance' });
    }

    vacationBalance.usedDays += daysUsed;
    await vacationBalance.save();

    return res.status(200).json(vacationBalance);
  } catch (error) {
    console.error('Error using vacation days:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Obtener un balance de vacaciones por ID
export const getVacationBalanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vacationBalance = await VacationBalance.findByPk(id);

    if (!vacationBalance) {
      return res.status(404).json({ message: 'Vacation balance not found' });
    }

    return res.status(200).json(vacationBalance);
  } catch (error) {
    console.error('Error fetching vacation balance by ID:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Actualizar un balance de vacaciones
export const updateVacationBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { totalDays, usedDays, carriedOverDays } = req.body;

    const vacationBalance = await VacationBalance.findByPk(id);
    if (!vacationBalance) {
      return res.status(404).json({ message: 'Vacation balance not found' });
    }

    const updatedBalance = await vacationBalance.update({
      totalDays,
      usedDays,
      carriedOverDays,
    });

    return res.status(200).json(updatedBalance);
  } catch (error) {
    console.error('Error updating vacation balance:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

// Eliminar un balance de vacaciones
export const deleteVacationBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vacationBalance = await VacationBalance.findByPk(id);

    if (!vacationBalance) {
      return res.status(404).json({ message: 'Vacation balance not found' });
    }

    await vacationBalance.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting vacation balance:', error);
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};
