import { Request, Response } from 'express';
import LeaveRequest from '../models/leaveRequestModel';

export const getAllLeaveRequests = async (req: Request, res: Response) => {
  try {
    const employeeAuth = (req as any).employee;
    const isAdmin = (req as any).isAdmin;
    const leaveRequests = await LeaveRequest.findAll({
      where: {
        ...(isAdmin ? {} : { employeeId: employeeAuth.id }),
      },
    });
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLeaveRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) {
      res.status(404).json({ error: 'Leave request not found' });
      return;
    }

    if (
      leaveRequest.employeeId !== (req as any).employee?.id &&
      !(req as any).isAdmin
    ) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    res.status(200).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLeaveRequest = async (req: Request, res: Response) => {
  const { employeeId, startDate, endDate, typeId, statusId } = req.body;
  try {
    const employeeAuth = (req as any).employee;
    const isAdmin = (req as any).isAdmin;
    const leaveRequest = await LeaveRequest.create({
      employeeId: isAdmin ? employeeId : employeeAuth.id,
      startDate,
      endDate,
      typeId,
      statusId,
    });
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLeaveRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { startDate, endDate, typeId, statusId } = req.body;
  const employeeAuth = (req as any).employee;
  const isAdmin = (req as any).isAdmin;

  try {
    const leaveRequest = await LeaveRequest.findOne({
      where: {
        id,
        ...(isAdmin ? {} : { employeeId: employeeAuth.id }),
      },
    });

    if (leaveRequest) {
      if (startDate) leaveRequest.startDate = startDate;
      if (endDate) leaveRequest.endDate = endDate;
      if (typeId) leaveRequest.typeId = typeId;
      if (statusId) leaveRequest.statusId = statusId; // Actualizamos el statusId

      await leaveRequest.save();

      // Respondemos con la solicitud actualizada
      res.status(200).json(leaveRequest);
    } else {
      res
        .status(404)
        .json({ error: 'Leave request not found or user not authorized' });
    }
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLeaveRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employeeAuth = (req as any).employee;
    const isAdmin = (req as any).isAdmin;
    const leaveRequest = await LeaveRequest.findOne({
      where: {
        id,
        ...(isAdmin ? {} : { employeeId: employeeAuth.id }),
      },
    });

    if (leaveRequest) {
      await leaveRequest.destroy();
      res.status(200).json({ message: 'Leave request deleted successfully' });
    } else {
      res
        .status(404)
        .json({ error: 'Leave request not found or user not authorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
