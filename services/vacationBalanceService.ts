import VacationBalance from '../models/vacationBalanceModel';

export const getAllVacationBalances = async () => {
  return await VacationBalance.findAll();
};

export const getVacationBalanceById = async (id: number) => {
  const balance = await VacationBalance.findByPk(id);
  if (!balance) {
    throw new Error('Vacation balance not found');
  }
  return balance;
};

export const createVacationBalance = async (data: {
  employeeId: string;
  year: number;
  balance: number;
}) => {
  return await VacationBalance.create(data);
};

export const updateVacationBalance = async (
  id: number,
  data: Partial<{ year: number; balance: number }>
) => {
  const balance = await getVacationBalanceById(id);
  return await balance.update(data);
};

export const deleteVacationBalance = async (id: number) => {
  const balance = await getVacationBalanceById(id);
  return await balance.destroy();
};
