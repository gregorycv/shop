import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import AuthenticationService from '../services/authentication.service';
import { UserCreationAttributes as CreateUserDto } from '../models/user';
import { LoginDto } from '../dto';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    // TODO: Validate incoming user data
    // TODO: secure adding roles by new users
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {
    // TODO: Validate incoming login data
    const loginData: LoginDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.login(loginData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  private logout = async (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.sendStatus(200);
  }
}

export default AuthenticationController;