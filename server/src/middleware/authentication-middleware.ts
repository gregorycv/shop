import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithUser } from '../interfaces';
import { db } from '../db';

export const authenticationMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { cookies } = request;
  console.log(cookies);
  if (cookies && cookies.Authorization) {
    try {
      const dataStoredInToken = jwt.verify(
        cookies.Authorization,
        process.env.JWT_SECRET as string
      ) as DataStoredInToken;

      const { id } = dataStoredInToken;
      const user = await db.User.findOne({ where: { id } });

      if (user) {
        request.user = user;
        next();
      } else {
        next(new Error('Error during authorization. Incorrect token'));
      }
    } catch (error) {
      next(new Error('Error during authorization. Incorrect token'));
    }
  } else {
    next(new Error('Error during authorization. No token present'));
  }
};
