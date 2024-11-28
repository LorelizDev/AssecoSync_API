import { Request, Response } from 'express';
import Employee from '../models/employeeModel';
import Department from '../models/departmentModel';
import Role from '../models/roleModel';
import { Op } from 'sequelize';

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
    if (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({
        error:
          'An error occurred while retrieving the employees. Please try again later.',
      });
    }
  }
};
