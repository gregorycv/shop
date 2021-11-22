import { authenticationMiddleware, roleMiddleware } from './../middleware';
import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { CreateOrderDto } from '../interfaces/order';
import { db } from '../db';
import { ROLE } from '../utils/constants';

class OrderController implements Controller {
  public path = '/orders';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authenticationMiddleware, this.getAllUserOrders);
    this.router.get(`${this.path}/all`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.getAllOrders);

    this.router.get(`${this.path}/:id`, authenticationMiddleware, this.getUserOrderById);
    this.router.get(`${this.path}/all/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.getOrderById);

    this.router.post(this.path, authenticationMiddleware, this.createOrder);
    this.router.patch(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.modifyOrder);
    this.router.delete(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.deleteOrder);
  }

  // TODO: refactor admin/user router to prevent code repetition
  private getAllUserOrders = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;
    try {
      const orders = await db.Order.findAll({ where: { id } });
      response.send(orders);
    } catch (error) {
      next(error);
    }
  };

  private getAllOrders = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orders = await db.Order.findAll();
      response.send(orders);
    } catch (error) {
      next(error);
    }
  };

  private getUserOrderById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { user } = request;
    try {
      const order = await db.Order.findOne({ where: { id, userId: user.id } });
      if (order) {
        response.send(order);
      } else {
        next(new Error('No such product type found error.'));
      }
    } catch (error) {
      next(error);
    }
  };

  private getOrderById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const order = await db.Order.findOne({ where: { id } });
      if (order) {
        response.send(order);
      } else {
        next(new Error('No such product type found error.'));
      }
    } catch (error) {
      next(error);
    }
  };

  // TODO: return 201 status code here
  private createOrder = async (request: Request, response: Response, next: NextFunction) => {
    const orderData: CreateOrderDto = request.body;
    try {
      const createdOrder = await db.Order.create(orderData);
      response.send(createdOrder);
    } catch (error) {
      next(error);
    }
  };

  private modifyOrder = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const orderData: CreateOrderDto = request.body;
    try {
      const updatedOrder = await db.Order.update(orderData, { where: { id } });
      response.send(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  private deleteOrder = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const successResponse = await db.Order.destroy({ where: { id } });
      if (successResponse) {
        response.sendStatus(200);
      } else {
        throw new Error(`No product type found under id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
