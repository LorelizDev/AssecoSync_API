import Role from '../models/roleModel';

export const getRoleId = async (name: string) => {
  if (!name) {
    return null;
  }
  const roleId = await Role.findOne({ where: { name } });
  if (!roleId) {
    throw new Error(`Role with name "${name}" not found`);
  }
  return roleId;
};
