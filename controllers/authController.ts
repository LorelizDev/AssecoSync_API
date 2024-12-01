import { Request, Response } from 'express';
import Employee from '../models/employeeModel';
import {
  changePassword,
  extractTokenInfo,
  keycloakLogin,
  keycloakRegister,
} from '../services/keycloakService';
import { getDepartmentId } from '../services/departmentService';
import { getRoleId } from '../services/roleService';

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await keycloakLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  register: async (req: Request, res: Response) => {
    const adminToken = extractTokenInfo(req).token;
    const {
      email,
      password,
      firstName,
      lastName,
      id,
      jobTitle,
      department,
      weeklyHours,
      avatar,
    } = req.body;

    try {
      const keycloakId = await keycloakRegister(email, password, adminToken);

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
        dateJoined: new Date(),
        jobTitle,
        departmentId: departmentId.id,
        weeklyHours,
        roleId: roleId.id,
        avatar,
      });

      res
        .status(201)
        .json({ message: 'Employee created successfully', employee });
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error });
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    try {
      const urlChangePassword = await changePassword();
      res.redirect(urlChangePassword);
      return;
    } catch (error) {
      console.error('Error generating change password URL:', error);
      res.status(500).json({
        error: 'Failed to generate change password URL',
      });
    }
  },
};

export default authController;
