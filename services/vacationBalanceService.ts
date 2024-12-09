import VacationBalance from '../models/vacationBalanceModel';
import { Op } from 'sequelize';

export const initializeVacationBalance = async (
  employeeId: string,
  year: number,
  totalDays: number
) => {
  // Verifica si ya existe un balance para este año
  const existingBalance = await VacationBalance.findOne({
    where: { employeeId, year },
  });

  if (existingBalance) {
    throw new Error(
      `Vacation balance for employee ${employeeId} already exists for year ${year}.`
    );
  }

  // Busca el balance del año anterior para calcular días acumulados
  const previousYearBalance = await VacationBalance.findOne({
    where: { employeeId, year: year - 1 },
  });

  const carriedOverDays = previousYearBalance
    ? Math.max(
        previousYearBalance.totalDays +
          previousYearBalance.carriedOverDays -
          previousYearBalance.usedDays,
        0
      )
    : 0;

  // Crea el nuevo balance
  return await VacationBalance.create({
    employeeId,
    year,
    totalDays,
    carriedOverDays,
  });
};

export const getVacationBalance = async (employeeId: string, year: number) => {
  const balance = await VacationBalance.findOne({
    where: { employeeId, year },
  });

  if (!balance) {
    throw new Error(
      `Vacation balance for employee ${employeeId} not found for year ${year}.`
    );
  }

  return balance;
};

export const useVacationDays = async (
  employeeId: string,
  year: number,
  days: number
) => {
  const balance = await getVacationBalance(employeeId, year);

  const remainingDays =
    balance.totalDays + balance.carriedOverDays - balance.usedDays;
  if (days > remainingDays) {
    throw new Error(
      `Insufficient vacation days. Only ${remainingDays} days available.`
    );
  }

  balance.usedDays += days;
  await balance.save();

  return balance;
};

export const getYearlyBalances = async (employeeId: string) => {
  return await VacationBalance.findAll({
    where: { employeeId },
    order: [['year', 'DESC']],
  });
};
