import { Request, Response } from 'express';
import Department from '../models/departmentModel';

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      department.name = name;
      await department.save();
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      await department.destroy();
      res.status(200).json({ message: 'Department deleted successfully' });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
