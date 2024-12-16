export interface VacationBalanceInterface {
  id: number;
  employeeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  carriedOverDays: number;
}

export interface VacationBalanceCreationAttributes {
  employeeId: string;
  year: number;
  totalDays?: number;
  usedDays?: number;
  carriedOverDays?: number;
}
