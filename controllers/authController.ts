import { Request, Response } from 'express';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, TOKEN_URL } from '../config';

const authController = {
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
};

export default authController;
