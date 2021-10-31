import { User } from '../../models/user';

declare namespace Express {
  interface Request {
    user: User;
  }
}