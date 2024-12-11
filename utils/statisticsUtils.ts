export const calculatePercentagesByInterval = (
  hours: Record<string, number>,
  totalRecords: number
) => {
  return Object.keys(hours).map(hour => ({
    hour,
    employeesCount: hours[hour],
    percentage: ((hours[hour] / totalRecords) * 100).toFixed(2),
  }));
};
