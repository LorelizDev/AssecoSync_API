import { Request, Response } from 'express';
import LeaveRequest from '../models/leaveRequestModel';
import VacationBalance from '../models/vacationBalanceModel';
import { differenceInCalendarDays } from 'date-fns';
import { Op } from 'sequelize';

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

function validateDates(startDate: string, endDate: string): string | null {
  if (
    isNaN(new Date(startDate).getTime()) ||
    isNaN(new Date(endDate).getTime())
  ) {
    return 'Invalid start date or end date.';
  }

  if (new Date(startDate) > new Date(endDate)) {
    return 'The start date cannot be after the end date.';
  }

  return null;
}

function validateStatusId(statusId: number): string | null {
  const validStatusIds = [1, 2, 3]; // Ajusta según tu lógica
  if (statusId && !validStatusIds.includes(statusId)) {
    return 'Invalid status ID provided.';
  }
  return null;
}

export const createLeaveRequest = async (req: Request, res: Response) => {
  const { employeeId, startDate, endDate, typeId, statusId } = req.body;

  try {
    const dateError = validateDates(startDate, endDate);
    if (dateError) return res.status(400).json({ error: dateError });

    const vacationBalance = await VacationBalance.findOne({
      where: { employeeId },
    });
    if (!vacationBalance) {
      return res
        .status(400)
        .json({ error: 'Vacation balance not found for the employee.' });
    }

    const daysRequested =
      differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;
    if (daysRequested > vacationBalance.remainingDays) {
      return res.status(400).json({ error: 'Insufficient vacation balance.' });
    }

    const overlappingRequest = await LeaveRequest.findOne({
      where: {
        employeeId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } },
            ],
          },
        ],
      },
    });
    if (overlappingRequest) {
      return res.status(400).json({
        error: 'The leave request overlaps with an existing leave request.',
      });
    }

    const today = new Date();
    const maxPastDays = 30;
    if (
      new Date(endDate) < today &&
      differenceInCalendarDays(today, new Date(endDate)) > maxPastDays
    ) {
      return res.status(400).json({
        error: `Past leave requests cannot be registered for dates more than ${maxPastDays} days ago.`,
      });
    }

    const employeeAuth = (req as any).employee;
    const isAdmin = (req as any).isAdmin;

    const statusError = validateStatusId(statusId);
    if (statusError) return res.status(400).json({ error: statusError });

    const leaveRequest = await LeaveRequest.create({
      employeeId: isAdmin ? employeeId : employeeAuth.id,
      startDate,
      endDate,
      typeId,
      statusId: statusId || 1,
      vacationBalanceId: vacationBalance.id,
    });

    res.status(201).json(leaveRequest);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating leave request:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
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
