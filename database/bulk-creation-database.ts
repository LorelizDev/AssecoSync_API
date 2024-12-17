import { Router, Request, Response, NextFunction } from 'express';
import { keycloakRegister } from '../services/keycloakService'; // Servicio para Keycloak
import { getDepartmentId } from '../services/departmentService'; // Servicios de búsqueda
import { getRoleId } from '../services/roleService'; // Servicios de búsqueda
import Employee from '../models/employeeModel'; // Modelo de la base de datos
import { extractTokenInfo } from '../services/keycloakService'; // Middleware para extraer token

const registerBulk = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

/**
 * Ruta para registrar usuarios en masa
 */
registerBulk.post(
  '/register-bulk',
  asyncHandler(async (req: Request, res: Response) => {
    const adminToken = extractTokenInfo(req).token;
    const users = req.body; // Espera un array de usuarios

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid input. Provide a list of users.' });
    }

    try {
      const results = await Promise.all(
        users.map(async user => {
          const {
            email,
            password = '1234', // Contraseña por defecto
            firstName,
            lastName,
            id,
            jobTitle,
            department,
            weeklyHours,
            dateJoined,
            avatar,
          } = user;

          try {
            const keycloakId = await keycloakRegister(
              email,
              password,
              firstName,
              adminToken
            );

            const departmentId = await getDepartmentId(department);
            const roleId = await getRoleId('employee');

            if (!departmentId || !roleId) {
              throw new Error('Department or role not found');
            }

            const employee = await Employee.create({
              id,
              keycloakId,
              email,
              firstName,
              lastName,
              dateJoined,
              jobTitle,
              departmentId: departmentId.id,
              weeklyHours,
              roleId: roleId.id,
              avatar,
            });

            return { success: true, employee };
          } catch (error) {
            if (error instanceof Error) {
              return { success: false, error: error.message, email };
            } else {
              return {
                success: false,
                error: 'An unknown error occurred',
                email,
              };
            }
          }
        })
      );

      const successful = results.filter(result => result.success);
      const failed = results.filter(result => !result.success);

      res.status(201).json({
        message: 'Bulk user registration completed',
        successful,
        failed,
      });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({
            message: 'Error during bulk registration',
            error: error.message,
          });
      } else {
        res
          .status(500)
          .json({
            message: 'Error during bulk registration',
            error: 'An unknown error occurred',
          });
      }
    }
  })
);

export default registerBulk;
