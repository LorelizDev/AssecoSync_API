import StatusRequest from '../models/statusRequestModel';

export const createStatusRequest = async (data: { status: string }) => {
  return await StatusRequest.create(data);
};

export const getAllStatusRequests = async () => {
  return await StatusRequest.findAll();
};

export const getStatusRequestById = async (id: number) => {
  const statusRequest = await StatusRequest.findByPk(id);
  if (!statusRequest) {
    throw new Error('Status Request not found');
  }
  return statusRequest;
};

export const updateStatusRequest = async (
  id: number,
  data: Partial<{ status: string }>
) => {
  const statusRequest = await getStatusRequestById(id);
  return await statusRequest.update(data);
};

export const deleteStatusRequest = async (id: number) => {
  const statusRequest = await getStatusRequestById(id);
  return await statusRequest.destroy();
};
