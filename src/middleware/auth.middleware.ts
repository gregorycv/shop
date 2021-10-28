import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithUser } from '../interfaces';
import { db } from '../db';

const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const cookies = request.cookies;
  if (cookies || cookies.Authorization) {
    try {
      const dataStoredInToken = jwt.verify(cookies.Authorization, process.env.JWT_SECRET as string) as DataStoredInToken;
      const { id } = dataStoredInToken;
      const user = await db.User.findOne({ where: { id } });
  
      if (user) {
        request.user = user;
        next();
      } else {
        next(new Error('Error during authorization. Incorrect token'));
      }
    } catch (error) {
      response.status(401).json({ message: '401 Unauthorized' });
    }
  } else {
    response.status(401).json({ message: '401 Unauthorized' });
  }
}