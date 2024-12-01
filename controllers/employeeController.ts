import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Employee from '../models/employeeModel';
import Department from '../models/departmentModel';
import Role from '../models/roleModel';
import {
  changePassword,
  deleteKeycloakUser,
  extractTokenInfo,
} from '../services/keycloakService';
import { getDepartmentId } from '../services/departmentService';
import { getRoleId } from '../services/roleService';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: 'Department',
          attributes: ['name'],
        },
        {
          model: Role,
          as: 'Role',
          attributes: ['name'],
          where: {
            name: { [Op.ne]: 'admin' },
          },
        },
      ],
    });
    res.status(200).json(
      employees.map(employee => ({
        id: employee.id,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        weeklyHours: employee.weeklyHours,
        avatar: employee.avatar,
        department: employee.Department?.name,
        role: employee.Role?.name,
      }))
    );
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the employees. Please try again later.',
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id;
    if (!employeeId) {
      res.status(400).json({ error: 'Employee ID is required' });
    }

    const employee = await Employee.findByPk(employeeId, {
      include: [
        {
          model: Department,
          as: 'Department',
          attributes: ['name'],
        },
        {
          model: Role,
          as: 'Role',
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json({
      id: employee?.id,
      email: employee?.email,
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      jobTitle: employee?.jobTitle,
      weeklyHours: employee?.weeklyHours,
      avatar: employee?.avatar,
      department: employee?.Department?.name,
      role: employee?.Role?.name,
    });
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the employee. Please try again later.',
    });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      email,
      firstName,
      lastName,
      jobTitle,
      department,
      weeklyHours,
      role,
      avatar,
    } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const departmentId = await getDepartmentId(department);
    const roleId = await getRoleId(role);

    const employeeUpdated = await Employee.update(
      {
        email,
        firstName,
        lastName,
        jobTitle,
        departmentId: department ? departmentId?.id : employee.departmentId,
        weeklyHours,
        roleId: role ? roleId?.id : employee.roleId,
        avatar,
      },
      {
        where: { id },
      }
    );

    if (!employeeUpdated) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      error:
        'An error occurred while updating the employee. Please try again later.',
    });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({
        error: 'Employee not found',
      });
      return;
    }

    const adminToken = extractTokenInfo(req).token;

    await deleteKeycloakUser(employee.keycloakId, adminToken);

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      error:
        'An error occurred while deleting the employee. Please try again later.',
    });
  }
};
