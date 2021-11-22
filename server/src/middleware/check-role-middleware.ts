import { ROLE } from '../utils/constants';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces';

export const roleMiddleware = (role: ROLE) => { 
  return async (request: RequestWithUser, response: Response, next: NextFunction) => {
    if (request.user.role !== role) {
      next(new Error('403, Forbidden'))
    } else {
      next();
    }
  }};
