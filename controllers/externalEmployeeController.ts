import { Request, Response } from 'express';
import ExternalEmployee from '../models/externalEmployeeModel';

export const getExternalEmployee = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  try {
    const employee = await ExternalEmployee.findByPk(employeeId);

    if (!employee) {
      res
        .status(404)
        .json({ error: 'Employee not found in external database.' });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error consulting employee from external database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
