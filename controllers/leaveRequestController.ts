import { Request, Response } from 'express';
import LeaveRequest from '../models/leaveRequestModel';

export const getLeaveRequests = async (req: Request, res: Response) => {
  console.log('Received request:', req.body);
  try {
    const leaveRequests = await LeaveRequest.findAll();
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLeaveRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      res.status(200).json(leaveRequest);
    } else {
      res.status(404).json({ error: 'Leave request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLeaveRequest = async (req: Request, res: Response) => {
  console.log('Received request:', req.body);
  const { employeeId, startDate, endDate, typeId, statusId } = req.body;
  try {
    const leaveRequest = await LeaveRequest.create({
      employeeId,
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

export const updateLeaveRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { startDate, endDate, typeId, statusId } = req.body;
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      leaveRequest.startDate = startDate;
      leaveRequest.endDate = endDate;
      leaveRequest.typeId = typeId;
      leaveRequest.statusId = statusId;
      await leaveRequest.save();
      res.status(200).json(leaveRequest);
    } else {
      res.status(404).json({ error: 'Leave request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLeaveRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      await leaveRequest.destroy();
      res.status(200).json({ message: 'Leave request deleted successfully' });
    } else {
      res.status(404).json({ error: 'Leave request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
