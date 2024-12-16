import { Request, Response, NextFunction } from 'express';
import { extractTokenInfo } from '../services/keycloakService';
import Employee from '../models/employeeModel';
import { CLIENT_ID } from '../config/keycloakConfig';

export const userAuthorized = async (
  req: Request & { employee?: Employee; isAdmin?: boolean },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { tokenContent } = extractTokenInfo(req);

  if (tokenContent) {
    const employee = await Employee.findOne({
      where: { keycloakId: tokenContent.sub },
    });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    const isAdmin =
      tokenContent.resource_access?.[CLIENT_ID!]?.roles.includes('admin');

    if (employee || isAdmin) {
      req.employee = employee;
      req.isAdmin = isAdmin;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
