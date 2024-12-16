import TypeRequest from '../models/typeRequestModel';

export const createTypeRequest = async (data: {
  type: string;
  detail?: string;
}) => {
  return await TypeRequest.create(data);
};

export const getAllTypeRequests = async () => {
  return await TypeRequest.findAll();
};

export const getTypeRequestById = async (id: number) => {
  const typeRequest = await TypeRequest.findByPk(id);
  if (!typeRequest) {
    throw new Error('Type Request not found');
  }
  return typeRequest;
};

export const updateTypeRequest = async (
  id: number,
  data: Partial<{ type: string; detail?: string }>
) => {
  const typeRequest = await getTypeRequestById(id);
  return await typeRequest.update(data);
};

export const deleteTypeRequest = async (id: number) => {
  const typeRequest = await getTypeRequestById(id);
  return await typeRequest.destroy();
};
