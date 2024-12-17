import VacationBalance from '../models/vacationBalanceModel';
import { Op } from 'sequelize';

/**
 * Initializes a new vacation balance for an employee and year.
 * If a balance for the given year already exists, it throws an error.
 * Carries over remaining days from the previous year's balance.
 */
export const initializeVacationBalance = async (
  employeeId: string,
  year: number,
  totalDays: number
) => {
  const existingBalance = await VacationBalance.findOne({
    where: { employeeId, year },
  });

  if (existingBalance) {
    throw new Error(
      `Vacation balance for employee ${employeeId} already exists for year ${year}.`
    );
  }

  const previousYearBalance = await VacationBalance.findOne({
    where: { employeeId, year: year - 1 },
  });

  const carriedOverDays = previousYearBalance?.remainingDays ?? 0;

  return await VacationBalance.create({
    employeeId,
    year,
    totalDays,
    carriedOverDays,
    usedDays: 0,
  });
};

/**
 * Retrieves the vacation balance for an employee and year.
 * Throws an error if not found.
 */
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

/**
 * Retrieves vacation balances for an employee within a year range.
 */
export const getBalancesWithinYearRange = async (
  employeeId: string,
  startYear: number,
  endYear: number
) => {
  return await VacationBalance.findAll({
    where: {
      employeeId,
      year: {
        [Op.between]: [startYear, endYear], // Filters by a range of years
      },
    },
    order: [['year', 'ASC']], // Sorted by year in ascending order
  });
};

/**
 * Uses vacation days from an employee's balance for a specific year.
 * Ensures that days used do not exceed available days.
 */
export const useVacationDays = async (
  employeeId: string,
  year: number,
  days: number
) => {
  const balance = await getVacationBalance(employeeId, year);

  const remainingDays = balance.remainingDays;
  if (days > remainingDays) {
    throw new Error(
      `Insufficient vacation days. Only ${remainingDays} days available.`
    );
  }

  balance.usedDays += days;
  await balance.save();

  return balance;
};

/**
 * Retrieves all vacation balances for all employees.
 */
export const getAllVacationBalances = async () => {
  return await VacationBalance.findAll(); // Retrieves all vacation balances
};

/**
 * Retrieves all yearly vacation balances for an employee, sorted by year in descending order.
 */
export const getYearlyBalances = async (employeeId: string) => {
  return await VacationBalance.findAll({
    where: { employeeId },
    order: [['year', 'DESC']],
  });
};