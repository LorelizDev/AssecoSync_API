import { Request, Response } from 'express';
import axios from 'axios';
import Employee from '../models/employeeModel';
import Role from '../models/roleModel';
import Department from '../models/departmentModel';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
  KEYCLOAK_ADMIN_URL,
} from '../config';

const authController: {
  login: (req: Request, res: Response) => Promise<void>;
  register: (req: Request, res: Response) => Promise<void>;
} = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const response = await axios.post(
        TOKEN_URL!,
        {
          client_id: CLIENT_ID,
          grant_type: 'password',
          username: email,
          password,
          client_secret: CLIENT_SECRET,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const { access_token } = response.data;
      res.status(200).json({ token: access_token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  register: async (req: Request, res: Response) => {
    const token = (req as any).kauth?.grant?.access_token.token;
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
      const createUserResponse = await axios.post(
        KEYCLOAK_ADMIN_URL!,
        {
          username: email,
          enabled: true,
          email,
          emailVerified: true,
          firstName,
          lastName,
          credentials: [
            { type: 'password', value: password, temporary: false },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (createUserResponse.status === 201) {
        const employeeRole = await Role.findOne({
          where: { name: 'employee' },
        });
        if (!employeeRole) {
          throw new Error('Employee role not found');
        }

        const departmentID = await Department.findOne({
          where: { name: department },
        });
        if (!departmentID) {
          throw new Error('Department not found');
        }

        await Employee.create({
          id,
          email,
          firstName,
          lastName,
          dateJoined: new Date(),
          jobTitle,
          departmentId: departmentID.id,
          weeklyHours,
          roleId: employeeRole.id,
          avatar,
        });

        const response = await axios.post(
          TOKEN_URL!,
          {
            client_id: CLIENT_ID,
            grant_type: 'password',
            username: email,
            password,
            client_secret: CLIENT_SECRET,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const { access_token } = response.data;
        res
          .status(201)
          .json({ message: 'User created successfully', token: access_token });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error creating user' });
    }
  },
};

export default authController;
