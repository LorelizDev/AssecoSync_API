import Department from '../models/departmentModel';

export const getDepartmentId = async (name: string) => {
  if (!name) {
    return null;
  }
  const departmentId = await Department.findOne({ where: { name } });
  if (!departmentId) {
    throw new Error(`Department with name "${name}" not found`);
  }
  return departmentId;
};
