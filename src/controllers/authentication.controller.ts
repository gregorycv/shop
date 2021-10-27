import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import AuthenticationService from '../services/authentication.service';
import { UserCreationAttributes as CreateUserDto } from '../models/user';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.register);
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    // TODO: Validate incoming user data
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user, token } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      return response.send(user);
    } catch (error) {
      next(error);
    }
  }

  // private login = async (request: Request, response: Response, next: NextFunction) => {

  // }

  // private logout = async (request: Request, response: Response, next: NextFunction) => {

  // }
}

export default AuthenticationController;