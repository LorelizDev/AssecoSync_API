import LeaveRequest from '../models/leaveRequestModel';
import { Op } from 'sequelize';

export const createLeaveRequest = async (data: {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  typeId: number;
  statusId: number;
}) => {
  return await LeaveRequest.create(data);
};

export const getAllLeaveRequests = async (employeeId?: string) => {
  const whereClause = employeeId ? { employeeId } : {};
  return await LeaveRequest.findAll({ where: whereClause });
};

export const getLeaveRequestById = async (id: number) => {
  const leaveRequest = await LeaveRequest.findByPk(id);
  if (!leaveRequest) {
    throw new Error('Leave Request not found');
  }
  return leaveRequest;
};

export const updateLeaveRequest = async (
  id: number,
  data: Partial<{
    startDate: Date;
    endDate: Date;
    typeId: number;
    statusId: number;
  }>
) => {
  const leaveRequest = await getLeaveRequestById(id);
  return await leaveRequest.update(data);
};

export const deleteLeaveRequest = async (id: number) => {
  const leaveRequest = await getLeaveRequestById(id);
  return await leaveRequest.destroy();
};
