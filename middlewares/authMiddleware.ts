import { Request, Response, NextFunction, RequestHandler } from 'express';
import { extractTokenInfo } from '../services/keycloakService';
import Employee from '../models/employeeModel';
import { CLIENT_ID } from '../config/keycloakConfig';

export const userAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { tokenContent } = extractTokenInfo(req);
  if (tokenContent) {
    const id = req.params.id;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    const isTheSameUser = tokenContent.sub === employee.keycloakId;

    const isAdmin =
      tokenContent.resource_access?.[CLIENT_ID!]?.roles.includes('admin');

    if (isTheSameUser || isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
